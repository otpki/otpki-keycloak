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
  }: PageProps<Extract<KcContext, { pageId: 'login-verify-email.ftl' }>, I18n> = $props();

  const { msg } = $i18n;

  const url = $derived(kcContext.url);
  const user = $derived(kcContext.user);
</script>

<Template
  {kcContext}
  {i18n}
  {doUseDefaultCss}
  {classes}
  displayInfo={true}
>
  {#snippet headerNode()}
    {@render msg('emailVerifyTitle')()}
  {/snippet}
  {#snippet infoNode()}
    <div class="w-full rounded-lg border bg-card p-4 text-left text-sm text-muted-foreground">
      <p>
        {@render msg('emailVerifyInstruction2')()}
      </p>
      <div class="mt-2 flex items-center gap-2">
        <Button
          href={url.loginAction}
          variant="link"
          class="h-auto px-0 py-0 text-sm"
        >
          {@render msg('doClickHere')()}
        </Button>
        <span>{@render msg('emailVerifyInstruction3')()}</span>
      </div>
    </div>
  {/snippet}
  <p class="rounded-lg border bg-card p-4 text-sm text-foreground">
    {@render msg('emailVerifyInstruction1', user?.email ?? '')()}
  </p>
</Template>
