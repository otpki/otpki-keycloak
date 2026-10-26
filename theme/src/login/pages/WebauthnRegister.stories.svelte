<script
  context="module"
  lang="ts"
>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import type { KcPageStoryProps } from '../KcPageStory';
  import KcPageStory from '../KcPageStory.svelte';

  const args: KcPageStoryProps = { pageId: 'webauthn-register.ftl' };
  const { Story } = defineMeta({
    title: 'login/webauthn-register.ftl',
    component: KcPageStory,
    args: args,
  });
</script>

<Story name="Default" />
