<script lang="ts">
  import type { UserProfileFormFieldsProps } from '@keycloakify/svelte/login/components/UserProfileFormFieldsProps';
  import type { PageProps } from '@keycloakify/svelte/login/pages/PageProps';
  import { useState } from '@keycloakify/svelte/tools/useState';
  import { Button } from '$lib/components/ui/button';
  import { Checkbox } from '$lib/components/ui/checkbox';
  import { Label } from '$lib/components/ui/label';
  import { getKcClsx } from 'keycloakify/login/lib/kcClsx';
  import type { Component } from 'svelte';
  import type { I18n } from '../i18n';
  import type { KcContext } from '../KcContext';

  type UpdateEmailProps = PageProps<Extract<KcContext, { pageId: 'update-email.ftl' }>, I18n> & {
    UserProfileFormFields: Component<UserProfileFormFieldsProps>;
    doMakeUserConfirmPassword: boolean;
  };

  const {
    Template,
    kcContext,
    i18n,
    doUseDefaultCss,
    classes,
    UserProfileFormFields,
    doMakeUserConfirmPassword,
  }: UpdateEmailProps = $props();

  const resolveKcClsx = () =>
    getKcClsx({
      doUseDefaultCss,
      classes,
    });
  const { kcClsx } = resolveKcClsx();

  const { msg, msgStr } = $i18n;

  const [isFormSubmittable, setIsFormSubmittable] = useState(false);

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
  displayMessage={messagesPerField.exists('global')}
  displayRequiredFields={true}
>
  {#snippet headerNode()}
    {@render msg('updateEmailTitle')()}
  {/snippet}
  <form
    id="kc-update-email-form"
    class="space-y-4"
    action={url.loginAction}
    method="post"
  >
    <UserProfileFormFields
      {kcContext}
      {i18n}
      {kcClsx}
      onIsFormSubmittableValueChange={setIsFormSubmittable}
      {doMakeUserConfirmPassword}
    />

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
        disabled={!$isFormSubmittable}
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
