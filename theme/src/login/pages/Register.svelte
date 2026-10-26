<script lang="ts">
  import type { UserProfileFormFieldsProps } from '@keycloakify/svelte/login/components/UserProfileFormFieldsProps';
  import type { PageProps } from '@keycloakify/svelte/login/pages/PageProps';
  import { useState } from '@keycloakify/svelte/tools/useState';
  import { Button } from '$lib/components/ui/button';
  import { Checkbox } from '$lib/components/ui/checkbox';
  import { Label } from '$lib/components/ui/label';
  import { kcSanitize } from 'keycloakify/lib/kcSanitize';
  import { getKcClsx } from 'keycloakify/login/lib/kcClsx';
  import { clsx } from 'keycloakify/tools/clsx';
  import type { Component } from 'svelte';
  import type { I18n } from '../i18n';
  import type { KcContext } from '../KcContext';

  type RegisterProps = PageProps<Extract<KcContext, { pageId: 'register.ftl' }>, I18n> & {
    UserProfileFormFields: Component<UserProfileFormFieldsProps>;
    doMakeUserConfirmPassword: boolean;
  };
  const props: RegisterProps = $props();
  const { kcContext, i18n, doUseDefaultCss, Template, classes, UserProfileFormFields, doMakeUserConfirmPassword } =
    $derived(props);
  const { kcClsx } = $derived(
    getKcClsx({
      doUseDefaultCss,
      classes,
    }),
  );

  const {
    messageHeader,
    url,
    messagesPerField,
    recaptchaRequired,
    recaptchaVisible,
    recaptchaSiteKey,
    recaptchaAction,
    termsAcceptanceRequired,
  } = $derived(kcContext);

  const { msg, msgStr, advancedMsg } = $derived($i18n);

  const [isFormSubmittable, setIsFormSubmittable] = useState(false);
  let areTermsAccepted = $state(false);
  let htmlFormElement: HTMLFormElement | null = $state(null);

  $effect(() => {
    if (htmlFormElement === null) {
      return;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any)['onSubmitRecaptcha'] = () => {
      // @ts-expect-error; form not null
      htmlFormElement.requestSubmit();
    };

    return () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (window as any)['onSubmitRecaptcha'];
    };
  });
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
    {#if messageHeader !== undefined}
      {@render advancedMsg(messageHeader)()}
    {:else}
      {@render msg('registerTitle')()}
    {/if}
  {/snippet}
  <form
    id="kc-register-form"
    class="space-y-4"
    action={url.registrationAction}
    method="post"
    bind:this={htmlFormElement}
  >
    <UserProfileFormFields
      {kcContext}
      {i18n}
      {kcClsx}
      onIsFormSubmittableValueChange={setIsFormSubmittable}
      {doMakeUserConfirmPassword}
    />
    {#if termsAcceptanceRequired}
      <div class="space-y-3">
        <div class="space-y-2">
          <span class="text-sm font-medium">{@render msg('termsTitle')()}</span>
          <div
            id="kc-registration-terms-text"
            class="max-h-40 overflow-y-auto rounded-md border bg-muted/30 p-3 text-sm text-muted-foreground"
          >
            {@render msg('termsText')()}
          </div>
        </div>
        <div class="space-y-1">
          <Label
            for="termsAccepted"
            class="inline-flex! w-fit cursor-pointer items-center! gap-2! text-sm font-normal whitespace-nowrap"
          >
            <input
              type="hidden"
              name="termsAccepted"
              value="on"
              disabled={!areTermsAccepted}
            />
            <Checkbox
              id="termsAccepted"
              class="shrink-0"
              bind:checked={areTermsAccepted}
              aria-invalid={messagesPerField.existsError('termsAccepted')}
            />
            <span class="leading-none whitespace-nowrap">{@render msg('acceptTerms')()}</span>
          </Label>
          {#if messagesPerField.existsError('termsAccepted')}
            <span
              id="input-error-terms-accepted"
              class="block text-sm text-destructive"
              aria-live="polite"
            >
              {@html kcSanitize(messagesPerField.get('termsAccepted'))}
            </span>
          {/if}
        </div>
      </div>
    {/if}
    {#if recaptchaRequired && (recaptchaVisible || recaptchaAction === undefined)}
      <div>
        <div
          class="g-recaptcha"
          data-size="compact"
          data-sitekey={recaptchaSiteKey}
          data-action={recaptchaAction}
        ></div>
      </div>
    {/if}
    <div class="space-y-3">
      <div id="kc-form-options">
        <Button
          href={url.loginUrl}
          variant="link"
          class="h-auto px-0 py-0 text-sm leading-none"
        >
          {@render msg('backToLogin')()}
        </Button>
      </div>
      {#if recaptchaRequired && !recaptchaVisible && recaptchaAction !== undefined}
        <div id="kc-form-buttons">
          <button
            class={clsx('g-recaptcha')}
            data-sitekey={recaptchaSiteKey}
            data-callback="onSubmitRecaptcha"
            data-action={recaptchaAction}
            type="submit"
          >
            {@render msg('doRegister')()}
          </button>
        </div>
      {:else}
        <div id="kc-form-buttons">
          <Button
            disabled={!$isFormSubmittable || (termsAcceptanceRequired && !areTermsAccepted)}
            type="submit"
            class="w-full"
          >
            {msgStr('doRegister')}
          </Button>
        </div>
      {/if}
    </div>
  </form>
</Template>
