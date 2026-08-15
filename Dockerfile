ARG KEYCLOAK_VERSION=26.7.1

# PostgreSQL client
#
# Keycloak's runtime image is minimal and does not contain dnf/rpm.
# Install psql and its runtime dependencies into a temporary root filesystem,
# then copy that filesystem into the final Keycloak image.
# psql is used for standalone keycloak schema initialization
# Build the smallest practical psql payload
FROM registry.access.redhat.com/ubi9/ubi-minimal AS psql-builder
USER root
RUN microdnf install -y \
        postgresql \
        --setopt=install_weak_deps=0 \
        --setopt=tsflags=nodocs && \
    microdnf clean all && \
    rm -rf \
        /var/cache/yum \
        /var/cache/dnf \
        /var/cache/microdnf

RUN mkdir -p /payload/usr/bin && \
    \
    for bin in /usr/bin/psql /usr/bin/pg_isready; do \
        cp "$bin" "/payload/usr/bin/$(basename "$bin")"; \
    done && \
    \
    for bin in /usr/bin/psql /usr/bin/pg_isready; do \
        ldd "$bin" \
          | awk '{ \
              if ($2 == "=>") print $3; \
              else if ($1 ~ /^\//) print $1 \
            }'; \
    done \
      | grep '^/' \
      | sort -u \
      | while read -r lib; do \
          real_dir="$(readlink -f "$(dirname "$lib")")"; \
          dest="/payload${real_dir}/$(basename "$lib")"; \
          mkdir -p "$(dirname "$dest")"; \
          cp -L "$lib" "$dest"; \
        done && \
    \
    LD_LIBRARY_PATH=/payload/usr/lib64 \
        /payload/usr/bin/psql --version && \
    LD_LIBRARY_PATH=/payload/usr/lib64 \
        /payload/usr/bin/pg_isready --version

# shared keycloak base (env for builder/runtime)
FROM quay.io/keycloak/keycloak:${KEYCLOAK_VERSION} AS kc-base
ENV KC_DB=postgres \
    KC_CACHE=ispn \
    KC_CACHE_STACK=jdbc-ping \
    KC_METRICS_ENABLED=true \
    KC_HEALTH_ENABLED=true \
    KC_TRACING_ENABLED=true \
    KC_TELEMETRY_PROTOCOL=grpc \
    KC_TRACING_PROTOCOL=grpc \
    KC_TRACING_SAMPLER_TYPE=parentbased_traceidratio \
    KC_TELEMETRY_LOGS_ENABLED=true \
    KC_TELEMETRY_LOGS_PROTOCOL=grpc \
    KC_TELEMETRY_LOGS_LEVEL=info \
    KC_TELEMETRY_METRICS_ENABLED=true \
    KC_TELEMETRY_METRICS_PROTOCOL=grpc \
    KC_HTTP_METRICS_HISTOGRAMS_ENABLED=true \
    KC_CACHE_METRICS_HISTOGRAMS_ENABLED=true \
    KC_EVENT_METRICS_USER_ENABLED=true \
    KC_HTTP_ENABLED=true \
    KC_PROXY_HEADERS=xforwarded \
    KC_HTTP_RELATIVE_PATH=/kc \
    KC_HTTP_MANAGEMENT_RELATIVE_PATH=/kc \
    KC_FEATURES=opentelemetry-logs,opentelemetry-metrics

# build optimized keycloak
FROM kc-base AS kc-builder
COPY --chown=keycloak:keycloak \
    theme/dist_keycloak/keycloak-theme-for-kc-all-other-versions.jar \
    /opt/keycloak/providers/

RUN /opt/keycloak/bin/kc.sh build \
    --db=postgres \
    --health-enabled=true \
    --metrics-enabled=true \
    --tracing-enabled=true \
    --features="opentelemetry-logs,opentelemetry-metrics"

# Validate our aggressively-pruned psql payload against
# the actual Keycloak runtime.
FROM kc-base AS psql-test
USER root
COPY --from=psql-builder /payload/usr/ /usr/
RUN /usr/bin/psql --version && \
    /usr/bin/pg_isready --version

# keycloak runtime image
FROM kc-base
# keycloak install + theme
COPY --from=kc-builder /opt/keycloak/ /opt/keycloak/
# psql + pg_isready + shared libs
COPY --from=psql-builder /payload/usr/ /usr/

ENTRYPOINT ["/opt/keycloak/bin/kc.sh"]
CMD ["start", "--optimized"]