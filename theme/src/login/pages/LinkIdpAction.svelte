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
  }: PageProps<Extract<KcContext, { pageId: 'link-idp-action.ftl' }>, I18n> = $props();

  const { idpDisplayName, url } = $derived(kcContext);
  const { msg, msgStr } = $derived($i18n);
</script>

<Template
  {kcContext}
  {i18n}
  {doUseDefaultCss}
  {classes}
  displayMessage={false}
>
  {#snippet headerNode()}
    {@render msg('linkIdpActionTitle', idpDisplayName)()}
  {/snippet}
  <div class="space-y-4">
    <div
      id="kc-link-text"
      class="rounded-md border bg-muted/30 p-4 text-sm"
    >
      {@render msg('linkIdpActionMessage', idpDisplayName)()}
    </div>
    <form
      action={url.loginAction}
      method="post"
      class="flex gap-3"
    >
      <Button
        name="continue"
        id="kc-continue"
        type="submit"
        class="flex-1"
      >
        {msgStr('doContinue')}
      </Button>
      <Button
        name="cancel-aia"
        id="kc-cancel"
        type="submit"
        variant="outline"
        class="flex-1"
      >
        {msgStr('doCancel')}
      </Button>
    </form>
  </div>
</Template>
