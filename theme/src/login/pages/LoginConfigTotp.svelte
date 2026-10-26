<script lang="ts">
  import type { PageProps } from '@keycloakify/svelte/login/pages/PageProps';
  import { Button } from '$lib/components/ui/button';
  import { Checkbox } from '$lib/components/ui/checkbox';
  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label';
  import { kcSanitize } from 'keycloakify/lib/kcSanitize';
  import { clsx } from 'keycloakify/tools/clsx';
  import type { KcContext } from '../KcContext';
  import type { I18n } from '../i18n';

  const {
    Template,
    kcContext,
    i18n,
    doUseDefaultCss,
    classes,
  }: PageProps<Extract<KcContext, { pageId: 'login-config-totp.ftl' }>, I18n> = $props();

  const url = $derived(kcContext.url);
  const isAppInitiatedAction = $derived(kcContext.isAppInitiatedAction);
  const totp = $derived(kcContext.totp);
  const mode = $derived(kcContext.mode);
  const messagesPerField = $derived(kcContext.messagesPerField);

  const { msg, msgStr, advancedMsg } = $i18n;

  let logoutOtherSessionsChecked = $state(true);
</script>

<Template
  {kcContext}
  {i18n}
  {doUseDefaultCss}
  {classes}
  displayMessage={!messagesPerField.existsError('totp', 'userLabel')}
>
  {#snippet headerNode()}
    {@render msg('loginTotpTitle')()}
  {/snippet}
  <ol
    id="kc-totp-settings"
    class="space-y-5 text-sm"
  >
    <li class="space-y-2">
      <p class="font-medium">{@render msg('loginTotpStep1')()}</p>

      <ul
        id="kc-totp-supported-apps"
        class="list-disc space-y-1 pl-5 text-muted-foreground"
      >
        {#each totp.supportedApplications as app (app)}
          <li>{@render advancedMsg(app)()}</li>
        {/each}
      </ul>
    </li>

    {#if mode === 'manual'}
      <li class="space-y-2">
        <p class="font-medium">{@render msg('loginTotpManualStep2')()}</p>
        <p>
          <span
            id="kc-totp-secret-key"
            class="inline-block rounded-md border bg-muted px-3 py-1 font-mono text-xs">{totp.totpSecretEncoded}</span
          >
        </p>
        <div>
          <Button
            href={totp.qrUrl}
            id="mode-barcode"
            variant="link"
            class="h-auto px-0 py-0 text-sm"
          >
            {@render msg('loginTotpScanBarcode')()}
          </Button>
        </div>
      </li>

      <li class="space-y-2">
        <p class="font-medium">{@render msg('loginTotpManualStep3')()}</p>
        <ul class="list-disc space-y-1 pl-5 text-muted-foreground">
          <li id="kc-totp-type">
            {@render msg('loginTotpType')()}: {@render msg(`loginTotp.${totp.policy.type}`)()}
          </li>
          <li id="kc-totp-algorithm">
            {@render msg('loginTotpAlgorithm')()}: {totp.policy.getAlgorithmKey()}
          </li>
          <li id="kc-totp-digits">
            {@render msg('loginTotpDigits')()}: {totp.policy.digits}
          </li>
          {#if totp.policy.type === 'totp'}
            <li id="kc-totp-period">
              {@render msg('loginTotpInterval')()}: {totp.policy.period}
            </li>
          {:else}
            <li id="kc-totp-counter">
              {@render msg('loginTotpCounter')()}: {totp.policy.initialCounter}
            </li>
          {/if}
        </ul>
      </li>
    {:else}
      <li class="space-y-3">
        <p class="font-medium">{@render msg('loginTotpStep2')()}</p>
        <img
          id="kc-totp-secret-qr-code"
          class="mx-auto rounded-md border bg-background p-2"
          src={`data:image/png;base64, ${totp.totpSecretQrCode}`}
          alt="Figure: Barcode"
        />
        <div>
          <Button
            href={totp.manualUrl}
            id="mode-manual"
            variant="link"
            class="h-auto px-0 py-0 text-sm"
          >
            {@render msg('loginTotpUnableToScan')()}
          </Button>
        </div>
      </li>
    {/if}

    <li class="space-y-1">
      <p class="font-medium">{@render msg('loginTotpStep3')()}</p>
      <p class="text-muted-foreground">{@render msg('loginTotpStep3DeviceName')()}</p>
    </li>
  </ol>

  <form
    action={url.loginAction}
    class="space-y-4"
    id="kc-totp-settings-form"
    method="post"
  >
    <div class="space-y-2">
      <div class="inline-flex items-center gap-1">
        <Label for="totp">
          {@render msg('authenticatorCode')()}
        </Label>
        <span class="required">*</span>
      </div>

      <div>
        <Input
          type="text"
          id="totp"
          name="totp"
          autocomplete="off"
          class={clsx(messagesPerField.existsError('totp') && 'border-destructive')}
          aria-invalid={messagesPerField.existsError('totp')}
        />

        {#if messagesPerField.existsError('totp')}
          <span
            id="input-error-otp-code"
            class="text-sm text-destructive"
            aria-live="polite">{@html kcSanitize(messagesPerField.get('totp'))}</span
          >
        {/if}
      </div>
      <input
        type="hidden"
        id="totpSecret"
        name="totpSecret"
        value={totp.totpSecret}
      />
      {#if mode}<input
          type="hidden"
          id="mode"
          value={mode}
        />{/if}
    </div>

    <div class="space-y-2">
      <div class="inline-flex items-center gap-1">
        <Label for="userLabel">
          {@render msg('loginTotpDeviceName')()}
        </Label>
        {#if totp.otpCredentials.length >= 1}<span class="required">*</span>{/if}
      </div>

      <div>
        <Input
          type="text"
          id="userLabel"
          name="userLabel"
          autocomplete="off"
          class={clsx(messagesPerField.existsError('userLabel') && 'border-destructive')}
          aria-invalid={messagesPerField.existsError('userLabel')}
        />
        {#if messagesPerField.existsError('userLabel')}
          <span
            id="input-error-otp-label"
            class="text-sm text-destructive"
            aria-live="polite">{@html kcSanitize(messagesPerField.get('userLabel'))}</span
          >
        {/if}
      </div>
    </div>

    <div class="space-y-2">
      <Label
        for="logout-sessions"
        class="inline-flex! w-fit cursor-pointer items-center! gap-2! text-sm font-normal whitespace-nowrap text-muted-foreground"
      >
        <input
          type="hidden"
          name="logout-sessions"
          value="on"
          disabled={!logoutOtherSessionsChecked}
        />
        <Checkbox
          id="logout-sessions"
          class="shrink-0"
          bind:checked={logoutOtherSessionsChecked}
        />
        <span class="leading-none whitespace-nowrap">{@render msg('logoutOtherSessions')()}</span>
      </Label>
    </div>

    {#if isAppInitiatedAction}
      <div class="grid gap-2 sm:grid-cols-2">
        <Button
          type="submit"
          id="saveTOTPBtn"
          class="w-full"
        >
          {msgStr('doSubmit')}
        </Button>
        <Button
          type="submit"
          variant="outline"
          id="cancelTOTPBtn"
          name="cancel-aia"
          value="true"
          class="w-full"
        >
          {@render msg('doCancel')()}
        </Button>
      </div>
    {:else}
      <Button
        type="submit"
        id="saveTOTPBtn"
        class="w-full"
      >
        {msgStr('doSubmit')}
      </Button>
    {/if}
  </form>
</Template>
