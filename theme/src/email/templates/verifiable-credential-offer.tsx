import { render, Text } from 'jsx-email';
import type { GetSubject, GetTemplate, GetTemplateProps } from 'keycloakify-emails';
import { createVariablesHelper } from 'keycloakify-emails/variables';
import { CtaButton, Layout, styles } from '../layout';

const { exp } = createVariablesHelper('verifiable-credential-offer.ftl');

export const Template = ({ locale }: GetTemplateProps) => (
  <Layout
    locale={locale}
    preview="Claim your verifiable credential"
  >
    <Text style={styles.p}>
      Your administrator has just informed you that in your {exp('realmName')} account you can claim verifiable
      credential {exp('credentialScopeDisplayName')} to your digital wallet. Click the button below to start this
      process.
    </Text>
    <CtaButton href={exp('link')}>Claim credential</CtaButton>
    <Text style={styles.p}>This link will expire within {exp('linkExpirationFormatter(linkExpiration)')}.</Text>
    <Text style={styles.muted}>
      If the link has already expired, you might still be able to claim your {exp('credentialScopeDisplayName')} by
      other means (for example by using your {exp('realmName')} account console).
    </Text>
  </Layout>
);

export const getTemplate: GetTemplate = async (props) =>
  render(<Template {...props} />, { plainText: props.plainText });

export const getSubject: GetSubject = async () => 'Verifiable Credential Offer';

export const templateName = 'Verifiable Credential Offer';

export const previewProps = { locale: 'en', themeName: 'otpki-keycloak-theme' };
