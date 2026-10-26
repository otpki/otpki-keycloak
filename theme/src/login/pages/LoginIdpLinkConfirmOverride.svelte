<script lang="ts">
  import type { PageProps } from '@keycloakify/svelte/login/pages/PageProps';
  import { Button } from '$lib/components/ui/button';
  import type { KcContext } from '../KcContext';
  import type { I18n } from '../i18n';

  const {
    Template,
    kcContext,
    i18n,
    doUseDefaultCss,
    classes,
  }: PageProps<Extract<KcContext, { pageId: 'login-idp-link-confirm-override.ftl' }>, I18n> = $props();

  const { url, idpDisplayName } = $derived(kcContext);
  const { msg } = $derived($i18n);
</script>

<Template
  {kcContext}
  {i18n}
  {doUseDefaultCss}
  {classes}
>
  {#snippet headerNode()}
    {@render msg('confirmOverrideIdpTitle')()}
  {/snippet}

  <form
    id="kc-register-form"
    class="space-y-4"
    action={url.loginAction}
    method="post"
  >
    <p class="text-sm text-muted-foreground">
      {@render msg('pageExpiredMsg1')()}
      <a
        id="loginRestartLink"
        href={url.loginRestartFlowUrl}
        class="text-primary underline-offset-4 hover:underline"
      >
        {@render msg('doClickHere')()}
      </a>
    </p>
    <Button
      type="submit"
      name="submitAction"
      id="confirmOverride"
      value="confirmOverride"
      class="w-full"
    >
      {@render msg('confirmOverrideIdpContinue', idpDisplayName)()}
    </Button>
  </form>
</Template>
