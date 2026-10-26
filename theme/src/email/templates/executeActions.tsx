import { render, Text } from 'jsx-email';
import type { GetSubject, GetTemplate, GetTemplateProps } from 'keycloakify-emails';
import * as Fm from 'keycloakify-emails/jsx-email';
import { createVariablesHelper } from 'keycloakify-emails/variables';
import { CtaButton, Layout, styles } from '../layout';

const { exp } = createVariablesHelper('executeActions.ftl');

export const Template = ({ locale }: GetTemplateProps) => (
  <Layout
    locale={locale}
    preview="Update your account"
  >
    <Text style={styles.p}>
      Your administrator has just requested that you update your {exp('realmName')} account by performing the following
      action(s):{' '}
      <Fm.Tag
        name="list"
        attributes="requiredActions as reqActionItem"
      >
        {Fm.exp('msg("requiredAction." + reqActionItem)')}
        <Fm.Tag
          name="sep"
          attributes=""
        >
          ,{' '}
        </Fm.Tag>
      </Fm.Tag>
      . Click the button below to start this process.
    </Text>
    <CtaButton href={exp('link')}>Update account</CtaButton>
    <Text style={styles.p}>This link will expire within {exp('linkExpirationFormatter(linkExpiration)')}.</Text>
    <Text style={styles.muted}>
      If you are unaware that your administrator has requested this, just ignore this message and nothing will be
      changed.
    </Text>
  </Layout>
);

export const getTemplate: GetTemplate = async (props) =>
  render(<Template {...props} />, { plainText: props.plainText });

export const getSubject: GetSubject = async () => 'Update Your Account';

export const templateName = 'Execute Actions';

export const previewProps = { locale: 'en', themeName: 'otpki-keycloak-theme' };
