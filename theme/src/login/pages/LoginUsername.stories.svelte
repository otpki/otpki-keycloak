<script
  context="module"
  lang="ts"
>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import type { KcPageStoryProps } from '../KcPageStory';
  import KcPageStory from '../KcPageStory.svelte';

  const args: KcPageStoryProps = { pageId: 'login-username.ftl' };
  const { Story } = defineMeta({
    title: 'login/login-username.ftl',
    component: KcPageStory,
    args: args,
  });
</script>

<Story name="Default" />

<Story
  name="WithUsernameError"
  args={{
    ...args,
    kcContext: {
      messagesPerField: {
        existsError: (field: string) => field === 'username',
        getFirstError: () => 'User does not exist',
        get: () => 'User does not exist',
      },
    },
  }}
/>
