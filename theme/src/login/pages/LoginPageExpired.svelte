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
  }: PageProps<Extract<KcContext, { pageId: 'login-page-expired.ftl' }>, I18n> = $props();

  const url = $derived(kcContext.url);

  const { msg } = $i18n;
</script>

<Template
  {kcContext}
  {i18n}
  {doUseDefaultCss}
  {classes}
>
  {#snippet headerNode()}
    {@render msg('pageExpiredTitle')()}
  {/snippet}

  <div
    id="instruction1"
    class="space-y-3"
  >
    <div class="flex flex-col gap-3 rounded-lg border bg-card p-4 sm:flex-row sm:items-center sm:justify-between">
      <p class="text-sm font-medium text-foreground">
        {@render msg('pageExpiredMsg1')()}
      </p>
      <Button
        id="loginRestartLink"
        href={url.loginRestartFlowUrl}
        variant="outline"
        class="w-full sm:w-32"
      >
        {@render msg('doClickHere')()}
      </Button>
    </div>

    <div class="flex flex-col gap-3 rounded-lg border bg-card p-4 sm:flex-row sm:items-center sm:justify-between">
      <p class="text-sm font-medium text-foreground">
        {@render msg('pageExpiredMsg2')()}
      </p>
      <Button
        id="loginContinueLink"
        href={url.loginAction}
        class="w-full sm:w-32"
      >
        {@render msg('doClickHere')()}
      </Button>
    </div>
  </div>
</Template>
