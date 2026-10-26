<script
  context="module"
  lang="ts"
>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import type { KcPageStoryProps } from '../KcPageStory';
  import KcPageStory from '../KcPageStory.svelte';

  const args: KcPageStoryProps = {
    pageId: 'webauthn-authenticate.ftl',
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
          {
            credentialId: 'cred-2',
            label: 'YubiKey 5C',
            createdAt: 'Mar 3, 2025',
            transports: {
              iconClass: 'pficon-key',
              displayNameProperties: ['usb', 'nfc'],
            },
          },
        ],
      },
    },
  };
  const { Story } = defineMeta({
    title: 'login/webauthn-authenticate.ftl',
    component: KcPageStory,
    args: args,
  });
</script>

<Story name="Default" />

<Story
  name="NoAuthenticators"
  args={{
    ...args,
    kcContext: {
      shouldDisplayAuthenticators: false,
      authenticators: {
        authenticators: [],
      },
    },
  }}
/>
