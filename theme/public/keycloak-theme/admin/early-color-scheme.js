/**
 * This file has been claimed for ownership from @keycloakify/keycloak-admin-ui version 260700.0.3.
 * To relinquish ownership and restore this file to its original content, run the following command:
 *
 * $ npx keycloakify own --path "admin/early-color-scheme.js" --public --revert
 *
 * early-color-scheme.js is a special file that will be imported in the head automatically by Keycloakify.
 * Note that this file is not loaded in Storybook or when using the Vite DEV server.
 * To test it you can use `NO_DEV_SERVER=true npx keycloakify start-keycloak` (NO_DEV_SERVER is only relevant for Account SPA and Admin themes)
 */

{
  const BACKGROUND_COLOR_DARK_MODE = '#020618';
  const BACKGROUND_COLOR_LIGHT_MODE = '#FFFFFF';
  const DARK_THEME_CLASS = 'pf-v5-theme-dark';

  const isDarkModeEnabled = (() => {
    keycloak_policy: {
      if (typeof kcContext === 'undefined') {
        break keycloak_policy;
      }

      if (kcContext.darkMode !== false) {
        break keycloak_policy;
      }

      return false;
    }

    return matchMedia('(prefers-color-scheme: dark)').matches;
  })();

  {
    const element = document.createElement('style');

    element.id = 'root-color-scheme-style';

    element.innerHTML = `:root { color-scheme: ${isDarkModeEnabled ? 'dark' : 'light'}; }`;

    document.head.appendChild(element);
  }

  document.documentElement.style.backgroundColor = isDarkModeEnabled
    ? BACKGROUND_COLOR_DARK_MODE
    : BACKGROUND_COLOR_LIGHT_MODE;

  if (isDarkModeEnabled) {
    document.documentElement.classList.add(DARK_THEME_CLASS);
  }
}
