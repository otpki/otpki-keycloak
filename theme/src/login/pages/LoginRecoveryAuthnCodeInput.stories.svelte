<script
  context="module"
  lang="ts"
>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import type { KcPageStoryProps } from '../KcPageStory';
  import KcPageStory from '../KcPageStory.svelte';

  const args: KcPageStoryProps = {
    pageId: 'login-recovery-authn-code-input.ftl',
    kcContext: {
      recoveryAuthnCodesInputBean: {
        codeNumber: 3,
      },
    },
  };
  const { Story } = defineMeta({
    title: 'login/login-recovery-authn-code-input.ftl',
    component: KcPageStory,
    args: args,
  });
</script>

<Story name="Default" />

<Story
  name="WithError"
  args={{
    ...args,
    kcContext: {
      recoveryAuthnCodesInputBean: {
        codeNumber: 3,
      },
      messagesPerField: {
        existsError: (field: string) => field === 'recoveryCodeInput',
        get: () => 'Invalid recovery code',
      },
    },
  }}
/>
