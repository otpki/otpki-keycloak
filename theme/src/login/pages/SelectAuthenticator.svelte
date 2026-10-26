<script lang="ts">
  import type { PageProps } from '@keycloakify/svelte/login/pages/PageProps';
  import ChevronRightIcon from '@lucide/svelte/icons/chevron-right';
  import FingerprintIcon from '@lucide/svelte/icons/fingerprint';
  import KeyRoundIcon from '@lucide/svelte/icons/key-round';
  import LockIcon from '@lucide/svelte/icons/lock';
  import MailIcon from '@lucide/svelte/icons/mail';
  import ShieldCheckIcon from '@lucide/svelte/icons/shield-check';
  import SmartphoneIcon from '@lucide/svelte/icons/smartphone';
  import UserRoundIcon from '@lucide/svelte/icons/user-round';
  import type { Component } from 'svelte';
  import type { KcContext } from '../KcContext';
  import type { I18n } from '../i18n';

  const {
    Template,
    kcContext,
    i18n,
    doUseDefaultCss,
    classes,
  }: PageProps<Extract<KcContext, { pageId: 'select-authenticator.ftl' }>, I18n> = $props();
  const { url, auth } = $derived(kcContext);

  const { msg, advancedMsg } = $derived($i18n);

  const iconFor = (iconCssClass: string | undefined): Component<{ class?: string }> => {
    const cls = iconCssClass ?? '';
    if (cls.includes('mobile') || cls.includes('otp') || cls.includes('totp')) return SmartphoneIcon;
    if (cls.includes('key') || cls.includes('password')) return KeyRoundIcon;
    if (cls.includes('fingerprint') || cls.includes('webauthn') || cls.includes('passkey')) return FingerprintIcon;
    if (cls.includes('mail') || cls.includes('email')) return MailIcon;
    if (cls.includes('user') || cls.includes('x509')) return UserRoundIcon;
    if (cls.includes('lock') || cls.includes('recovery')) return LockIcon;
    return ShieldCheckIcon;
  };
</script>

<Template
  {kcContext}
  {i18n}
  {doUseDefaultCss}
  {classes}
  displayInfo={false}
>
  {#snippet headerNode()}
    {@render msg('loginChooseAuthenticator')()}
  {/snippet}
  <form
    id="kc-select-credential-form"
    class="space-y-3"
    action={url.loginAction}
    method="post"
  >
    <div class="space-y-2">
      {#each auth.authenticationSelections as authenticationSelection (authenticationSelection.authExecId)}
        {@const Icon = iconFor(authenticationSelection.iconCssClass)}
        <button
          class="flex w-full items-center gap-3 rounded-lg border border-input bg-card p-4 text-left text-card-foreground shadow-xs transition-colors hover:bg-accent hover:text-accent-foreground"
          type="submit"
          name="authenticationExecution"
          value={authenticationSelection.authExecId}
        >
          <div class="flex size-10 shrink-0 items-center justify-center rounded-md bg-muted">
            <Icon class="size-5 text-muted-foreground" />
          </div>
          <div class="min-w-0 flex-1">
            <div class="text-sm font-medium">
              {@render advancedMsg(authenticationSelection.displayName)()}
            </div>
            <div class="mt-0.5 truncate text-sm text-muted-foreground">
              {@render advancedMsg(authenticationSelection.helpText)()}
            </div>
          </div>
          <ChevronRightIcon class="size-4 shrink-0 text-muted-foreground" />
        </button>
      {/each}
    </div>
  </form>
</Template>
