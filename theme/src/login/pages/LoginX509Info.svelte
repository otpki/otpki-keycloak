<script lang="ts">
  import type { PageProps } from '@keycloakify/svelte/login/pages/PageProps';
  import { Button } from '$lib/components/ui/button';
  import { Label } from '$lib/components/ui/label';
  import type { KcContext } from '../KcContext';
  import type { I18n } from '../i18n';

  const {
    Template,
    kcContext,
    i18n,
    doUseDefaultCss,
    classes,
  }: PageProps<Extract<KcContext, { pageId: 'login-x509-info.ftl' }>, I18n> = $props();

  const { url, x509 } = $derived(kcContext);
  const { msg, msgStr } = $derived($i18n);
</script>

<Template
  {kcContext}
  {i18n}
  {doUseDefaultCss}
  {classes}
>
  {#snippet headerNode()}
    {@render msg('doLogIn')()}
  {/snippet}
  <form
    id="kc-x509-login-info"
    class="space-y-4"
    action={url.loginAction}
    method="post"
  >
    <div class="space-y-2">
      <Label for="certificate_subjectDN">
        {@render msg('clientCertificate')()}
      </Label>
      <div
        id="certificate_subjectDN"
        class="rounded-md border border-input bg-muted/30 px-3 py-2 font-mono text-sm break-all"
      >
        {#if x509.formData.subjectDN}
          {x509.formData.subjectDN}
        {:else}
          <span class="text-muted-foreground">{@render msg('noCertificate')()}</span>
        {/if}
      </div>
    </div>
    {#if x509.formData.isUserEnabled}
      <div class="space-y-2">
        <Label for="username">
          {@render msg('doX509Login')()}
        </Label>
        <div
          id="username"
          class="rounded-md border border-input bg-muted/30 px-3 py-2 text-sm"
        >
          {x509.formData.username}
        </div>
      </div>
    {/if}
    <div
      id="kc-form-buttons"
      class="flex gap-3"
    >
      <Button
        name="login"
        id="kc-login"
        type="submit"
        class="flex-1"
      >
        {msgStr('doContinue')}
      </Button>
      {#if x509.formData.isUserEnabled}
        <Button
          name="cancel"
          id="kc-cancel"
          type="submit"
          variant="outline"
          class="flex-1"
        >
          {msgStr('doIgnore')}
        </Button>
      {/if}
    </div>
  </form>
</Template>
