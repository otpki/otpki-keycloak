<script lang="ts">
  import type { PageProps } from '@keycloakify/svelte/login/pages/PageProps';
  import { Button } from '$lib/components/ui/button';
  import TriangleAlertIcon from '@lucide/svelte/icons/triangle-alert';
  import type { KcContext } from '../KcContext';
  import type { I18n } from '../i18n';

  const {
    kcContext,
    i18n,
    doUseDefaultCss,
    Template,
    classes,
  }: PageProps<Extract<KcContext, { pageId: 'delete-account-confirm.ftl' }>, I18n> = $props();

  const { url, triggered_from_aia } = $derived(kcContext);
  const { msg, msgStr } = $derived($i18n);
</script>

<Template
  {kcContext}
  {i18n}
  {doUseDefaultCss}
  {classes}
>
  {#snippet headerNode()}
    {@render msg('deleteAccountConfirm')()}
  {/snippet}

  <form
    action={url.loginAction}
    class="space-y-4"
    method="post"
  >
    <div class="flex items-start gap-3 rounded-md border border-destructive/30 bg-destructive/10 p-4 text-sm">
      <TriangleAlertIcon class="mt-0.5 size-4 shrink-0 text-destructive" />
      <span class="text-destructive">{@render msg('irreversibleAction')()}</span>
    </div>
    <p class="text-sm">{@render msg('deletingImplies')()}</p>
    <ul class="list-inside list-disc space-y-1 text-sm text-muted-foreground">
      <li>{@render msg('loggingOutImmediately')()}</li>
      <li>{@render msg('errasingData')()}</li>
    </ul>
    <p class="delete-account-text text-sm">{@render msg('finalDeletionConfirmation')()}</p>
    <div
      id="kc-form-buttons"
      class="flex gap-3"
    >
      <Button
        type="submit"
        variant="destructive"
        class="flex-1"
      >
        {msgStr('doConfirmDelete')}
      </Button>
      {#if triggered_from_aia}
        <Button
          type="submit"
          name="cancel-aia"
          value="true"
          variant="outline"
          class="flex-1"
        >
          {msgStr('doCancel')}
        </Button>
      {/if}
    </div>
  </form>
</Template>
