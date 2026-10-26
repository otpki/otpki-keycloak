<script lang="ts">
  import type { PageProps } from '@keycloakify/svelte/login/pages/PageProps';
  import { Button } from '$lib/components/ui/button';
  import { Checkbox } from '$lib/components/ui/checkbox';
  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label';
  import { kcSanitize } from 'keycloakify/lib/kcSanitize';
  import { clsx } from 'keycloakify/tools/clsx';
  import type { I18n } from '../i18n';
  import type { KcContext } from '../KcContext';

  const {
    Template,
    kcContext,
    i18n,
    doUseDefaultCss,
    classes,
  }: PageProps<Extract<KcContext, { pageId: 'login-update-password.ftl' }>, I18n> = $props();

  const { msg, msgStr } = $i18n;

  const url = $derived(kcContext.url);
  const messagesPerField = $derived(kcContext.messagesPerField);
  const isAppInitiatedAction = $derived(kcContext.isAppInitiatedAction);

  let logoutOtherSessionsChecked = $state(true);
</script>

<Template
  {kcContext}
  {i18n}
  {doUseDefaultCss}
  {classes}
  displayMessage={!messagesPerField.existsError('password', 'password-confirm')}
>
  {#snippet headerNode()}
    {@render msg('updatePasswordTitle')()}
  {/snippet}
  <form
    id="kc-passwd-update-form"
    class="space-y-4"
    action={url.loginAction}
    method="post"
  >
    <div class="space-y-2">
      <Label for="password-new">
        {@render msg('passwordNew')()}
      </Label>

      <Input
        type="password"
        id="password-new"
        name="password-new"
        class={clsx(messagesPerField.existsError('password', 'password-confirm') && 'border-destructive')}
        autofocus
        autocomplete="new-password"
        aria-invalid={messagesPerField.existsError('password', 'password-confirm')}
      />

      {#if messagesPerField.existsError('password')}
        <span
          id="input-error-password"
          class="text-sm text-destructive"
          aria-live="polite">{@html kcSanitize(messagesPerField.get('password'))}</span
        >
      {/if}
    </div>

    <div class="space-y-2">
      <Label for="password-confirm">
        {@render msg('passwordConfirm')()}
      </Label>

      <Input
        type="password"
        id="password-confirm"
        name="password-confirm"
        class={clsx(messagesPerField.existsError('password', 'password-confirm') && 'border-destructive')}
        autocomplete="new-password"
        aria-invalid={messagesPerField.existsError('password', 'password-confirm')}
      />

      {#if messagesPerField.existsError('password-confirm')}
        <span
          id="input-error-password-confirm"
          class="text-sm text-destructive"
          aria-live="polite">{@html kcSanitize(messagesPerField.get('password-confirm'))}</span
        >
      {/if}
    </div>

    <div class="space-y-2">
      <Label
        for="logout-sessions"
        class="inline-flex! w-fit cursor-pointer items-center! gap-2! text-sm font-normal whitespace-nowrap text-muted-foreground"
      >
        <input
          type="hidden"
          name="logout-sessions"
          value="on"
          disabled={!logoutOtherSessionsChecked}
        />
        <Checkbox
          id="logout-sessions"
          class="shrink-0"
          bind:checked={logoutOtherSessionsChecked}
        />
        <span class="leading-none whitespace-nowrap">{@render msg('logoutOtherSessions')()}</span>
      </Label>
    </div>

    <div
      id="kc-form-buttons"
      class={isAppInitiatedAction ? 'grid gap-2 sm:grid-cols-2' : ''}
    >
      <Button
        type="submit"
        class="w-full"
      >
        {msgStr('doSubmit')}
      </Button>
      {#if isAppInitiatedAction}
        <Button
          variant="outline"
          type="submit"
          name="cancel-aia"
          value="true"
          class="w-full"
        >
          {@render msg('doCancel')()}
        </Button>
      {/if}
    </div>
  </form>
</Template>
