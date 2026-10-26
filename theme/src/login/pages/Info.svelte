<script lang="ts">
  import type { PageProps } from '@keycloakify/svelte/login/pages/PageProps';
  import { Button } from '$lib/components/ui/button';
  import { kcSanitize } from 'keycloakify/lib/kcSanitize';
  import InfoIcon from '@lucide/svelte/icons/info';
  import type { KcContext } from '../KcContext';
  import type { I18n } from '../i18n';

  const {
    Template,
    kcContext,
    i18n,
    doUseDefaultCss,
    classes,
  }: PageProps<Extract<KcContext, { pageId: 'info.ftl' }>, I18n> = $props();

  const { advancedMsgStr, msgStr } = $derived($i18n);
  const { messageHeader, message, requiredActions, skipLink, pageRedirectUri, actionUri, client } = $derived(kcContext);
</script>

<Template
  {kcContext}
  {i18n}
  {doUseDefaultCss}
  {classes}
  displayMessage={false}
>
  {#snippet headerNode()}
    <span>{@html kcSanitize(messageHeader ? advancedMsgStr(messageHeader) : message.summary)}</span>
  {/snippet}

  <div
    id="kc-info-message"
    class="space-y-4"
  >
    <div class="flex items-start gap-3 rounded-md border bg-muted/30 p-4 text-sm">
      <InfoIcon class="mt-0.5 size-4 shrink-0 text-muted-foreground" />
      <p class="text-foreground">
        {@html kcSanitize(
          (() => {
            let html = message.summary;

            if (requiredActions) {
              html += '<b>';

              html += requiredActions
                .map((requiredAction) => advancedMsgStr(`requiredAction.${requiredAction}`))
                .join(', ');

              html += '</b>';
            }

            return html;
          })(),
        )}
      </p>
    </div>
    {#if !skipLink}
      {#if pageRedirectUri}
        <Button
          href={pageRedirectUri}
          variant="outline"
          class="w-full"
        >
          {msgStr('backToApplication')}
        </Button>
      {:else if actionUri}
        <Button
          href={actionUri}
          class="w-full"
        >
          {msgStr('proceedWithAction')}
        </Button>
      {:else if client.baseUrl}
        <Button
          href={client.baseUrl}
          variant="outline"
          class="w-full"
        >
          {msgStr('backToApplication')}
        </Button>
      {/if}
    {/if}
  </div>
</Template>
