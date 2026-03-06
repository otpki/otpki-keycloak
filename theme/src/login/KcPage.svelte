<script lang="ts">
  import Template from './template/Template.svelte';
  import UserProfileFormFields from '@keycloakify/svelte/login/components/UserProfileFormFields.svelte';
  import { ModeWatcher, setMode } from 'mode-watcher';
  import type { KcContext } from 'keycloakify/login/KcContext';
  import type { ClassKey } from 'keycloakify/login/lib/kcClsx';
  import { onMount } from 'svelte';
  import type { Component } from 'svelte';
  import '../app.css';
  import { getIsDark } from '$lib/shared/isDark';
  import { useI18n } from './i18n';

  const { kcContext }: { kcContext: KcContext } = $props();

  const { i18n } = useI18n({ kcContext });

  const classes = {
    kcFormClass: 'space-y-4',
    kcFormGroupClass: 'space-y-2',
    kcLabelWrapperClass: 'space-y-1',
    kcLabelClass: 'text-sm font-medium text-foreground',
    kcInputWrapperClass: 'space-y-2',
    kcInputClass:
      'border-input bg-background selection:bg-primary dark:bg-input/30 selection:text-primary-foreground ring-offset-background placeholder:text-muted-foreground flex h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
    kcInputErrorMessageClass: 'text-sm text-destructive',
    kcInputHelperTextBeforeClass: 'text-xs text-muted-foreground',
    kcInputHelperTextAfterClass: 'text-xs text-muted-foreground',
    kcFormGroupHeader: 'text-sm font-semibold text-foreground',
    kcContentWrapperClass: 'space-y-1',
    kcInputClassRadio: 'flex items-center gap-2',
    kcInputClassRadioInput: 'h-4 w-4',
    kcInputClassRadioLabel: 'text-sm text-foreground',
    kcInputClassCheckbox: 'flex items-center gap-2',
    kcInputClassCheckboxInput: 'h-4 w-4',
    kcInputClassCheckboxLabel: 'text-sm text-foreground',
    kcInputClassRadioCheckboxLabelDisabled: 'cursor-not-allowed opacity-50',
  } satisfies { [key in ClassKey]?: string };
  const doMakeUserConfirmPassword = true;

  onMount(() => {
    setMode(getIsDark() ? 'dark' : 'light');
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const page = async (): Promise<{ default?: Component<any> }> => {
    switch (kcContext.pageId) {
      case 'login.ftl':
        return import('./pages/Login.svelte');
      case 'login-update-password.ftl':
        return import('./pages/LoginUpdatePassword.svelte');
      case 'login-reset-password.ftl':
        return import('./pages/LoginResetPassword.svelte');
      case 'update-email.ftl':
        return import('./pages/UpdateEmail.svelte');
      case 'logout-confirm.ftl':
        return import('./pages/LogoutConfirm.svelte');
      case 'login-config-totp.ftl':
        return import('./pages/LoginConfigTotp.svelte');
      case 'login-page-expired.ftl':
        return import('./pages/LoginPageExpired.svelte');
      case 'login-update-profile.ftl':
        return import('./pages/LoginUpdateProfile.svelte');
      case 'login-otp.ftl':
        return import('./pages/LoginOtp.svelte');
      case 'login-oauth-grant.ftl':
        return import('./pages/LoginOauthGrant.svelte');
      case 'login-verify-email.ftl':
        return import('./pages/LoginVerifyEmail.svelte');
      case 'login-oauth2-device-verify-user-code.ftl':
        return import('./pages/LoginOauth2DeviceVerifyUserCode.svelte');
      case 'error.ftl':
        return import('./pages/Error.svelte');
      default:
        return import('@keycloakify/svelte/login/DefaultPage.svelte');
    }
  };
</script>

<ModeWatcher track={false} />

{#await page() then { default: Page }}
  <Page
    {kcContext}
    {i18n}
    {classes}
    {Template}
    {UserProfileFormFields}
    doUseDefaultCss={true}
    {doMakeUserConfirmPassword}
  ></Page>
{/await}
