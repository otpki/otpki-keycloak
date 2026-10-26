import { mount, type Component } from 'svelte';
import Spinner from './Spinner.svelte';

// The following block can be uncommented to test a specific page with `yarn dev`
// Don't forget to comment back or your bundle size will increase
/*
import { getKcContextMock } from './login/KcPageStory';

if (import.meta.env.DEV) {
  window.kcContext = getKcContextMock({
    pageId: 'login.ftl',
    overrides: {},
  });
}
*/

let app;
if (window.kcContext) {
  const target = document.getElementById('kc-root')!;
  const { themeType } = window.kcContext;

  if (themeType === 'admin' || themeType === 'account') {
    // Mount the React console bridge directly. kc.gen.svelte eagerly imports
    // every theme type's KcPage — including login/KcPage.svelte which pulls in
    // the Tailwind app.css (preflight + `body { color: var(--foreground) }`)
    // and corrupts console styling. Bypassing it keeps the CSS isolated.
    const { default: ConsoleKcPage } = (await (themeType === 'admin'
      ? import('./admin/KcPage.svelte')
      : import('./account/KcPage.svelte'))) as { default: Component };
    app = mount(ConsoleKcPage, {
      target,
      props: { kcContext: window.kcContext },
    });
  } else {
    const { default: KcPage } = await import('./kc.gen.svelte');
    app = mount(KcPage, {
      target,
      props: { kcContext: window.kcContext, Fallback: Spinner },
    });
  }
}
export default app;
