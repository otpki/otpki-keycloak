<script lang="ts">
  import type { PageProps } from '@keycloakify/svelte/login/pages/PageProps';
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label';
  import type { KcContext } from '../KcContext';
  import type { I18n } from '../i18n';

  const {
    Template,
    kcContext,
    i18n,
    doUseDefaultCss,
    classes,
  }: PageProps<Extract<KcContext, { pageId: 'login-oauth2-device-verify-user-code.ftl' }>, I18n> = $props();

  const url = $derived(kcContext.url);

  const { msg, msgStr } = $i18n;
</script>

<Template
  {kcContext}
  {i18n}
  {doUseDefaultCss}
  {classes}
>
  {#snippet headerNode()}
    {@render msg('oauth2DeviceVerificationTitle')()}
  {/snippet}
  <form
    id="kc-user-verify-device-user-code-form"
    class="space-y-4"
    action={url.oauth2DeviceVerificationAction}
    method="post"
  >
    <div class="space-y-2">
      <Label for="device-user-code">
          {@render msg('verifyOAuth2DeviceUserCode')()}
      </Label>

      <!-- svelte-ignore a11y_autofocus -->
      <Input
        id="device-user-code"
        name="device_user_code"
        autocomplete="off"
        type="text"
        autofocus
      />
    </div>

    <div id="kc-form-buttons">
      <Button
        type="submit"
        class="w-full"
      >
        {msgStr('doSubmit')}
      </Button>
    </div>
  </form>
</Template>
