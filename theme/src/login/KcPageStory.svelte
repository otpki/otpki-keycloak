<script lang="ts">
  import KcPage from './KcPage.svelte';
  import { getKcContextMock, type KcPageStoryProps } from './KcPageStory';
  import { untrack } from 'svelte';

  const { pageId, kcContext }: KcPageStoryProps = $props();
  const kcContextMock = getKcContextMock({ pageId: untrack(() => pageId), overrides: untrack(() => kcContext) });
</script>

<KcPage kcContext={kcContextMock} />
