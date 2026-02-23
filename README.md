# OTPKI Keycloak

This contains the optimized keycloak docker image for OTPKI. It also contains the theming that will be bundled into the image.

## Developing the theme

The theme is located in the [theme](./theme) directory. To develop the theme, you can

```bash
cd theme
npm install
npm run storybook
```

## Building the theme

This requires maven: `brew install maven`

```bash
cd theme
npx keycloakify start-keycloak
```
