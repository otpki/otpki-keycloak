<script
  context="module"
  lang="ts"
>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import type { KcPageStoryProps } from '../KcPageStory';
  import KcPageStory from '../KcPageStory.svelte';

  const args: KcPageStoryProps = {
    pageId: 'login-x509-info.ftl',
    kcContext: {
      x509: {
        formData: {
          subjectDN: 'CN=ryan.riccio, OU=Engineering, O=OTPKI, C=US',
          isUserEnabled: true,
          username: 'ryan.riccio',
        },
      },
    },
  };
  const { Story } = defineMeta({
    title: 'login/login-x509-info.ftl',
    component: KcPageStory,
    args: args,
  });
</script>

<Story name="Default" />

<Story
  name="NoCertificate"
  args={{
    ...args,
    kcContext: {
      x509: {
        formData: {
          subjectDN: '',
          isUserEnabled: false,
          username: '',
        },
      },
    },
  }}
/>
