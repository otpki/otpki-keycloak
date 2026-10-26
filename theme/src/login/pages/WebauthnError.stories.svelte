<script
  context="module"
  lang="ts"
>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import type { KcPageStoryProps } from '../KcPageStory';
  import KcPageStory from '../KcPageStory.svelte';

  const args: KcPageStoryProps = {
    pageId: 'webauthn-error.ftl',
    kcContext: {
      execution: 'abc123-exec',
      isAppInitiatedAction: true,
    },
  };
  const { Story } = defineMeta({
    title: 'login/webauthn-error.ftl',
    component: KcPageStory,
    args: args,
  });
</script>

<Story name="Default" />

<Story
  name="NotAppInitiated"
  args={{
    ...args,
    kcContext: {
      execution: 'abc123-exec',
      isAppInitiatedAction: false,
    },
  }}
/>
