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
  }: PageProps<Extract<KcContext, { pageId: 'login-otp.ftl' }>, I18n> = $props();

  const otpLogin = $derived(kcContext.otpLogin);
  const url = $derived(kcContext.url);
  const messagesPerField = $derived(kcContext.messagesPerField);

  const { msg, msgStr } = $i18n;
</script>

<Template
  {kcContext}
  {i18n}
  {doUseDefaultCss}
  {classes}
  displayMessage={!messagesPerField.existsError('totp')}
>
  {#snippet headerNode()}
    {@render msg('doLogIn')()}
  {/snippet}
  <form
    id="kc-otp-login-form"
    class="space-y-4"
    action={url.loginAction}
    method="post"
  >
    {#if otpLogin.userOtpCredentials.length > 1}
      <div class="space-y-2">
        <div class="space-y-2">
          {#each otpLogin.userOtpCredentials as otpCredential, index (`${otpCredential.id}-${index}`)}
            <label
              for={`kc-otp-credential-${index}`}
              class="flex cursor-pointer items-center gap-3 rounded-md border px-3 py-2 text-sm transition-colors hover:bg-muted"
            >
              <input
                id={`kc-otp-credential-${index}`}
                class="h-4 w-4"
                type="radio"
                name="selectedCredentialId"
                value={otpCredential.id}
                checked={otpCredential.id === otpLogin.selectedCredentialId}
              />
              <span class="font-medium">{otpCredential.userLabel}</span>
            </label>
          {/each}
        </div>
      </div>
    {/if}

    <div class="space-y-2">
      <Label for="otp">
          {@render msg('loginOtpOneTime')()}
      </Label>

      <!-- svelte-ignore a11y_autofocus -->
      <Input
        id="otp"
        name="otp"
        autocomplete="off"
        type="text"
        class={clsx(messagesPerField.existsError('totp') && 'border-destructive')}
        autofocus
        aria-invalid={messagesPerField.existsError('totp')}
      />

      {#if messagesPerField.existsError('totp')}
        <span
          id="input-error-otp-code"
          class="text-sm text-destructive"
          aria-live="polite"
        >
          {@html kcSanitize(messagesPerField.get('totp'))}
        </span>
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
