<script
  context="module"
  lang="ts"
>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import type { KcPageStoryProps } from '../KcPageStory';
  import KcPageStory from '../KcPageStory.svelte';

  const args: KcPageStoryProps = {
    pageId: 'login-passkeys-conditional-authenticate.ftl',
    kcContext: {
      shouldDisplayAuthenticators: true,
      authenticators: {
        authenticators: [
          {
            credentialId: 'cred-1',
            label: "Ryan's MacBook Pro",
            createdAt: 'Jan 12, 2025',
            transports: {
              iconClass: 'pficon-key',
              displayNameProperties: ['internal'],
            },
          },
        ],
      },
    },
  };
  const { Story } = defineMeta({
    title: 'login/login-passkeys-conditional-authenticate.ftl',
    component: KcPageStory,
    args: args,
  });
</script>

<Story name="Default" />
