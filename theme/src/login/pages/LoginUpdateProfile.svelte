<script lang="ts">
  import type { UserProfileFormFieldsProps } from '@keycloakify/svelte/login/components/UserProfileFormFieldsProps';
  import type { PageProps } from '@keycloakify/svelte/login/pages/PageProps';
  import { useState } from '@keycloakify/svelte/tools/useState';
  import { Button } from '$lib/components/ui/button';
  import { getKcClsx } from 'keycloakify/login/lib/kcClsx';
  import type { Component } from 'svelte';
  import type { I18n } from '../i18n';
  import type { KcContext } from '../KcContext';

  type LoginUpdateProfileProps = PageProps<Extract<KcContext, { pageId: 'login-update-profile.ftl' }>, I18n> & {
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
  }: LoginUpdateProfileProps = $props();

  const resolveKcClsx = () => getKcClsx({
    doUseDefaultCss,
    classes,
  });
  const { kcClsx } = resolveKcClsx();

  const messagesPerField = $derived(kcContext.messagesPerField);
  const url = $derived(kcContext.url);
  const isAppInitiatedAction = $derived(kcContext.isAppInitiatedAction);

  const { msg, msgStr } = $i18n;

  const [isFormSubmittable, setIsFormSubmittable] = useState(false);
</script>

<Template
  {kcContext}
  {i18n}
  {doUseDefaultCss}
  {classes}
  displayRequiredFields={true}
  displayMessage={messagesPerField.exists('global')}
>
  {#snippet headerNode()}
    {@render msg('loginProfileTitle')()}
  {/snippet}

  <form
    id="kc-update-profile-form"
    class={kcClsx('kcFormClass')}
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

    <div class={kcClsx('kcFormGroupClass')}>
      <div id="kc-form-buttons" class={isAppInitiatedAction ? 'grid gap-2 sm:grid-cols-2' : ''}>
        <Button disabled={!$isFormSubmittable} type="submit" class="w-full">
          {msgStr('doSubmit')}
        </Button>
        {#if isAppInitiatedAction}
          <Button
            variant="outline"
            type="submit"
            name="cancel-aia"
            value="true"
            formnovalidate
            class="w-full"
          >
            {@render msg('doCancel')()}
          </Button>
        {/if}
      </div>
    </div>
  </form>
</Template>
