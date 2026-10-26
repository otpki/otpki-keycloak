import { render, Text } from 'jsx-email';
import type { GetSubject, GetTemplate, GetTemplateProps } from 'keycloakify-emails';
import { createVariablesHelper } from 'keycloakify-emails/variables';
import { DetailsTable, Layout, styles } from '../layout';

const { exp } = createVariablesHelper('event-user_disabled_by_temporary_lockout.ftl');

export const Template = ({ locale }: GetTemplateProps) => (
  <Layout
    locale={locale}
    preview="Your account has been temporarily locked"
  >
    <Text style={styles.p}>Your account has been temporarily disabled due to multiple failed attempts.</Text>
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

export const getSubject: GetSubject = async () => 'Your account has been temporarily locked.';

export const templateName = 'User Disabled by Temporary Lockout';

export const previewProps = { locale: 'en', themeName: 'otpki-keycloak-theme' };
