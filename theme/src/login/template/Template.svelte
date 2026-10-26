<script lang="ts">
  import { useInitialize } from '@keycloakify/svelte/login/Template.useInitialize';
  import type { TemplateProps } from '@keycloakify/svelte/login/TemplateProps';
  import { useSetClassName } from '@keycloakify/svelte/tools/useSetClassName';
  import { kcSanitize } from 'keycloakify/lib/kcSanitize';
  import { clsx } from 'keycloakify/tools/clsx';
  import { onMount, untrack } from 'svelte';
  import faviconSrc from '../assets/otpki.png';
  import { Button } from '$lib/components/ui/button';
  import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '$lib/components/ui/card';
  import type { I18n } from '../i18n';
  import type { KcContext } from '../KcContext';

  const {
    displayInfo = false,
    displayMessage = true,
    displayRequiredFields = false,
    headerNode,
    socialProvidersNode = null,
    infoNode = null,
    documentTitle,
    bodyClassName,
    kcContext,
    i18n,
    children,
  }: TemplateProps<KcContext, I18n> = $props();

  const { msgStr, currentLanguage, enabledLanguages } = $i18n;
  const { realm, auth, url, message, isAppInitiatedAction } = untrack(() => kcContext);

  onMount(() => {
    document.title = documentTitle ?? msgStr('loginTitle', realm.displayName);
  });

  useSetClassName({
    qualifiedName: 'html',
    className: 'h-full',
  });

  useSetClassName({
    qualifiedName: 'body',
    className: untrack(() => bodyClassName) ?? 'min-h-full bg-background text-foreground antialiased',
  });

  const { isReadyToRender } = useInitialize({ kcContext: untrack(() => kcContext), doUseDefaultCss: false });

  const getAlertClassName = (type: 'error' | 'warning' | 'success' | 'info') =>
    clsx('rounded-md border px-3 py-2 text-sm', {
      'border-destructive/30 bg-destructive/10 text-destructive': type === 'error',
      'border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300': type === 'warning',
      'border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300': type === 'success',
      'border-border bg-muted text-muted-foreground': type === 'info',
    });
</script>

{#if $isReadyToRender}
  <div class="flex min-h-screen items-center justify-center bg-background p-4 text-foreground">
    <Card class="w-full max-w-md">
      <CardHeader class="text-center">
        <div class="mx-auto mb-4 flex h-20 w-20 items-center justify-center">
          <img
            src={faviconSrc}
            alt="OTPKI"
            class="h-16 w-16"
          />
        </div>

        {#if realm.displayName}
          <p class="mb-1 text-xs tracking-[0.12em] text-muted-foreground uppercase">{realm.displayName}</p>
        {/if}

        {#if !(auth !== undefined && auth.showUsername && !auth.showResetCredentials)}
          <CardTitle class="text-2xl">{@render headerNode?.()}</CardTitle>
          <CardDescription>Sign in to access the PKI management console</CardDescription>
        {:else}
          <CardTitle class="text-xl">{auth.attemptedUsername}</CardTitle>
          <CardDescription>
            <Button
              href={url.loginRestartFlowUrl}
              variant="link"
              class="h-auto px-0"
            >
              {msgStr('restartLoginTooltip')}
            </Button>
          </CardDescription>
        {/if}

        {#if displayRequiredFields}
          <p class="text-xs text-muted-foreground">
            <span class="text-destructive">*</span>
            {msgStr('requiredFields')}
          </p>
        {/if}
      </CardHeader>

      <CardContent class="flex flex-col gap-4">
        {#if displayMessage && message !== undefined && (message.type !== 'warning' || !isAppInitiatedAction)}
          <div class={getAlertClassName(message.type)}>
            {@html kcSanitize(message.summary)}
          </div>
        {/if}

        {@render children?.()}

        {#if auth !== undefined && auth.showTryAnotherWayLink}
          <form
            id="kc-select-try-another-way-form"
            action={url.loginAction}
            method="post"
          >
            <input
              type="hidden"
              name="tryAnotherWay"
              value="on"
            />
            <Button
              type="button"
              variant="link"
              class="h-auto px-0"
              onclick={() => {
                document.forms['kc-select-try-another-way-form' as never].requestSubmit();
              }}
            >
              {msgStr('doTryAnotherWay')}
            </Button>
          </form>
        {/if}

        {#if socialProvidersNode}
          <div class="flex flex-col gap-2">
            {@render socialProvidersNode()}
          </div>
        {/if}
      </CardContent>

      {#if displayInfo}
        <CardFooter class="pt-2 text-center text-sm text-muted-foreground">
          {@render infoNode?.()}
        </CardFooter>
      {/if}
    </Card>

    {#if enabledLanguages.length > 1}
      <div class="fixed right-4 bottom-4 z-50 sm:right-6 sm:bottom-6">
        <details class="group relative">
          <summary
            class="cursor-pointer list-none rounded-full border bg-background px-3 py-2 text-xs text-foreground shadow-lg transition-colors hover:bg-muted [&::-webkit-details-marker]:hidden"
          >
            <span class="inline-flex items-center gap-2">
              <span aria-hidden="true">🌐</span>
              <span>{currentLanguage.label}</span>
            </span>
          </summary>

          <div
            class="absolute right-0 bottom-12 flex max-h-72 w-56 flex-col gap-1 overflow-y-auto rounded-xl border bg-popover p-2 shadow-2xl"
          >
            {#each enabledLanguages as enabledLanguage (enabledLanguage.languageTag)}
              <a
                class={clsx(
                  'rounded-md px-2 py-1.5 text-xs text-popover-foreground transition-colors hover:bg-muted',
                  enabledLanguage.languageTag === currentLanguage.languageTag && 'bg-muted font-medium',
                )}
                href={enabledLanguage.href}
              >
                {enabledLanguage.label}
              </a>
            {/each}
          </div>
        </details>
      </div>
    {/if}
  </div>
{/if}
