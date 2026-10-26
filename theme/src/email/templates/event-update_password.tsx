import { render, Text } from 'jsx-email';
import type { GetSubject, GetTemplate, GetTemplateProps } from 'keycloakify-emails';
import { createVariablesHelper } from 'keycloakify-emails/variables';
import { DetailsTable, Layout, styles } from '../layout';

const { exp } = createVariablesHelper('event-update_password.ftl');

export const Template = ({ locale }: GetTemplateProps) => (
  <Layout
    locale={locale}
    preview="Your password was changed"
  >
    <Text style={styles.p}>Your password was changed.</Text>
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

export const getSubject: GetSubject = async () => 'Update password';

export const templateName = 'Update Password';

export const previewProps = { locale: 'en', themeName: 'otpki-keycloak-theme' };
