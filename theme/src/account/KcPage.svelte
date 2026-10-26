<script lang="ts">
  // Bridge: mounts the React-based Account Console
  // (@keycloakify/keycloak-account-ui) inside the Svelte entrypoint.
  import { onMount } from 'svelte';
  import type { KcContext } from './KcContext';

  const { kcContext }: { kcContext: KcContext } = $props();

  let el: HTMLDivElement;

  onMount(() => {
    let root: import('react-dom/client').Root | undefined;
    void (async () => {
      const [{ createElement, StrictMode }, { createRoot }, { default: KcPage }] = await Promise.all([
        import('react'),
        import('react-dom/client'),
        import('./KcPage'),
      ]);
      root = createRoot(el);
      root.render(createElement(StrictMode, null, createElement(KcPage, { kcContext })));
    })();
    return () => root?.unmount();
  });
</script>

<div bind:this={el}></div>
