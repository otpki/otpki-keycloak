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
  }: PageProps<Extract<KcContext, { pageId: 'terms.ftl' }>, I18n> = $props();

  const { msg, msgStr } = $derived($i18n);
  const { url } = $derived(kcContext);
</script>

<Template
  {kcContext}
  {i18n}
  {doUseDefaultCss}
  {classes}
  displayMessage={false}
>
  {#snippet headerNode()}
    {@render msg('termsTitle')()}
  {/snippet}
  <div
    id="kc-terms-text"
    class="prose-sm max-h-96 overflow-y-auto rounded-md border bg-muted/30 p-4 text-sm text-muted-foreground"
  >
    {@render msg('termsText')()}
  </div>
  <form
    class="flex gap-3 pt-2"
    action={url.loginAction}
    method="POST"
  >
    <Button
      name="accept"
      id="kc-accept"
      type="submit"
      class="flex-1"
    >
      {msgStr('doAccept')}
    </Button>
    <Button
      name="cancel"
      id="kc-decline"
      type="submit"
      variant="outline"
      class="flex-1"
    >
      {msgStr('doDecline')}
    </Button>
  </form>
</Template>
