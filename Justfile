set dotenv-load := false

# ------------------------------------------------------------------
# Paths / Config
# ------------------------------------------------------------------

root := justfile_directory()
tool_path := root / ".tool/bin"

export PATH := tool_path + ":" + env_var("PATH")

default:
    @just --list

shell:
    exec "${SHELL:-/bin/sh}" -i

# -----------------------------
# Theme recipes (npm, in theme/)
# -----------------------------

# install theme dependencies
install:
    cd theme && npm ci

# svelte-check typecheck of the theme
lint:
    cd theme && npm run check

# prettier rewrite of theme sources
format:
    cd theme && npm run format

alias fmt := format

# prettier check without rewriting
format-check:
    cd theme && npx prettier --check '**/*.{ts,html,json,md,svelte}'

# storybook dev server on :6006
dev:
    cd theme && npm run storybook

# vite build + keycloakify theme jars into theme/dist_keycloak
build:
    cd theme && npm run build-keycloak-theme

# Same checks CI's build job runs: deps, typecheck, then a full theme build.
check: install lint build
