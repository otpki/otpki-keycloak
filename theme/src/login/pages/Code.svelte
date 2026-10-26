<script lang="ts">
  import type { PageProps } from '@keycloakify/svelte/login/pages/PageProps';
  import { kcSanitize } from 'keycloakify/lib/kcSanitize';
  import CircleCheckIcon from '@lucide/svelte/icons/circle-check';
  import CircleXIcon from '@lucide/svelte/icons/circle-x';
  import type { KcContext } from '../KcContext';
  import type { I18n } from '../i18n';

  const {
    Template,
    kcContext,
    i18n,
    doUseDefaultCss,
    classes,
  }: PageProps<Extract<KcContext, { pageId: 'code.ftl' }>, I18n> = $props();

  const { code } = $derived(kcContext);
  const { msg } = $derived($i18n);
</script>

<Template
  {kcContext}
  {i18n}
  {doUseDefaultCss}
  {classes}
>
  {#snippet headerNode()}
    {#if code.success}
      {@render msg('codeSuccessTitle')()}
    {:else}
      {@render msg('codeErrorTitle', code.error)()}
    {/if}
  {/snippet}
  <div id="kc-code">
    {#if code.success}
      <div class="space-y-4">
        <div class="flex items-start gap-3 rounded-md border bg-muted/30 p-4 text-sm">
          <CircleCheckIcon class="mt-0.5 size-4 shrink-0 text-muted-foreground" />
          <p>{@render msg('copyCodeInstruction')()}</p>
        </div>
        <input
          id="code"
          class="flex h-9 w-full rounded-md border border-input bg-muted/50 px-3 py-1 font-mono text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
          value={code.code}
          readonly
        />
      </div>
    {:else if code.error}
      <div class="flex items-start gap-3 rounded-md border border-destructive/30 bg-destructive/10 p-4 text-sm">
        <CircleXIcon class="mt-0.5 size-4 shrink-0 text-destructive" />
        <p
          id="error"
          class="text-destructive"
        >
          {@html kcSanitize(code.error)}
        </p>
      </div>
    {/if}
  </div>
</Template>
