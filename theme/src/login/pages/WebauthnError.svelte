<script lang="ts">
  import type { PageProps } from '@keycloakify/svelte/login/pages/PageProps';
  import { Button } from '$lib/components/ui/button';
  import FingerprintIcon from '@lucide/svelte/icons/fingerprint';
  import type { KcContext } from '../KcContext';
  import type { I18n } from '../i18n';

  const {
    Template,
    kcContext,
    i18n,
    doUseDefaultCss,
    classes,
  }: PageProps<Extract<KcContext, { pageId: 'webauthn-error.ftl' }>, I18n> = $props();

  const { url, isAppInitiatedAction, execution } = $derived(kcContext);
  const { msg, msgStr } = $derived($i18n);
</script>

<Template
  {kcContext}
  {i18n}
  {doUseDefaultCss}
  {classes}
  displayMessage={true}
>
  {#snippet headerNode()}
    {@render msg('webauthn-error-title')()}
  {/snippet}
  <div class="space-y-4">
    <form
      id="kc-error-credential-form"
      action={url.loginAction}
      method="post"
    >
      <input
        type="hidden"
        id="executionValue"
        name="authenticationExecution"
      />
      <input
        type="hidden"
        id="isSetRetry"
        name="isSetRetry"
      />
    </form>
    <Button
      tabindex={4}
      onclick={() => {
        // @ts-expect-error: Trusted Keycloak's code
        document.getElementById('isSetRetry').value = 'retry';
        // @ts-expect-error: Trusted Keycloak's code
        document.getElementById('executionValue').value = execution;
        // @ts-expect-error: Trusted Keycloak's code
        document.getElementById('kc-error-credential-form').requestSubmit();
      }}
      type="button"
      name="try-again"
      id="kc-try-again"
      class="w-full"
    >
      <FingerprintIcon class="size-4" />
      {msgStr('doTryAgain')}
    </Button>
    {#if isAppInitiatedAction}
      <form
        action={url.loginAction}
        id="kc-webauthn-settings-form"
        method="post"
      >
        <Button
          type="submit"
          id="cancelWebAuthnAIA"
          name="cancel-aia"
          value="true"
          variant="outline"
          class="w-full"
        >
          {msgStr('doCancel')}
        </Button>
      </form>
    {/if}
  </div>
</Template>
