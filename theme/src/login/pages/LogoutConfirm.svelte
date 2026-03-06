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
  }: PageProps<Extract<KcContext, { pageId: 'logout-confirm.ftl' }>, I18n> = $props();

  const url = $derived(kcContext.url);
  const client = $derived(kcContext.client);
  const logoutConfirm = $derived(kcContext.logoutConfirm);

  const { msg, msgStr } = $i18n;
</script>

<Template
  {kcContext}
  {i18n}
  {doUseDefaultCss}
  {classes}
>
  {#snippet headerNode()}
    {@render msg('logoutConfirmTitle')()}
  {/snippet}

  <div
    id="kc-logout-confirm"
    class="space-y-4"
  >
    <p class="rounded-lg border bg-muted/30 p-4 text-sm text-foreground">{@render msg('logoutConfirmHeader')()}</p>
    <form
      class="space-y-4"
      action={url.logoutConfirmAction}
      method="POST"
    >
      <input
        type="hidden"
        name="session_code"
        value={logoutConfirm.code}
      />
      <div id="kc-form-buttons">
        <Button
          tabindex={4}
          name="confirmLogout"
          id="kc-logout"
          type="submit"
          class="w-full"
        >
          {msgStr('doLogout')}
        </Button>
      </div>
    </form>
    <div id="kc-info-message">
      {#if !logoutConfirm.skipLink && client.baseUrl}
        <Button href={client.baseUrl} variant="link" class="h-auto px-0 py-0 text-sm">
          {@render msg('backToApplication')()}
        </Button>
      {/if}
    </div>
  </div>
</Template>
