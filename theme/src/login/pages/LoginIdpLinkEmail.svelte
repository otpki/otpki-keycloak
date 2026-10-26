<script lang="ts">
  import type { PageProps } from '@keycloakify/svelte/login/pages/PageProps';
  import MailIcon from '@lucide/svelte/icons/mail';
  import type { KcContext } from '../KcContext';
  import type { I18n } from '../i18n';

  const {
    Template,
    kcContext,
    i18n,
    doUseDefaultCss,
    classes,
  }: PageProps<Extract<KcContext, { pageId: 'login-idp-link-email.ftl' }>, I18n> = $props();

  const { url, realm, brokerContext, idpAlias } = $derived(kcContext);
  const { msg } = $derived($i18n);
</script>

<Template
  {kcContext}
  {i18n}
  {doUseDefaultCss}
  {classes}
  displayMessage={false}
>
  {#snippet headerNode()}
    {@render msg('emailLinkIdpTitle', idpAlias)()}
  {/snippet}

  <div class="space-y-4 text-sm">
    <div class="flex items-start gap-3 rounded-md border bg-muted/30 p-4">
      <MailIcon class="mt-0.5 size-4 shrink-0 text-muted-foreground" />
      <p id="instruction1">
        {@render msg('emailLinkIdp1', idpAlias, brokerContext.username, realm.displayName)()}
      </p>
    </div>
    <p
      id="instruction2"
      class="text-muted-foreground"
    >
      {@render msg('emailLinkIdp2')()}
      <a
        href={url.loginAction}
        class="text-primary underline-offset-4 hover:underline"
      >
        {@render msg('doClickHere')()}
      </a>
      {@render msg('emailLinkIdp3')()}
    </p>
    <p
      id="instruction3"
      class="text-muted-foreground"
    >
      {@render msg('emailLinkIdp4')()}
      <a
        href={url.loginAction}
        class="text-primary underline-offset-4 hover:underline"
      >
        {@render msg('doClickHere')()}
      </a>
      {@render msg('emailLinkIdp5')()}
    </p>
  </div>
</Template>
