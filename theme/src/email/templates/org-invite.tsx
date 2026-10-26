import { render, Text } from 'jsx-email';
import type { GetSubject, GetTemplate, GetTemplateProps } from 'keycloakify-emails';
import * as Fm from 'keycloakify-emails/jsx-email';
import { createVariablesHelper } from 'keycloakify-emails/variables';
import { CtaButton, Layout, styles } from '../layout';

const { exp } = createVariablesHelper('org-invite.ftl');

export const Template = ({ locale }: GetTemplateProps) => (
  <Layout
    locale={locale}
    preview="You have been invited to join an organization"
  >
    <Fm.If condition="firstName?? && lastName??">
      <Text style={styles.p}>
        Hi, {exp('firstName')} {exp('lastName')}.
      </Text>
    </Fm.If>
    <Text style={styles.p}>
      You were invited to join the {exp('organization.name')} organization. Click the button below to join.
    </Text>
    <CtaButton href={exp('link')}>Join the organization</CtaButton>
    <Text style={styles.p}>This link will expire within {exp('linkExpirationFormatter(linkExpiration)')}.</Text>
    <Text style={styles.muted}>If you don&apos;t want to join the organization, just ignore this message.</Text>
  </Layout>
);

export const getTemplate: GetTemplate = async (props) =>
  render(<Template {...props} />, { plainText: props.plainText });

export const getSubject: GetSubject = async () => 'Invitation to join the {0} organization';

export const templateName = 'Organization Invitation';

export const previewProps = { locale: 'en', themeName: 'otpki-keycloak-theme' };
