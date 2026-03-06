<script lang="ts">
  import type { PageProps } from '@keycloakify/svelte/login/pages/PageProps';
  import { Button } from '$lib/components/ui/button';
  import type { KcContext } from '../KcContext';
  import type { I18n } from '../i18n';
  import { kcSanitize } from 'keycloakify/lib/kcSanitize';

  const {
    Template,
    kcContext,
    i18n,
    doUseDefaultCss,
    classes,
  }: PageProps<Extract<KcContext, { pageId: 'error.ftl' }>, I18n> = $props();

  const message = $derived(kcContext.message);
  const client = $derived(kcContext.client);
  const skipLink = $derived(kcContext.skipLink);

  const { msg } = $i18n;
</script>

<Template
  {kcContext}
  {i18n}
  {doUseDefaultCss}
  {classes}
  displayMessage={false}
>
  {#snippet headerNode()}
    {@render msg('errorTitle')()}
  {/snippet}
  <div id="kc-error-message" class="space-y-4">
    <p class="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
      {@html kcSanitize(message.summary)}
    </p>
    {#if !skipLink && client !== undefined && client.baseUrl !== undefined}
      <div>
        <Button
          id="backToApplication"
          href={client.baseUrl}
          variant="outline"
          class="w-full sm:w-auto"
        >
          {@render msg('backToApplication')()}
        </Button>
      </div>
    {/if}
  </div>
</Template>
