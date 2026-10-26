import { render, Text } from 'jsx-email';
import type { GetSubject, GetTemplate, GetTemplateProps } from 'keycloakify-emails';
import { Layout, styles } from '../layout';

export const Template = ({ locale }: GetTemplateProps) => (
  <Layout
    locale={locale}
    preview="SMTP test message"
  >
    <Text style={styles.p}>This is a test message.</Text>
  </Layout>
);

export const getTemplate: GetTemplate = async (props) =>
  render(<Template {...props} />, { plainText: props.plainText });

export const getSubject: GetSubject = async () => 'OTPKI - SMTP test message';

export const templateName = 'Email Test';

export const previewProps = { locale: 'en', themeName: 'otpki-keycloak-theme' };
