<script lang="ts">
  import { useScript } from '@keycloakify/svelte/login/pages/LoginPasskeysConditionalAuthenticate.useScript';
  import type { PageProps } from '@keycloakify/svelte/login/pages/PageProps';
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label';
  import FingerprintIcon from '@lucide/svelte/icons/fingerprint';
  import { clsx } from 'keycloakify/tools/clsx';
  import { untrack } from 'svelte';
  import type { KcContext } from '../KcContext';
  import type { I18n } from '../i18n';

  const {
    Template,
    kcContext,
    i18n,
    doUseDefaultCss,
    classes,
  }: PageProps<Extract<KcContext, { pageId: 'login-passkeys-conditional-authenticate.ftl' }>, I18n> = $props();

  const {
    messagesPerField,
    login,
    url,
    usernameHidden,
    shouldDisplayAuthenticators,
    authenticators,
    registrationDisabled,
    realm,
  } = $derived(kcContext);

  const { msg, msgStr, advancedMsg } = $derived($i18n);

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
    {@render msg('passkey-login-title')()}
  {/snippet}
  {#snippet infoNode()}
    {#if realm.registrationAllowed && !registrationDisabled}
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
    {/if}
  {/snippet}
  <div class="space-y-4">
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
    {#if authenticators !== undefined && Object.keys(authenticators).length !== 0}
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
      {#if shouldDisplayAuthenticators}
        <div class="space-y-2">
          {#if authenticators.authenticators.length > 1}
            <p class="text-sm font-medium text-muted-foreground">
              {@render msg('passkey-available-authenticators')()}
            </p>
          {/if}
          {#each authenticators.authenticators as authenticator, i (authenticator.credentialId)}
            <div
              id={`kc-webauthn-authenticator-item-${i}`}
              class="flex items-center gap-3 rounded-lg border border-input bg-card p-4 text-card-foreground shadow-xs"
            >
              <div class="flex size-10 shrink-0 items-center justify-center rounded-md bg-muted">
                <FingerprintIcon class="size-5 text-muted-foreground" />
              </div>
              <div class="min-w-0 flex-1">
                <div
                  id={`kc-webauthn-authenticator-label-${i}`}
                  class="text-sm font-medium"
                >
                  {@render advancedMsg(authenticator.label)()}
                </div>
                {#if authenticator.transports !== undefined && authenticator.transports.displayNameProperties !== undefined && authenticator.transports.displayNameProperties.length !== 0}
                  <div
                    id={`kc-webauthn-authenticator-transport-${i}`}
                    class="text-sm text-muted-foreground"
                  >
                    {#each authenticator.transports.displayNameProperties as nameProperty, j (nameProperty)}
                      <span>{@render advancedMsg(nameProperty)()}</span>
                      {#if j !== authenticator.transports.displayNameProperties.length - 1}
                        <span>, </span>{/if}
                    {/each}
                  </div>
                {/if}
                <div class="text-xs text-muted-foreground">
                  <span id={`kc-webauthn-authenticator-createdlabel-${i}`}
                    >{@render msg('passkey-createdAt-label')()}</span
                  >
                  <span id={`kc-webauthn-authenticator-created-${i}`}>{authenticator.createdAt}</span>
                </div>
              </div>
            </div>
          {/each}
        </div>
      {/if}
    {/if}
    <div id="kc-form">
      <div id="kc-form-wrapper">
        {#if realm.password}
          <form
            id="kc-form-login"
            action={url.loginAction}
            method="post"
            style:display="none"
            class="space-y-4"
            onsubmit={(event) => {
              try {
                event.currentTarget.login.disabled = true;
              } catch (e) {
                console.error(e);
              }

              return true;
            }}
          >
            {#if !usernameHidden}
              <div class="space-y-2">
                <Label for="username">
                  {@render msg('passkey-autofill-select')()}
                </Label>
                <Input
                  tabindex={1}
                  id="username"
                  aria-invalid={messagesPerField.existsError('username')}
                  class={clsx(messagesPerField.existsError('username') && 'border-destructive')}
                  name="username"
                  value={login.username ?? ''}
                  autocomplete="username webauthn"
                  type="text"
                  autofocus
                />
                {#if messagesPerField.existsError('username')}
                  <span
                    id="input-error-username"
                    class="text-sm text-destructive"
                    aria-live="polite"
                  >
                    {messagesPerField.get('username')}
                  </span>
                {/if}
              </div>
            {/if}
          </form>
        {/if}
        <div
          id="kc-form-passkey-button"
          style:display="none"
        >
          <Button
            id={authButtonId}
            type="button"
            autofocus
            class="w-full"
          >
            <FingerprintIcon class="size-4" />
            {msgStr('passkey-doAuthenticate')}
          </Button>
        </div>
      </div>
    </div>
  </div>
</Template>
