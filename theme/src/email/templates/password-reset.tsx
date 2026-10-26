import { render, Text } from 'jsx-email';
import type { GetSubject, GetTemplate, GetTemplateProps } from 'keycloakify-emails';
import { createVariablesHelper } from 'keycloakify-emails/variables';
import { CtaButton, Layout, styles } from '../layout';

const { exp } = createVariablesHelper('password-reset.ftl');

export const Template = ({ locale }: GetTemplateProps) => (
  <Layout
    locale={locale}
    preview="Reset your credentials"
  >
    <Text style={styles.p}>
      Someone just requested to change your {exp('realmName')} account&apos;s credentials. If this was you, click the
      button below to reset them.
    </Text>
    <CtaButton href={exp('link')}>Reset credentials</CtaButton>
    <Text style={styles.p}>This link will expire within {exp('linkExpirationFormatter(linkExpiration)')}.</Text>
    <Text style={styles.muted}>
      If you don&apos;t want to reset your credentials, just ignore this message and nothing will be changed.
    </Text>
  </Layout>
);

export const getTemplate: GetTemplate = async (props) =>
  render(<Template {...props} />, { plainText: props.plainText });

export const getSubject: GetSubject = async () => 'Reset password';

export const templateName = 'Password Reset';

export const previewProps = { locale: 'en', themeName: 'otpki-keycloak-theme' };
