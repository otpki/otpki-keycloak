<script
  context="module"
  lang="ts"
>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import type { KcPageStoryProps } from '../KcPageStory';
  import KcPageStory from '../KcPageStory.svelte';

  const codes = [
    'ab12cd34ef56',
    'gh78ij90kl12',
    'mn34op56qr78',
    'st90uv12wx34',
    'yz56ab78cd90',
    'ef12gh34ij56',
    'kl78mn90op12',
    'qr34st56uv78',
    'wx90yz12ab34',
    'cd56ef78gh90',
  ];

  const args: KcPageStoryProps = {
    pageId: 'login-recovery-authn-code-config.ftl',
    kcContext: {
      isAppInitiatedAction: true,
      recoveryAuthnCodesConfigBean: {
        generatedRecoveryAuthnCodesList: codes,
        generatedRecoveryAuthnCodesAsString: codes.join(' '),
        generatedAt: Date.now(),
      },
    },
  };
  const { Story } = defineMeta({
    title: 'login/login-recovery-authn-code-config.ftl',
    component: KcPageStory,
    args: args,
  });
</script>

<Story name="Default" />

<Story
  name="NotAppInitiated"
  args={{
    ...args,
    kcContext: {
      isAppInitiatedAction: false,
      recoveryAuthnCodesConfigBean: {
        generatedRecoveryAuthnCodesList: codes,
        generatedRecoveryAuthnCodesAsString: codes.join(' '),
        generatedAt: Date.now(),
      },
    },
  }}
/>
