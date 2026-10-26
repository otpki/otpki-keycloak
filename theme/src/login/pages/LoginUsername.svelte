<script lang="ts">
  import type { PageProps } from '@keycloakify/svelte/login/pages/PageProps';
  import { useState } from '@keycloakify/svelte/tools/useState';
  import { Button } from '$lib/components/ui/button';
  import { Checkbox } from '$lib/components/ui/checkbox';
  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label';
  import { kcSanitize } from 'keycloakify/lib/kcSanitize';
  import { clsx } from 'keycloakify/tools/clsx';
  import { untrack } from 'svelte';
  import FingerprintIcon from '@lucide/svelte/icons/fingerprint';
  import type { KcContext } from '../KcContext';
  import type { I18n } from '../i18n';
  import { useScript } from '@keycloakify/svelte/login/pages/LoginUsername.useScript';

  const {
    Template,
    kcContext,
    i18n,
    doUseDefaultCss,
    classes,
  }: PageProps<Extract<KcContext, { pageId: 'login-username.ftl' }>, I18n> = $props();

  const {
    social,
    realm,
    url,
    usernameHidden,
    login,
    registrationDisabled,
    messagesPerField,
    enableWebAuthnConditionalUI,
    authenticators,
  } = $derived(kcContext);

  const { msg, msgStr } = $derived($i18n);

  const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);
  let isRememberMeChecked = $state(untrack(() => !!kcContext.login.rememberMe));

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
  displayMessage={!messagesPerField.existsError('username')}
  displayInfo={realm.password && realm.registrationAllowed && !registrationDisabled}
>
  {#snippet headerNode()}
    {@render msg('doLogIn')()}
  {/snippet}
  {#snippet infoNode()}
    <div id="kc-registration">
      <div class="flex items-center justify-center text-sm text-muted-foreground">
        <span>{@render msg('noAccount')()}</span>
        <Button
          tabindex={6}
          href={url.registrationUrl}
          variant="link"
        >
          {@render msg('doRegister')()}
        </Button>
      </div>
    </div>
  {/snippet}
  {#snippet socialProvidersNode()}
    {@const providers = social?.providers}
    {#if realm.password && !!providers && !!providers.length}
      <div
        id="kc-social-providers"
        class="space-y-3"
      >
        <div class="space-y-2">
          <h2 class="text-sm font-medium text-muted-foreground">{@render msg('identity-provider-login-label')()}</h2>
          <div class={clsx('grid gap-2', providers.length > 3 ? 'grid-cols-2' : 'grid-cols-1')}>
            {#each providers as p (p.providerId)}
              <Button
                id={`social-${p.alias}`}
                variant="outline"
                href={p.loginUrl}
                class="w-full justify-center gap-2"
              >
                {#if p.iconClasses}
                  <i
                    class={clsx(p.iconClasses, 'text-base')}
                    aria-hidden="true"
                  ></i>
                {/if}
                <span class="truncate text-sm">{@html kcSanitize(p.displayName)}</span>
              </Button>
            {/each}
          </div>
        </div>
      </div>
    {/if}
  {/snippet}

  <div
    id="kc-form"
    class="space-y-4"
  >
    <div id="kc-form-wrapper">
      {#if realm.password}
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
          {#if !usernameHidden}
            <div class="space-y-2">
              <Label for="username">
                {@render (!realm.loginWithEmailAllowed
                  ? msg('username')
                  : !realm.registrationEmailAsUsername
                    ? msg('usernameOrEmail')
                    : msg('email'))()}
              </Label>
              <Input
                tabindex={2}
                id="username"
                class={clsx(messagesPerField.existsError('username') && 'border-destructive')}
                name="username"
                value={login.username ?? ''}
                type="text"
                autofocus
                autocomplete={enableWebAuthnConditionalUI ? 'username webauthn' : 'username'}
                aria-invalid={messagesPerField.existsError('username')}
              />
              {#if messagesPerField.existsError('username')}
                <span
                  id="input-error"
                  class="text-sm text-destructive"
                  aria-live="polite"
                >
                  {messagesPerField.getFirstError('username')}
                </span>
              {/if}
            </div>
          {/if}

          <div id="kc-form-options">
            {#if realm.rememberMe && !usernameHidden}
              <Label
                for="rememberMe"
                class="inline-flex! w-fit cursor-pointer items-center! gap-2! text-sm font-normal whitespace-nowrap text-muted-foreground"
              >
                <input
                  type="hidden"
                  name="rememberMe"
                  value="on"
                  disabled={!isRememberMeChecked}
                />
                <Checkbox
                  tabindex={3}
                  id="rememberMe"
                  class="shrink-0"
                  bind:checked={isRememberMeChecked}
                />
                <span class="leading-none whitespace-nowrap">{@render msg('rememberMe')()}</span>
              </Label>
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
      {/if}
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
