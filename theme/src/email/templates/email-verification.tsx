import { render, Text } from 'jsx-email';
import type { GetSubject, GetTemplate, GetTemplateProps } from 'keycloakify-emails';
import { createVariablesHelper } from 'keycloakify-emails/variables';
import { CtaButton, Layout, styles } from '../layout';

const { exp } = createVariablesHelper('email-verification.ftl');

export const Template = ({ locale }: GetTemplateProps) => (
  <Layout
    locale={locale}
    preview="Verify your email address"
  >
    <Text style={styles.p}>
      Someone has created a {exp('realmName')} account with this email address. If this was you, click the button below
      to verify your email address.
    </Text>
    <CtaButton href={exp('link')}>Verify email address</CtaButton>
    <Text style={styles.p}>This link will expire within {exp('linkExpirationFormatter(linkExpiration)')}.</Text>
    <Text style={styles.muted}>If you didn&apos;t create this account, just ignore this message.</Text>
  </Layout>
);

export const getTemplate: GetTemplate = async (props) =>
  render(<Template {...props} />, { plainText: props.plainText });

export const getSubject: GetSubject = async () => 'Verify email';

export const templateName = 'Email Verification';

export const previewProps = { locale: 'en', themeName: 'otpki-keycloak-theme' };
