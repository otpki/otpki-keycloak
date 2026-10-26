<script lang="ts">
  import type { PageProps } from '@keycloakify/svelte/login/pages/PageProps';
  import { Button } from '$lib/components/ui/button';
  import LinkIcon from '@lucide/svelte/icons/link';
  import UserRoundPenIcon from '@lucide/svelte/icons/user-round-pen';
  import type { KcContext } from '../KcContext';
  import type { I18n } from '../i18n';

  const {
    Template,
    kcContext,
    i18n,
    doUseDefaultCss,
    classes,
  }: PageProps<Extract<KcContext, { pageId: 'login-idp-link-confirm.ftl' }>, I18n> = $props();

  const { url, idpAlias } = $derived(kcContext);
  const { msg } = $derived($i18n);
</script>

<Template
  {kcContext}
  {i18n}
  {doUseDefaultCss}
  {classes}
>
  {#snippet headerNode()}
    {@render msg('confirmLinkIdpTitle')()}
  {/snippet}
  <form
    id="kc-register-form"
    class="space-y-3"
    action={url.loginAction}
    method="post"
  >
    <Button
      type="submit"
      name="submitAction"
      id="updateProfile"
      value="updateProfile"
      variant="outline"
      class="w-full"
    >
      <UserRoundPenIcon class="size-4" />
      {@render msg('confirmLinkIdpReviewProfile')()}
    </Button>
    <Button
      type="submit"
      name="submitAction"
      id="linkAccount"
      value="linkAccount"
      class="w-full"
    >
      <LinkIcon class="size-4" />
      {@render msg('confirmLinkIdpContinue', idpAlias)()}
    </Button>
  </form>
</Template>
