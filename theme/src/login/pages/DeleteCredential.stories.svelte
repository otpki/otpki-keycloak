<script
  context="module"
  lang="ts"
>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import type { KcPageStoryProps } from '../KcPageStory';
  import KcPageStory from '../KcPageStory.svelte';

  const args: KcPageStoryProps = {
    pageId: 'delete-credential.ftl',
    kcContext: {
      credentialLabel: 'YubiKey 5C',
    },
  };
  const { Story } = defineMeta({
    title: 'login/delete-credential.ftl',
    component: KcPageStory,
    args: args,
  });
</script>

<Story name="Default" />
