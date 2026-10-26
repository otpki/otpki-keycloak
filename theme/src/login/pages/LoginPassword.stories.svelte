<script
  context="module"
  lang="ts"
>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import type { KcPageStoryProps } from '../KcPageStory';
  import KcPageStory from '../KcPageStory.svelte';

  const args: KcPageStoryProps = { pageId: 'login-password.ftl' };
  const { Story } = defineMeta({
    title: 'login/login-password.ftl',
    component: KcPageStory,
    args: args,
  });
</script>

<Story name="Default" />

<Story
  name="WithPasswordError"
  args={{
    ...args,
    kcContext: {
      messagesPerField: {
        existsError: (field: string) => field === 'password',
        get: () => 'Invalid password',
      },
    },
  }}
/>
