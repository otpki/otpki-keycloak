import { render, Text } from 'jsx-email';
import type { GetSubject, GetTemplate, GetTemplateProps } from 'keycloakify-emails';
import { createVariablesHelper } from 'keycloakify-emails/variables';
import { CtaButton, Layout, styles } from '../layout';

const { exp } = createVariablesHelper('identity-provider-link.ftl');

export const Template = ({ locale }: GetTemplateProps) => (
  <Layout
    locale={locale}
    preview="Link your account"
  >
    <Text style={styles.p}>
      Someone wants to link your {exp('realmName')} account with {exp('identityProviderDisplayName')} account of user{' '}
      {exp('identityProviderContext.username')}. If this was you, click the button below to link the accounts.
    </Text>
    <CtaButton href={exp('link')}>Confirm account linking</CtaButton>
    <Text style={styles.p}>This link will expire within {exp('linkExpirationFormatter(linkExpiration)')}.</Text>
    <Text style={styles.muted}>
      If you didn&apos;t initiate this process or don&apos;t want to link the accounts, just ignore this message. If you
      link the accounts, you will be able to sign in to {exp('realmName')} through {exp('identityProviderDisplayName')}.
    </Text>
  </Layout>
);

export const getTemplate: GetTemplate = async (props) =>
  render(<Template {...props} />, { plainText: props.plainText });

export const getSubject: GetSubject = async () => 'Link {0}';

export const templateName = 'Identity Provider Link';

export const previewProps = { locale: 'en', themeName: 'otpki-keycloak-theme' };
