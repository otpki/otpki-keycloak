<script lang="ts">
  import type { PageProps } from '@keycloakify/svelte/login/pages/PageProps';
  import { useState } from '@keycloakify/svelte/tools/useState';
  import { Button } from '$lib/components/ui/button';
  import { Checkbox } from '$lib/components/ui/checkbox';
  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label';
  import { kcSanitize } from 'keycloakify/lib/kcSanitize';
  import { clsx } from 'keycloakify/tools/clsx';
  import type { I18n } from '../i18n';
  import type { KcContext } from '../KcContext';
  const {
    kcContext,
    i18n,
    doUseDefaultCss,
    Template,
    classes,
  }: PageProps<Extract<KcContext, { pageId: 'login.ftl' }>, I18n> = $props();

  const social = $derived(kcContext.social);
  const realm = $derived(kcContext.realm);
  const url = $derived(kcContext.url);
  const usernameHidden = $derived(kcContext.usernameHidden);
  const login = $derived(kcContext.login);
  const auth = $derived(kcContext.auth);
  const registrationDisabled = $derived(kcContext.registrationDisabled);
  const messagesPerField = $derived(kcContext.messagesPerField);

  const { msg, msgStr } = $i18n;

  const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);
  const getInitialRememberMe = () => !!kcContext.login.rememberMe;
  let isRememberMeChecked = $state(getInitialRememberMe());
</script>

<Template
  {kcContext}
  {i18n}
  {doUseDefaultCss}
  {classes}
  displayMessage={!messagesPerField.existsError('username', 'password')}
  displayInfo={realm.password && realm.registrationAllowed && !registrationDisabled}
>
  {#snippet headerNode()}
    {@render msg('loginAccountTitle')()}
  {/snippet}

  {#snippet infoNode()}
    <div id="kc-registration-container">
      <div id="kc-registration">
        <div class="flex items-center justify-centertext-sm text-muted-foreground">
          <span>{@render msg('noAccount')()}</span>
          <Button
            tabindex={8}
            href={url.registrationUrl}
            variant="link"
          >
            {@render msg('doRegister')()}
          </Button>
        </div>
      </div>
    </div>
  {/snippet}
  {#snippet socialProvidersNode()}
    {@const providers = social?.providers}
    {#if realm.password && !!providers && !!providers.length}
      <div id="kc-social-providers" class="space-y-3">
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
  <div id="kc-form" class="space-y-4">
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
              <!-- svelte-ignore a11y_autofocus -->
              <Input
                tabindex={2}
                id="username"
                class={clsx(messagesPerField.existsError('username', 'password') && 'border-destructive')}
                name="username"
                value={login.username ?? ''}
                type="text"
                autofocus
                autocomplete="username"
                aria-invalid={messagesPerField.existsError('username', 'password')}
              />
              {#if messagesPerField.existsError('username', 'password')}
                <span
                  id="input-error"
                  class="text-sm text-destructive"
                  aria-live="polite">{@html kcSanitize(messagesPerField.getFirstError('username', 'password'))}</span
                >
              {/if}
            </div>
          {/if}

          <div class="space-y-2">
            <Label for="password">
              {@render msg('password')()}
            </Label>
            <Input
              tabindex={3}
              id="password"
              class={clsx(messagesPerField.existsError('username', 'password') && 'border-destructive')}
              name="password"
              type="password"
              autocomplete="current-password"
              aria-invalid={messagesPerField.existsError('username', 'password')}
            />
            {#if usernameHidden && messagesPerField.existsError('username', 'password')}
              <span
                id="input-error"
                class="text-sm text-destructive"
                aria-live="polite">{@html kcSanitize(messagesPerField.getFirstError('username', 'password'))}</span
              >
            {/if}
          </div>

          <div class="grid grid-cols-[1fr_auto] items-center gap-3">
            <div id="kc-form-options">
              {#if realm.rememberMe && !usernameHidden}
                <Label
                  for="rememberMe"
                  class="inline-flex! items-center! gap-2! w-fit cursor-pointer text-sm font-normal text-muted-foreground whitespace-nowrap"
                >
                  <input
                    type="hidden"
                    name="rememberMe"
                    value="on"
                    disabled={!isRememberMeChecked}
                  />
                  <Checkbox
                    tabindex={5}
                    id="rememberMe"
                    class="shrink-0"
                    bind:checked={isRememberMeChecked}
                  />
                  <span class="leading-none whitespace-nowrap">{@render msg('rememberMe')()}</span>
                </Label>
              {/if}
            </div>

            {#if realm.resetPasswordAllowed}
              <Button
                tabindex={6}
                href={url.loginResetCredentialsUrl}
                variant="link"
                class="h-auto px-0 py-0 text-sm leading-none"
              >
                {@render msg('doForgotPassword')()}
              </Button>
            {/if}
          </div>

          <div id="kc-form-buttons">
            <input
              type="hidden"
              id="id-hidden-input"
              name="credentialId"
              value={auth.selectedCredential}
            />
            <Button
              tabindex={7}
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
</Template>
