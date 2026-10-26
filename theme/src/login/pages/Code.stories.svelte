<script
  context="module"
  lang="ts"
>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import type { KcPageStoryProps } from '../KcPageStory';
  import KcPageStory from '../KcPageStory.svelte';

  const args: KcPageStoryProps = {
    pageId: 'code.ftl',
    kcContext: {
      code: {
        success: true,
        code: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.example-auth-code',
      },
    },
  };
  const { Story } = defineMeta({
    title: 'login/code.ftl',
    component: KcPageStory,
    args: args,
  });
</script>

<Story name="Default" />

<Story
  name="Error"
  args={{
    ...args,
    kcContext: {
      code: {
        success: false,
        error: 'The code could not be generated. Please try again.',
      },
    },
  }}
/>
