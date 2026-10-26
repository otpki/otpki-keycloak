<script
  context="module"
  lang="ts"
>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import type { KcPageStoryProps } from '../KcPageStory';
  import KcPageStory from '../KcPageStory.svelte';

  const args: KcPageStoryProps = {
    pageId: 'login-idp-link-confirm.ftl',
    kcContext: {
      idpAlias: 'google',
    },
  };
  const { Story } = defineMeta({
    title: 'login/login-idp-link-confirm.ftl',
    component: KcPageStory,
    args: args,
  });
</script>

<Story name="Default" />
