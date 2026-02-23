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

  const classes = {} satisfies { [key in ClassKey]?: string };
  const doMakeUserConfirmPassword = true;

  onMount(() => {
    setMode(getIsDark() ? 'dark' : 'light');
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const page = async (): Promise<{ default?: Component<any> }> => {
    switch (kcContext.pageId) {
      case 'login.ftl':
        return import('./pages/Login.svelte');
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
