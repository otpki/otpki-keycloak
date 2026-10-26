<script lang="ts">
  import type { PageProps } from '@keycloakify/svelte/login/pages/PageProps';
  import { useScript } from '@keycloakify/svelte/login/pages/WebauthnRegister.useScript';
  import { Button } from '$lib/components/ui/button';
  import { Checkbox } from '$lib/components/ui/checkbox';
  import { Label } from '$lib/components/ui/label';
  import FingerprintIcon from '@lucide/svelte/icons/fingerprint';
  import { untrack } from 'svelte';
  import type { KcContext } from '../KcContext';
  import type { I18n } from '../i18n';

  const {
    Template,
    kcContext,
    i18n,
    doUseDefaultCss,
    classes,
  }: PageProps<Extract<KcContext, { pageId: 'webauthn-register.ftl' }>, I18n> = $props();

  const { url, isSetRetry, isAppInitiatedAction } = $derived(kcContext);

  const { msg, msgStr } = $derived($i18n);

  const authButtonId = 'authenticateWebAuthnButton';

  useScript({
    authButtonId,
    kcContext: untrack(() => kcContext),
    i18n: untrack(() => i18n),
  });
</script>

<Template
  {kcContext}
  {i18n}
  {doUseDefaultCss}
  {classes}
>
  {#snippet headerNode()}
    <span class="inline-flex items-center gap-2">
      <FingerprintIcon class="size-5" />
      {@render msg('webauthn-registration-title')()}
    </span>
  {/snippet}
  <div class="space-y-4">
    <form
      id="register"
      action={url.loginAction}
      method="post"
    >
      <input
        type="hidden"
        id="clientDataJSON"
        name="clientDataJSON"
      />
      <input
        type="hidden"
        id="attestationObject"
        name="attestationObject"
      />
      <input
        type="hidden"
        id="publicKeyCredentialId"
        name="publicKeyCredentialId"
      />
      <input
        type="hidden"
        id="authenticatorLabel"
        name="authenticatorLabel"
      />
      <input
        type="hidden"
        id="transports"
        name="transports"
      />
      <input
        type="hidden"
        id="authenticatorAttachment"
        name="authenticatorAttachment"
      />
      <input
        type="hidden"
        id="error"
        name="error"
      />
      <div id="kc-form-options">
        <Label
          for="logout-sessions"
          class="inline-flex! w-fit cursor-pointer items-center! gap-2! text-sm font-normal whitespace-nowrap text-muted-foreground"
        >
          <Checkbox
            id="logout-sessions"
            name="logout-sessions"
            value="on"
            class="shrink-0"
          />
          <span class="leading-none whitespace-nowrap">{@render msg('logoutOtherSessions')()}</span>
        </Label>
      </div>
    </form>
    <Button
      type="submit"
      id={authButtonId}
      class="w-full"
    >
      <FingerprintIcon class="size-4" />
      {msgStr('doRegisterSecurityKey')}
    </Button>
    {#if !isSetRetry && isAppInitiatedAction}
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
          {@render msg('doCancel')()}
        </Button>
      </form>
    {/if}
  </div>
</Template>
