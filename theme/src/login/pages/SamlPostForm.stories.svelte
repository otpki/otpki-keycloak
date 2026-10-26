<script
  context="module"
  lang="ts"
>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import type { KcPageStoryProps } from '../KcPageStory';
  import KcPageStory from '../KcPageStory.svelte';

  const args: KcPageStoryProps = {
    pageId: 'saml-post-form.ftl',
    kcContext: {
      samlPost: {
        url: '#',
        SAMLResponse: 'PHNhbWxwOlJlc3BvbnNlPjwvc2FtbHA6UmVzcG9uc2U+',
        relayState: 'https://otpki.example.com/app',
      },
    },
  };
  const { Story } = defineMeta({
    title: 'login/saml-post-form.ftl',
    component: KcPageStory,
    args: args,
  });
</script>

<Story name="Default" />
