<script
  context="module"
  lang="ts"
>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import type { KcPageStoryProps } from '../KcPageStory';
  import KcPageStory from '../KcPageStory.svelte';

  const args: KcPageStoryProps = {
    pageId: 'login-idp-link-email.ftl',
    kcContext: {
      idpAlias: 'google',
      brokerContext: {
        username: 'ryan.riccio@gmail.com',
      },
      realm: {
        displayName: 'OTPKI',
      },
    },
  };
  const { Story } = defineMeta({
    title: 'login/login-idp-link-email.ftl',
    component: KcPageStory,
    args: args,
  });
</script>

<Story name="Default" />
