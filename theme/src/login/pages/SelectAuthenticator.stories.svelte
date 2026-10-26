<script
  context="module"
  lang="ts"
>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import type { KcPageStoryProps } from '../KcPageStory';
  import KcPageStory from '../KcPageStory.svelte';

  const args: KcPageStoryProps = {
    pageId: 'select-authenticator.ftl',
    kcContext: {
      auth: {
        authenticationSelections: [
          {
            authExecId: 'exec-1',
            displayName: 'Authenticator Application',
            helpText: 'Enter a verification code from your authenticator app.',
            iconCssClass: 'pficon-mobile',
          },
          {
            authExecId: 'exec-2',
            displayName: 'Security Key',
            helpText: 'Use a hardware security key or passkey.',
            iconCssClass: 'pficon-key',
          },
          {
            authExecId: 'exec-3',
            displayName: 'Recovery Codes',
            helpText: 'Use one of your saved recovery codes.',
            iconCssClass: 'pficon-locked',
          },
        ],
      } as never,
    },
  };
  const { Story } = defineMeta({
    title: 'login/select-authenticator.ftl',
    component: KcPageStory,
    args: args,
  });
</script>

<Story name="Default" />
