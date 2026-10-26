<script lang="ts">
  import type { PageProps } from '@keycloakify/svelte/login/pages/PageProps';
  import { Button } from '$lib/components/ui/button';
  import SmartphoneIcon from '@lucide/svelte/icons/smartphone';
  import type { KcContext } from '../KcContext';
  import type { I18n } from '../i18n';

  const {
    Template,
    kcContext,
    i18n,
    doUseDefaultCss,
    classes,
  }: PageProps<Extract<KcContext, { pageId: 'login-reset-otp.ftl' }>, I18n> = $props();

  const { url, messagesPerField, configuredOtpCredentials } = $derived(kcContext);

  const { msg, msgStr } = $derived($i18n);
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
    id="kc-otp-reset-form"
    class="space-y-4"
    action={url.loginAction}
    method="post"
  >
    <p
      id="kc-otp-reset-form-description"
      class="text-sm text-muted-foreground"
    >
      {@render msg('otp-reset-description')()}
    </p>
    <div class="space-y-2">
      {#each configuredOtpCredentials.userOtpCredentials as otpCredential, index (otpCredential.id)}
        <label
          for={`kc-otp-credential-${index}`}
          class="flex cursor-pointer items-center gap-3 rounded-lg border border-input bg-card p-4 text-sm text-card-foreground transition-colors has-checked:border-primary has-checked:bg-accent"
        >
          <input
            id={`kc-otp-credential-${index}`}
            class="peer sr-only"
            type="radio"
            name="selectedCredentialId"
            value={otpCredential.id}
            checked={otpCredential.id === configuredOtpCredentials.selectedCredentialId}
          />
          <div class="flex size-10 shrink-0 items-center justify-center rounded-md bg-muted">
            <SmartphoneIcon class="size-5 text-muted-foreground" />
          </div>
          <span class="font-medium">{otpCredential.userLabel}</span>
        </label>
      {/each}
    </div>
    <div id="kc-form-buttons">
      <Button
        id="kc-otp-reset-form-submit"
        type="submit"
        class="w-full"
      >
        {msgStr('doSubmit')}
      </Button>
    </div>
  </form>
</Template>
