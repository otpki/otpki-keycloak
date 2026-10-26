import { render, Text } from 'jsx-email';
import type { GetSubject, GetTemplate, GetTemplateProps } from 'keycloakify-emails';
import * as Fm from 'keycloakify-emails/jsx-email';
import { createVariablesHelper } from 'keycloakify-emails/variables';
import { DetailsTable, Layout, styles } from '../layout';

const { exp } = createVariablesHelper('event-update_credential.ftl');

export const Template = ({ locale }: GetTemplateProps) => (
  <Layout
    locale={locale}
    preview="A credential on your account was updated"
  >
    <Text style={styles.p}>A credential on your account was changed.</Text>
    <DetailsTable
      rows={[
        ['Credential type', Fm.exp('event.getDetail("credential_type")!"unknown"')],
        ['Date', exp('event.date')],
        ['IP address', exp('event.ipAddress')],
      ]}
    />
    <Text style={styles.muted}>If this was not you, please contact an administrator.</Text>
  </Layout>
);

export const getTemplate: GetTemplate = async (props) =>
  render(<Template {...props} />, { plainText: props.plainText });

export const getSubject: GetSubject = async () => 'Update credential';

export const templateName = 'Update Credential';

export const previewProps = { locale: 'en', themeName: 'otpki-keycloak-theme' };
