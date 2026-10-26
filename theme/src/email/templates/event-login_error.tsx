import { render, Text } from 'jsx-email';
import type { GetSubject, GetTemplate, GetTemplateProps } from 'keycloakify-emails';
import { createVariablesHelper } from 'keycloakify-emails/variables';
import { DetailsTable, Layout, styles } from '../layout';

const { exp } = createVariablesHelper('event-login_error.ftl');

export const Template = ({ locale }: GetTemplateProps) => (
  <Layout
    locale={locale}
    preview="A failed login attempt was detected"
  >
    <Text style={styles.p}>A failed login attempt was detected on your account.</Text>
    <DetailsTable
      rows={[
        ['Date', exp('event.date')],
        ['IP address', exp('event.ipAddress')],
      ]}
    />
    <Text style={styles.muted}>If this was not you, please contact an administrator.</Text>
  </Layout>
);

export const getTemplate: GetTemplate = async (props) =>
  render(<Template {...props} />, { plainText: props.plainText });

export const getSubject: GetSubject = async () => 'Login error';

export const templateName = 'Login Error';

export const previewProps = { locale: 'en', themeName: 'otpki-keycloak-theme' };
