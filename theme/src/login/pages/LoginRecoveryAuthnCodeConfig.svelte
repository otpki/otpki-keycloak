<script lang="ts">
  import { useScript } from '@keycloakify/svelte/login/pages/LoginRecoveryAuthnCodeConfig.useScript';
  import type { PageProps } from '@keycloakify/svelte/login/pages/PageProps';
  import { Button } from '$lib/components/ui/button';
  import { Checkbox } from '$lib/components/ui/checkbox';
  import { Label } from '$lib/components/ui/label';
  import CopyIcon from '@lucide/svelte/icons/copy';
  import DownloadIcon from '@lucide/svelte/icons/download';
  import PrinterIcon from '@lucide/svelte/icons/printer';
  import TriangleAlertIcon from '@lucide/svelte/icons/triangle-alert';
  import { untrack } from 'svelte';
  import type { I18n } from '../i18n';
  import type { KcContext } from '../KcContext';

  const {
    Template,
    kcContext,
    i18n,
    doUseDefaultCss,
    classes,
  }: PageProps<Extract<KcContext, { pageId: 'login-recovery-authn-code-config.ftl' }>, I18n> = $props();

  const { recoveryAuthnCodesConfigBean, isAppInitiatedAction } = $derived(kcContext);

  const { msg, msgStr } = $derived($i18n);

  const olRecoveryCodesListId = 'kc-recovery-codes-list';

  useScript({ olRecoveryCodesListId, i18n: untrack(() => i18n) });
</script>

<Template
  {kcContext}
  {i18n}
  {doUseDefaultCss}
  {classes}
>
  {#snippet headerNode()}
    {@render msg('recovery-code-config-header')()}
  {/snippet}
  <div class="space-y-4">
    <div
      class="flex items-start gap-3 rounded-md border border-amber-500/30 bg-amber-500/10 p-4 text-sm dark:border-amber-500/40"
      role="alert"
      aria-label={msgStr('recovery-code-config-warning-title')}
    >
      <TriangleAlertIcon class="mt-0.5 size-4 shrink-0 text-amber-600 dark:text-amber-500" />
      <div>
        <h4 class="font-medium text-amber-700 dark:text-amber-400">
          {@render msg('recovery-code-config-warning-title')()}
        </h4>
        <p class="mt-1 text-amber-700/90 dark:text-amber-400/80">
          {@render msg('recovery-code-config-warning-message')()}
        </p>
      </div>
    </div>

    <ol
      id={olRecoveryCodesListId}
      class="grid grid-cols-2 gap-2 rounded-md border bg-muted/30 p-4 font-mono text-sm"
    >
      {#each recoveryAuthnCodesConfigBean.generatedRecoveryAuthnCodesList as code, index (code)}
        <li class="flex items-baseline gap-2">
          <span class="text-xs text-muted-foreground">{index + 1}.</span>
          <span>{code.slice(0, 4)}-{code.slice(4, 8)}-{code.slice(8)}</span>
        </li>
      {/each}
    </ol>

    <!-- actions -->
    <div class="flex flex-wrap gap-1">
      <Button
        id="printRecoveryCodes"
        type="button"
        variant="link"
        class="h-auto px-2"
      >
        <PrinterIcon class="size-4" />
        {@render msg('recovery-codes-print')()}
      </Button>
      <Button
        id="downloadRecoveryCodes"
        type="button"
        variant="link"
        class="h-auto px-2"
      >
        <DownloadIcon class="size-4" />
        {@render msg('recovery-codes-download')()}
      </Button>
      <Button
        id="copyRecoveryCodes"
        type="button"
        variant="link"
        class="h-auto px-2"
      >
        <CopyIcon class="size-4" />
        {@render msg('recovery-codes-copy')()}
      </Button>
    </div>

    <!-- confirmation checkbox -->
    <div>
      <Label
        for="kcRecoveryCodesConfirmationCheck"
        class="inline-flex! w-fit cursor-pointer items-start! gap-2! text-sm font-normal"
      >
        <Checkbox
          id="kcRecoveryCodesConfirmationCheck"
          class="mt-0.5 shrink-0"
          onchange={(event: Event) => {
            //@ts-expect-error: This is inherited from the original code
            document.getElementById('saveRecoveryAuthnCodesBtn').disabled = !event.currentTarget.checked;
          }}
        />
        <span>{@render msg('recovery-codes-confirmation-message')()}</span>
      </Label>
    </div>

    <form
      action={kcContext.url.loginAction}
      class="space-y-4"
      id="kc-recovery-codes-settings-form"
      method="post"
    >
      <input
        type="hidden"
        name="generatedRecoveryAuthnCodes"
        value={recoveryAuthnCodesConfigBean.generatedRecoveryAuthnCodesAsString}
      />
      <input
        type="hidden"
        name="generatedAt"
        value={recoveryAuthnCodesConfigBean.generatedAt}
      />
      <input
        type="hidden"
        id="userLabel"
        name="userLabel"
        value={msgStr('recovery-codes-label-default')}
      />

      <div id="kc-form-options">
        <Label
          for="logout-sessions"
          class="inline-flex! w-fit cursor-pointer items-center! gap-2! text-sm font-normal whitespace-nowrap text-muted-foreground"
        >
          <Checkbox
            id="logout-sessions"
            name="logout-sessions"
            value="on"
            class="shrink-0"
          />
          <span class="leading-none whitespace-nowrap">{@render msg('logoutOtherSessions')()}</span>
        </Label>
      </div>

      {#if isAppInitiatedAction}
        <div class="flex gap-3">
          <Button
            type="submit"
            id="saveRecoveryAuthnCodesBtn"
            class="flex-1"
            disabled
          >
            {msgStr('recovery-codes-action-complete')}
          </Button>
          <Button
            type="submit"
            id="cancelRecoveryAuthnCodesBtn"
            name="cancel-aia"
            value="true"
            variant="outline"
            class="flex-1"
          >
            {@render msg('recovery-codes-action-cancel')()}
          </Button>
        </div>
      {:else}
        <Button
          type="submit"
          id="saveRecoveryAuthnCodesBtn"
          class="w-full"
          disabled
        >
          {msgStr('recovery-codes-action-complete')}
        </Button>
      {/if}
    </form>
  </div>
</Template>
