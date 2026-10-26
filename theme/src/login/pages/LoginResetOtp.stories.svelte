<script
  context="module"
  lang="ts"
>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import type { KcPageStoryProps } from '../KcPageStory';
  import KcPageStory from '../KcPageStory.svelte';

  const args: KcPageStoryProps = {
    pageId: 'login-reset-otp.ftl',
    kcContext: {
      configuredOtpCredentials: {
        userOtpCredentials: [
          { id: 'cred-1', userLabel: 'iPhone 15 Pro' },
          { id: 'cred-2', userLabel: '1Password' },
        ],
        selectedCredentialId: 'cred-1',
      },
    },
  };
  const { Story } = defineMeta({
    title: 'login/login-reset-otp.ftl',
    component: KcPageStory,
    args: args,
  });
</script>

<Story name="Default" />
