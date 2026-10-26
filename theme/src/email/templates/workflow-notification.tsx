import { render, Text } from 'jsx-email';
import type { GetSubject, GetTemplate, GetTemplateProps } from 'keycloakify-emails';
import * as Fm from 'keycloakify-emails/jsx-email';
import { createVariablesHelper } from 'keycloakify-emails/variables';
import { Layout, styles } from '../layout';

const { exp } = createVariablesHelper('workflow-notification.ftl');

export const Template = ({ locale }: GetTemplateProps) => (
  <Layout
    locale={locale}
    preview="Your account requires attention"
  >
    <Text style={{ ...styles.p, fontSize: '16px', fontWeight: 600 }}>
      {Fm.exp('msg(subjectKey, daysRemaining, reason)')}
    </Text>
    <Fm.If condition='messageKey == "customMessage"'>
      <Fm.Then>
        <Text style={styles.p}>{Fm.exp('customMessage')}</Text>
      </Fm.Then>
      <Fm.Else>
        <Text style={styles.p}>Dear {exp('user.firstName!user.username')},</Text>
        <Text style={styles.p}>{Fm.exp('msg(messageKey, daysRemaining, reason)')}</Text>
        <Fm.If condition="daysRemaining gt 0">
          <Text style={styles.p}>Time remaining: {exp('daysRemaining')} day(s).</Text>
        </Fm.If>
        <Text style={styles.p}>If you have questions, please contact your {exp('realmName')} administrator.</Text>
      </Fm.Else>
    </Fm.If>
  </Layout>
);

export const getTemplate: GetTemplate = async (props) =>
  render(<Template {...props} />, { plainText: props.plainText });

export const getSubject: GetSubject = async () => 'Account Notification';

export const templateName = 'Workflow Notification';

export const previewProps = { locale: 'en', themeName: 'otpki-keycloak-theme' };
