<script
  context="module"
  lang="ts"
>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import type { KcPageStoryProps } from '../KcPageStory';
  import KcPageStory from '../KcPageStory.svelte';

  const args: KcPageStoryProps = { pageId: 'info.ftl' };
  const { Story } = defineMeta({
    title: 'login/info.ftl',
    component: KcPageStory,
    args: args,
  });
</script>

<Story name="Default" />
