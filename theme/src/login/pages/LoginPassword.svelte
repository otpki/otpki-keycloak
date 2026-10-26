<script lang="ts">
  import type { PageProps } from '@keycloakify/svelte/login/pages/PageProps';
  import { useState } from '@keycloakify/svelte/tools/useState';
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label';
  import EyeIcon from '@lucide/svelte/icons/eye';
  import EyeOffIcon from '@lucide/svelte/icons/eye-off';
  import FingerprintIcon from '@lucide/svelte/icons/fingerprint';
  import { kcSanitize } from 'keycloakify/lib/kcSanitize';
  import { clsx } from 'keycloakify/tools/clsx';
  import { untrack } from 'svelte';
  import type { I18n } from '../i18n';
  import type { KcContext } from '../KcContext';
  import { useScript } from '@keycloakify/svelte/login/pages/LoginPassword.useScript';

  const {
    Template,
    kcContext,
    i18n,
    doUseDefaultCss,
    classes,
  }: PageProps<Extract<KcContext, { pageId: 'login-password.ftl' }>, I18n> = $props();

  const { realm, url, messagesPerField, enableWebAuthnConditionalUI, authenticators } = $derived(kcContext);

  const { msg, msgStr } = $derived($i18n);

  const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);
  let isPasswordRevealed = $state(false);

  const webAuthnButtonId = 'authenticateWebAuthnButton';

  useScript({
    webAuthnButtonId,
    kcContext: untrack(() => kcContext),
    i18n: untrack(() => i18n),
  });
</script>

<Template
  {kcContext}
  {i18n}
  {doUseDefaultCss}
  {classes}
  displayMessage={!messagesPerField.existsError('password')}
>
  {#snippet headerNode()}
    {@render msg('doLogIn')()}
  {/snippet}

  <div
    id="kc-form"
    class="space-y-4"
  >
    <div id="kc-form-wrapper">
      <form
        id="kc-form-login"
        class="space-y-4"
        onsubmit={() => {
          setIsLoginButtonDisabled(true);
          return true;
        }}
        action={url.loginAction}
        method="post"
      >
        <div class="space-y-2">
          <Label for="password">
            {@render msg('password')()}
          </Label>
          <div class="relative">
            <Input
              tabindex={2}
              id="password"
              class={clsx('pr-10', messagesPerField.existsError('username', 'password') && 'border-destructive')}
              name="password"
              type={isPasswordRevealed ? 'text' : 'password'}
              autofocus
              autocomplete="current-password"
              aria-invalid={messagesPerField.existsError('username', 'password')}
            />
            <button
              type="button"
              class="absolute inset-y-0 right-0 flex w-9 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
              aria-label={msgStr(isPasswordRevealed ? 'hidePassword' : 'showPassword')}
              onclick={() => (isPasswordRevealed = !isPasswordRevealed)}
            >
              {#if isPasswordRevealed}
                <EyeOffIcon class="size-4" />
              {:else}
                <EyeIcon class="size-4" />
              {/if}
            </button>
          </div>

          {#if messagesPerField.existsError('password')}
            <span
              id="input-error-password"
              class="text-sm text-destructive"
              aria-live="polite">{@html kcSanitize(messagesPerField.get('password'))}</span
            >
          {/if}
        </div>

        <div class="grid grid-cols-[1fr_auto] items-center gap-3">
          <div id="kc-form-options"></div>
          {#if realm.resetPasswordAllowed}
            <Button
              tabindex={5}
              href={url.loginResetCredentialsUrl}
              variant="link"
              class="h-auto px-0 py-0 text-sm leading-none"
            >
              {@render msg('doForgotPassword')()}
            </Button>
          {/if}
        </div>

        <div id="kc-form-buttons">
          <Button
            tabindex={4}
            disabled={$isLoginButtonDisabled}
            class="w-full"
            name="login"
            id="kc-login"
            type="submit"
          >
            {msgStr('doLogIn')}
          </Button>
        </div>
      </form>
    </div>
  </div>
  {#if enableWebAuthnConditionalUI}
    <div class="space-y-3">
      <form
        id="webauth"
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
          id="authenticatorData"
          name="authenticatorData"
        />
        <input
          type="hidden"
          id="signature"
          name="signature"
        />
        <input
          type="hidden"
          id="credentialId"
          name="credentialId"
        />
        <input
          type="hidden"
          id="userHandle"
          name="userHandle"
        />
        <input
          type="hidden"
          id="error"
          name="error"
        />
      </form>

      {#if authenticators !== undefined && authenticators.authenticators.length !== 0}
        <form id="authn_select">
          {#each authenticators.authenticators as authenticator (authenticator.credentialId)}
            <input
              type="hidden"
              name="authn_use_chk"
              readOnly
              value={authenticator.credentialId}
            />
          {/each}
        </form>
      {/if}

      <Button
        id={webAuthnButtonId}
        type="button"
        variant="outline"
        class="w-full"
      >
        <FingerprintIcon class="size-4" />
        {msgStr('passkey-doAuthenticate')}
      </Button>
    </div>
  {/if}
</Template>
