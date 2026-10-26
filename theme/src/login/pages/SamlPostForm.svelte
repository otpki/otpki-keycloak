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
  }: PageProps<Extract<KcContext, { pageId: 'saml-post-form.ftl' }>, I18n> = $props();

  const { msgStr, msg } = $derived($i18n);
  const { samlPost } = $derived(kcContext);

  let htmlFormElement: HTMLFormElement | null = $state(null);

  $effect(() => {
    if (htmlFormElement === null) {
      return;
    }

    // Storybook
    if (samlPost.url === '#') {
      alert('In a real Keycloak the user would be redirected immediately');
      return;
    }

    htmlFormElement.requestSubmit();
  });
</script>

<Template
  {kcContext}
  {i18n}
  {doUseDefaultCss}
  {classes}
>
  {#snippet headerNode()}
    {@render msg('saml.post-form.title')()}
  {/snippet}
  <div class="space-y-4">
    <p class="text-sm text-muted-foreground">{@render msg('saml.post-form.message')()}</p>
    <form
      name="saml-post-binding"
      method="post"
      action={samlPost.url}
      bind:this={htmlFormElement}
    >
      {#if samlPost.SAMLRequest}
        <input
          type="hidden"
          name="SAMLRequest"
          value={samlPost.SAMLRequest}
        />
      {/if}
      {#if samlPost.SAMLResponse}
        <input
          type="hidden"
          name="SAMLResponse"
          value={samlPost.SAMLResponse}
        />
      {/if}
      {#if samlPost.relayState}
        <input
          type="hidden"
          name="RelayState"
          value={samlPost.relayState}
        />
      {/if}
      <noscript>
        <div class="space-y-4">
          <p class="text-sm text-muted-foreground">{@render msg('saml.post-form.js-disabled')()}</p>
          <Button
            type="submit"
            class="w-full"
          >
            {msgStr('doContinue')}
          </Button>
        </div>
      </noscript>
    </form>
  </div>
</Template>
