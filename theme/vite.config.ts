import tailwindcss from '@tailwindcss/vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vite';
import { keycloakify } from 'keycloakify/vite-plugin';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    svelte(),
    keycloakify({
      themeName: 'otpki-keycloak-theme',
      accountThemeImplementation: 'Single-Page',
      postBuild: async (buildContext) => {
        const { buildEmailTheme } = await import('keycloakify-emails');
        await buildEmailTheme({
          templatesSrcDirPath: path.join(buildContext.themeSrcDirPath, 'email', 'templates'),
          i18nSourceFile: path.join(buildContext.themeSrcDirPath, 'email', 'i18n.ts'),
          assetsDirPath: path.join(buildContext.themeSrcDirPath, 'email', 'templates', 'assets'),
          themeNames: buildContext.themeNames,
          keycloakifyBuildDirPath: buildContext.keycloakifyBuildDirPath,
          locales: ['en'],
          cwd: import.meta.dirname,
          environmentVariables: buildContext.environmentVariables,
          esbuild: { jsx: 'automatic' },
        });
      },
    }),
  ],
  resolve: {
    alias: {
      $lib: path.resolve('./src/lib'),
    },
  },
});
