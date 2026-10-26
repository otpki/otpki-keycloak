<script lang="ts">
  import type { PageProps } from '@keycloakify/svelte/login/pages/PageProps';
  import { Button } from '$lib/components/ui/button';
  import type { KcContext } from '../KcContext';
  import type { I18n } from '../i18n';

  const {
    Template,
    kcContext,
    i18n,
    doUseDefaultCss,
    classes,
  }: PageProps<Extract<KcContext, { pageId: 'delete-credential.ftl' }>, I18n> = $props();

  const { msgStr, msg } = $derived($i18n);
  const { url, credentialLabel } = $derived(kcContext);
</script>

<Template
  {kcContext}
  {i18n}
  {doUseDefaultCss}
  {classes}
  displayMessage={false}
>
  {#snippet headerNode()}
    {@render msg('deleteCredentialTitle', credentialLabel)()}
  {/snippet}

  <div
    id="kc-delete-text"
    class="text-sm text-muted-foreground"
  >
    {@render msg('deleteCredentialMessage', credentialLabel)()}
  </div>
  <form
    class="flex gap-3"
    action={url.loginAction}
    method="POST"
  >
    <Button
      name="accept"
      id="kc-accept"
      type="submit"
      variant="destructive"
      class="flex-1"
    >
      {msgStr('doConfirmDelete')}
    </Button>
    <Button
      name="cancel-aia"
      id="kc-decline"
      type="submit"
      variant="outline"
      class="flex-1"
    >
      {msgStr('doCancel')}
    </Button>
  </form>
</Template>
