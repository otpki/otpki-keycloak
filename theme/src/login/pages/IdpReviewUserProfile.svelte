<script lang="ts">
  import type { UserProfileFormFieldsProps } from '@keycloakify/svelte/login/components/UserProfileFormFieldsProps';
  import type { PageProps } from '@keycloakify/svelte/login/pages/PageProps';
  import { useState } from '@keycloakify/svelte/tools/useState';
  import { Button } from '$lib/components/ui/button';
  import { getKcClsx } from 'keycloakify/login/lib/kcClsx';
  import type { Component } from 'svelte';
  import type { KcContext } from '../KcContext';
  import type { I18n } from '../i18n';

  type IdpReviewUserProfileProps = PageProps<Extract<KcContext, { pageId: 'idp-review-user-profile.ftl' }>, I18n> & {
    UserProfileFormFields: Component<UserProfileFormFieldsProps>;
    doMakeUserConfirmPassword: boolean;
  };

  const {
    kcContext,
    i18n,
    doUseDefaultCss,
    Template,
    classes,
    UserProfileFormFields,
    doMakeUserConfirmPassword,
  }: IdpReviewUserProfileProps = $props();
  const { kcClsx } = $derived(
    getKcClsx({
      doUseDefaultCss,
      classes,
    }),
  );

  const { msg, msgStr } = $derived($i18n);
  const { url, messagesPerField } = $derived(kcContext);

  const [isFomSubmittable, setIsFomSubmittable] = useState(false);
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
    {@render msg('loginIdpReviewProfileTitle')()}
  {/snippet}
  <form
    id="kc-idp-review-profile-form"
    class="space-y-4"
    action={url.loginAction}
    method="post"
  >
    <UserProfileFormFields
      {kcContext}
      {i18n}
      {kcClsx}
      onIsFormSubmittableValueChange={setIsFomSubmittable}
      {doMakeUserConfirmPassword}
    />
    <div id="kc-form-buttons">
      <Button
        type="submit"
        class="w-full"
        disabled={!$isFomSubmittable}
      >
        {msgStr('doSubmit')}
      </Button>
    </div>
  </form>
</Template>
