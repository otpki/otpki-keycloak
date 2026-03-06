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
  }: PageProps<Extract<KcContext, { pageId: 'login-reset-password.ftl' }>, I18n> = $props();

  const url = $derived(kcContext.url);
  const realm = $derived(kcContext.realm);
  const auth = $derived(kcContext.auth);
  const messagesPerField = $derived(kcContext.messagesPerField);

  const { msg, msgStr } = $i18n;
</script>

<Template
  {kcContext}
  {i18n}
  {doUseDefaultCss}
  {classes}
  displayInfo={true}
  displayMessage={!messagesPerField.existsError('username')}
>
  {#snippet headerNode()}
    {@render msg('emailForgotTitle')()}
  {/snippet}
  {#snippet infoNode()}
    <p class="text-sm text-muted-foreground">
      {#if realm.duplicateEmailsAllowed}
        {@render msg('emailInstructionUsername')()}
      {:else}
        {@render msg('emailInstruction')()}
      {/if}
    </p>
  {/snippet}
  <form
    id="kc-reset-password-form"
    class="space-y-4"
    action={url.loginAction}
    method="post"
  >
    <div class="space-y-2">
      <Label for="username">
          {#if !realm.loginWithEmailAllowed}
            {@render msg('username')()}
          {:else if !realm.registrationEmailAsUsername}
            {@render msg('usernameOrEmail')()}
          {:else}
            {@render msg('email')()}
          {/if}
      </Label>

      <!-- svelte-ignore a11y_autofocus -->
      <Input
        type="text"
        id="username"
        name="username"
        class={clsx(messagesPerField.existsError('username') && 'border-destructive')}
        autofocus
        value={auth.attemptedUsername ?? ''}
        aria-invalid={messagesPerField.existsError('username')}
      />

      {#if messagesPerField.existsError('username')}
        <span
          id="input-error-username"
          class="text-sm text-destructive"
          aria-live="polite">{@html kcSanitize(messagesPerField.get('username'))}</span
        >
      {/if}
    </div>

    <div class="flex flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-between">
      <Button href={url.loginUrl} variant="link" class="h-auto px-0 py-0 text-sm justify-start">
        {@render msg('backToLogin')()}
      </Button>

      <Button type="submit" class="w-full sm:w-auto">
        {msgStr('doSubmit')}
      </Button>
    </div>
  </form>
</Template>
