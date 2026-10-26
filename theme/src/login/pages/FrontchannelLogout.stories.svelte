<script
  context="module"
  lang="ts"
>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import type { KcPageStoryProps } from '../KcPageStory';
  import KcPageStory from '../KcPageStory.svelte';

  const args: KcPageStoryProps = {
    pageId: 'frontchannel-logout.ftl',
    kcContext: {
      logout: {
        clients: [
          { name: 'OTPKI Console', frontChannelLogoutUrl: 'about:blank' },
          { name: 'OTPKI API', frontChannelLogoutUrl: 'about:blank' },
        ],
        logoutRedirectUri: 'https://otpki.example.com',
      },
    },
  };
  const { Story } = defineMeta({
    title: 'login/frontchannel-logout.ftl',
    component: KcPageStory,
    args: args,
  });
</script>

<Story name="Default" />
