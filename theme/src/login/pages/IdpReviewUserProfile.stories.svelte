<script
  context="module"
  lang="ts"
>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import type { KcPageStoryProps } from '../KcPageStory';
  import KcPageStory from '../KcPageStory.svelte';

  const args: KcPageStoryProps = { pageId: 'idp-review-user-profile.ftl' };
  const { Story } = defineMeta({
    title: 'login/idp-review-user-profile.ftl',
    component: KcPageStory,
    args: args,
  });
</script>

<Story name="Default" />
