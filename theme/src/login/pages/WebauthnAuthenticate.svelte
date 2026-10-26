<script lang="ts">
  import type { PageProps } from '@keycloakify/svelte/login/pages/PageProps';
  import { useScript } from '@keycloakify/svelte/login/pages/WebauthnAuthenticate.useScript';
  import { Button } from '$lib/components/ui/button';
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
  }: PageProps<Extract<KcContext, { pageId: 'webauthn-authenticate.ftl' }>, I18n> = $props();

  const { url, realm, registrationDisabled, authenticators, shouldDisplayAuthenticators } = $derived(kcContext);

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
  displayInfo={realm.registrationAllowed && !registrationDisabled}
>
  {#snippet headerNode()}
    {@render msg('webauthn-login-title')()}
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
  <div
    id="kc-form-webauthn"
    class="space-y-4"
  >
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
    {#if authenticators}
      <form id="authn_select">
        {#each authenticators.authenticators as authenticator (authenticator.credentialId)}
          <input
            type="hidden"
            name="authn_use_chk"
            value={authenticator.credentialId}
          />
        {/each}
      </form>

      {#if shouldDisplayAuthenticators}
        <div class="space-y-2">
          {#if authenticators.authenticators.length > 1}
            <p class="text-sm font-medium text-muted-foreground">
              {@render msg('webauthn-available-authenticators')()}
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
                {#if authenticator.transports.displayNameProperties?.length}
                  <div
                    id={`kc-webauthn-authenticator-transport-${i}`}
                    class="text-sm text-muted-foreground"
                  >
                    {#each authenticator.transports.displayNameProperties as displayNameProperty, j (displayNameProperty)}
                      {@const hasNext = j !== authenticator.transports.displayNameProperties.length - 1}
                      {@render advancedMsg(displayNameProperty)()}
                      {#if hasNext}<span>, </span>{/if}
                    {/each}
                  </div>
                {/if}
                <div class="text-xs text-muted-foreground">
                  <span id={`kc-webauthn-authenticator-createdlabel-${i}`}>
                    {@render msg('webauthn-createdAt-label')()}
                  </span>
                  <span id={`kc-webauthn-authenticator-created-${i}`}>{authenticator.createdAt}</span>
                </div>
              </div>
            </div>
          {/each}
        </div>
      {/if}
    {/if}
    <div id="kc-form-buttons">
      <Button
        id={authButtonId}
        type="button"
        autofocus
        class="w-full"
      >
        <FingerprintIcon class="size-4" />
        {msgStr('webauthn-doAuthenticate')}
      </Button>
    </div>
  </div>
</Template>
