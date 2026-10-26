<script
  context="module"
  lang="ts"
>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import type { KcPageStoryProps } from '../KcPageStory';
  import KcPageStory from '../KcPageStory.svelte';

  const args: KcPageStoryProps = {
    pageId: 'select-organization.ftl',
    kcContext: {
      user: {
        organizations: [
          { alias: 'acme', name: 'Acme Corporation' },
          { alias: 'initech', name: 'Initech' },
        ],
      },
    },
  };
  const { Story } = defineMeta({
    title: 'login/select-organization.ftl',
    component: KcPageStory,
    args: args,
  });
</script>

<Story name="Default" />

<Story
  name="ManyOrganizations"
  args={{
    ...args,
    kcContext: {
      user: {
        organizations: [
          { alias: 'acme', name: 'Acme Corporation' },
          { alias: 'initech', name: 'Initech' },
          { alias: 'globex', name: 'Globex' },
          { alias: 'hooli', name: 'Hooli' },
          { alias: 'umbrella', name: 'Umbrella Corp' },
          { alias: 'stark', name: 'Stark Industries' },
        ],
      },
    },
  }}
/>
