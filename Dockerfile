ARG KEYCLOAK_VERSION=26.5.4


# shared keycloak base (env for builder/runtime)
FROM quay.io/keycloak/keycloak:${KEYCLOAK_VERSION} AS kc-base
ENV KC_DB=postgres \
    KC_CACHE=ispn \
    KC_CACHE_STACK=jdbc-ping \
    KC_METRICS_ENABLED=true \
    KC_HEALTH_ENABLED=true \
    KC_HTTP_ENABLED=true \
    KC_PROXY_HEADERS=xforwarded \
    KC_HTTP_RELATIVE_PATH=/kc

# build optimized keycloak
FROM kc-base AS kc-builder
COPY theme/dist_keycloak/keycloak-theme-for-kc-all-other-versions.jar /opt/keycloak/providers/
RUN /opt/keycloak/bin/kc.sh build \
    --db=postgres \
    --health-enabled=true \
    --metrics-enabled=true

# keycloak runtime image
FROM kc-base
COPY --from=kc-builder /opt/keycloak/ /opt/keycloak/

ENTRYPOINT ["/opt/keycloak/bin/kc.sh"]
CMD ["start", "--optimized"]