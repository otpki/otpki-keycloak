import { render, Text } from 'jsx-email';
import type { GetSubject, GetTemplate, GetTemplateProps } from 'keycloakify-emails';
import { createVariablesHelper } from 'keycloakify-emails/variables';
import { CtaButton, Layout, styles } from '../layout';

const { exp } = createVariablesHelper('email-update-confirmation.ftl');

export const Template = ({ locale }: GetTemplateProps) => (
  <Layout
    locale={locale}
    preview="Verify your new email address"
  >
    <Text style={styles.p}>
      To update your {exp('realmName')} account with email address {exp('newEmail')}, click the button below.
    </Text>
    <CtaButton href={exp('link')}>Confirm email update</CtaButton>
    <Text style={styles.p}>This link will expire within {exp('linkExpirationFormatter(linkExpiration)')}.</Text>
    <Text style={styles.muted}>
      If you don&apos;t want to proceed with this modification, just ignore this message.
    </Text>
  </Layout>
);

export const getTemplate: GetTemplate = async (props) =>
  render(<Template {...props} />, { plainText: props.plainText });

export const getSubject: GetSubject = async () => 'Verify new email';

export const templateName = 'Email Update Confirmation';

export const previewProps = { locale: 'en', themeName: 'otpki-keycloak-theme' };
