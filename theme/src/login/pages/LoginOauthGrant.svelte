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
  }: PageProps<Extract<KcContext, { pageId: 'login-oauth-grant.ftl' }>, I18n> = $props();

  const url = $derived(kcContext.url);
  const oauth = $derived(kcContext.oauth);
  const client = $derived(kcContext.client);

  const { msg, msgStr, advancedMsg, advancedMsgStr } = $i18n;
</script>

<Template
  {kcContext}
  {i18n}
  {doUseDefaultCss}
  {classes}
  bodyClassName="oauth"
>
  {#snippet headerNode()}
    <div class="space-y-3 text-center">
      {#if client.attributes.logoUri}
        <img
          src={client.attributes.logoUri}
          alt="logo"
          class="mx-auto max-h-14 w-auto"
        />
      {/if}
      <p class="text-base font-medium">
        {@render (client.name
          ? msg('oauthGrantTitle', advancedMsgStr(client.name))
          : msg('oauthGrantTitle', client.clientId))()}
      </p>
    </div>
  {/snippet}
  <div
    id="kc-oauth"
    class="space-y-5"
  >
    <section class="space-y-3 rounded-lg border bg-muted/30 p-4">
      <h3 class="text-sm font-semibold text-foreground">{@render msg('oauthGrantRequest')()}</h3>
      <ul class="space-y-2 text-sm text-muted-foreground">
        {#each oauth.clientScopesRequested as clientScope, i (i)}
          <li class="flex items-start gap-2">
            <span class="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground/70"></span>
            <span>
              {@render advancedMsg(clientScope.consentScreenText)()}
              {#if clientScope.dynamicScopeParameter}
                : <b class="text-foreground">{clientScope.dynamicScopeParameter}</b>
              {/if}
            </span>
          </li>
        {/each}
      </ul>
    </section>

    {#if client.attributes.policyUri || client.attributes.tosUri}
      <section class="space-y-2 rounded-lg border bg-background/60 p-4">
        <h3 class="text-sm font-medium text-foreground">
          {@render (client.name
            ? msg('oauthGrantInformation', advancedMsgStr(client.name))
            : msg('oauthGrantInformation', client.clientId))()}
        </h3>
        <div class="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          {#if client.attributes.tosUri}
            <span>{@render msg('oauthGrantReview')()}</span>
            <a
              class="underline underline-offset-2"
              href={client.attributes.tosUri}
              target="_blank"
            >
              {@render msg('oauthGrantTos')()}
            </a>
          {/if}
          {#if client.attributes.policyUri}
            <span>{@render msg('oauthGrantReview')()}</span>
            <a
              class="underline underline-offset-2"
              href={client.attributes.policyUri}
              target="_blank"
            >
              {@render msg('oauthGrantPolicy')()}
            </a>
          {/if}
        </div>
      </section>
    {/if}

    <form
      class="space-y-4"
      action={url.oauthAction}
      method="POST"
    >
      <input
        type="hidden"
        name="code"
        value={oauth.code}
      />
      <div id="kc-form-buttons" class="grid gap-2 sm:grid-cols-2">
        <Button
          name="accept"
          id="kc-login"
          type="submit"
          class="w-full"
        >
          {msgStr('doYes')}
        </Button>
        <Button
          variant="outline"
          name="cancel"
          id="kc-cancel"
          type="submit"
          class="w-full"
        >
          {msgStr('doNo')}
        </Button>
      </div>
    </form>
  </div>
</Template>
