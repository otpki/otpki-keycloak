<script lang="ts">
  import type { PageProps } from '@keycloakify/svelte/login/pages/PageProps';
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label';
  import { kcSanitize } from 'keycloakify/lib/kcSanitize';
  import { clsx } from 'keycloakify/tools/clsx';
  import type { KcContext } from '../KcContext';
  import type { I18n } from '../i18n';

  const {
    Template,
    kcContext,
    i18n,
    doUseDefaultCss,
    classes,
  }: PageProps<Extract<KcContext, { pageId: 'login-recovery-authn-code-input.ftl' }>, I18n> = $props();

  const { url, messagesPerField, recoveryAuthnCodesInputBean } = $derived(kcContext);

  const { msg, msgStr } = $derived($i18n);
</script>

<Template
  {kcContext}
  {i18n}
  {doUseDefaultCss}
  {classes}
  displayMessage={!messagesPerField.existsError('recoveryCodeInput')}
>
  {#snippet headerNode()}
    {@render msg('auth-recovery-code-header')()}
  {/snippet}
  <form
    id="kc-recovery-code-login-form"
    class="space-y-4"
    action={url.loginAction}
    method="post"
  >
    <div class="space-y-2">
      <Label for="recoveryCodeInput">
        {@render msg('auth-recovery-code-prompt', `${recoveryAuthnCodesInputBean.codeNumber}`)()}
      </Label>
      <Input
        tabindex={1}
        id="recoveryCodeInput"
        name="recoveryCodeInput"
        aria-invalid={messagesPerField.existsError('recoveryCodeInput')}
        class={clsx('font-mono', messagesPerField.existsError('recoveryCodeInput') && 'border-destructive')}
        autocomplete="off"
        type="text"
        autofocus
      />
      {#if messagesPerField.existsError('recoveryCodeInput')}
        <span
          id="input-error"
          class="text-sm text-destructive"
          aria-live="polite">{@html kcSanitize(messagesPerField.get('recoveryCodeInput'))}</span
        >
      {/if}
    </div>

    <div id="kc-form-buttons">
      <Button
        name="login"
        id="kc-login"
        type="submit"
        class="w-full"
      >
        {msgStr('doLogIn')}
      </Button>
    </div>
  </form>
</Template>
