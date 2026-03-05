import tailwindcss from "@tailwindcss/vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { defineConfig } from "vite";
import { keycloakify } from "keycloakify/vite-plugin";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    svelte(),
    keycloakify({
      themeName: "otpki-keycloak-theme",
      accountThemeImplementation: "none",
    }),
  ],
  resolve: {
    alias: {
      $lib: path.resolve("./src/lib"),
    },
  },
});
