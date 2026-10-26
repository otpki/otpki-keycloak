<script lang="ts">
  import type { PageProps } from '@keycloakify/svelte/login/pages/PageProps';
  import Building2Icon from '@lucide/svelte/icons/building-2';
  import { clsx } from 'keycloakify/tools/clsx';
  import type { KcContext } from '../KcContext';
  import type { I18n } from '../i18n';

  const {
    Template,
    kcContext,
    i18n,
    doUseDefaultCss,
    classes,
  }: PageProps<Extract<KcContext, { pageId: 'select-organization.ftl' }>, I18n> = $props();

  const { url, user } = $derived(kcContext);
  const { msg } = $derived($i18n);

  let isSubmitting = $state(false);
  let formElement: HTMLFormElement | undefined = $state();
  let organizationInputElement: HTMLInputElement | undefined = $state();

  const onOrganizationClick = (organizationAlias: string) => (event: MouseEvent) => {
    event.preventDefault();

    if (!organizationInputElement || !formElement) {
      return;
    }

    organizationInputElement.value = organizationAlias;
    isSubmitting = true;

    if (typeof formElement.requestSubmit === 'function') {
      formElement.requestSubmit();
      return;
    }

    formElement.submit();
  };

  const organizations = $derived(user.organizations ?? []);
  const shouldDisplayGrid = $derived(organizations.length > 3);
</script>

<Template
  {kcContext}
  {i18n}
  {doUseDefaultCss}
  {classes}
>
  {#snippet headerNode()}
    <!-- Intentionally empty: this page has no header, mirroring React's headerNode={null}. -->
  {/snippet}
  <form
    bind:this={formElement}
    action={url.loginAction}
    method="post"
  >
    <div
      id="kc-user-organizations"
      class="space-y-3"
    >
      <h2 class="text-sm font-medium text-muted-foreground">{@render msg('organization.select')()}</h2>
      <div class={clsx('grid gap-2', shouldDisplayGrid ? 'grid-cols-2' : 'grid-cols-1')}>
        {#each organizations as { alias, name } (alias)}
          <button
            id={`organization-${alias}`}
            class="flex w-full items-center justify-center gap-2 rounded-lg border border-input bg-card px-4 py-3 text-sm font-medium text-card-foreground shadow-xs transition-colors hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50"
            type="button"
            onclick={onOrganizationClick(alias)}
            disabled={isSubmitting}
          >
            <Building2Icon class="size-4 shrink-0 text-muted-foreground" />
            <span class="truncate">{name ?? alias}</span>
          </button>
        {/each}
      </div>
    </div>
    <input
      bind:this={organizationInputElement}
      type="hidden"
      name="kc.org"
    />
  </form>
</Template>
