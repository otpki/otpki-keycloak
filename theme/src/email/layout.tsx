import { Body, Container, Head, Html, Img, Link, Preview, Section } from 'jsx-email';
import * as Fm from 'keycloakify-emails/jsx-email';
import type { ReactNode } from 'react';

/*
 * OTPKI email chrome shared by every template. Kept intentionally simple:
 * system font stack (Geist is not available in mail clients), the OTPKI
 * icon, a single white card on a light neutral background, dark slate CTA
 * buttons matching the login theme's primary color, and brand-blue links.
 */

const isPreview = (import.meta as ImportMeta & { isJsxEmailPreview?: boolean }).isJsxEmailPreview;
const assetBaseUrl = isPreview ? '/assets' : '${url.resourcesUrl}';

export const styles = {
  body: {
    backgroundColor: '#f5f7f9',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    margin: 0,
    padding: '24px 0',
  },
  wrapper: {
    maxWidth: '560px',
    margin: '0 auto',
  },
  header: {
    padding: '8px 16px 16px',
  },
  brandIcon: {
    display: 'inline-block',
    verticalAlign: 'middle',
  },
  brandName: {
    display: 'inline-block',
    verticalAlign: 'middle',
    marginLeft: '8px',
    fontSize: '15px',
    fontWeight: 600,
    letterSpacing: '0.02em',
    color: '#1f2937',
  },
  card: {
    backgroundColor: '#ffffff',
    border: '1px solid #e5e8ec',
    borderRadius: '12px',
    padding: '32px',
  },
  p: {
    margin: '0 0 16px',
    fontSize: '14px',
    lineHeight: '22px',
    color: '#1f2937',
  },
  muted: {
    margin: '24px 0 0',
    fontSize: '13px',
    lineHeight: '20px',
    color: '#64748b',
  },
  ctaSection: {
    padding: '4px 0 20px',
  },
  ctaButton: {
    display: 'inline-block',
    backgroundColor: '#1f2937',
    borderRadius: '8px',
    padding: '10px 20px',
    fontSize: '14px',
    fontWeight: 500,
    color: '#ffffff',
    textDecoration: 'none',
  },
  codeBlock: {
    margin: '0 0 16px',
    padding: '12px 16px',
    backgroundColor: '#f3f5f7',
    border: '1px solid #e5e8ec',
    borderRadius: '8px',
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
    fontSize: '20px',
    fontWeight: 600,
    letterSpacing: '0.08em',
    color: '#1f2937',
    textAlign: 'center' as const,
  },
  link: {
    color: '#0073cf',
    textDecoration: 'underline',
  },
  detailTable: {
    width: '100%',
    margin: '0 0 16px',
    padding: '12px 16px',
    backgroundColor: '#f3f5f7',
    border: '1px solid #e5e8ec',
    borderRadius: '8px',
  },
  detailLabel: {
    fontSize: '13px',
    lineHeight: '20px',
    color: '#64748b',
    width: '40%',
    verticalAlign: 'top' as const,
    padding: '2px 8px 2px 0',
  },
  detailValue: {
    fontSize: '13px',
    lineHeight: '20px',
    color: '#1f2937',
    fontWeight: 500,
    verticalAlign: 'top' as const,
    padding: '2px 0',
  },
  footer: {
    padding: '16px',
    fontSize: '12px',
    lineHeight: '18px',
    color: '#94a3b8',
    textAlign: 'center' as const,
  },
} as const;

export const Layout = ({ locale, preview, children }: { locale: string; preview: string; children: ReactNode }) => (
  <Html lang={locale}>
    <Head />
    <Preview>{preview}</Preview>
    <Body style={styles.body}>
      <Container style={styles.wrapper}>
        <Section style={styles.header}>
          <Img
            src={`${assetBaseUrl}/ot-icon.png`}
            width="26"
            height="26"
            alt=""
            style={styles.brandIcon}
          />
          <span style={styles.brandName}>OTPKI</span>
        </Section>
        <Section style={styles.card}>{children}</Section>
        <Section style={styles.footer}>
          This is an automated message sent on behalf of {Fm.exp('realmName')}. Please do not reply to this email.
        </Section>
      </Container>
    </Body>
  </Html>
);

export const CtaButton = ({ href, children }: { href: string; children: ReactNode }) => (
  <Section style={styles.ctaSection}>
    <Link
      href={href}
      style={styles.ctaButton}
    >
      {children}
    </Link>
  </Section>
);

export const DetailsTable = ({ rows }: { rows: [string, ReactNode][] }) => (
  <Section style={styles.detailTable}>
    <table
      role="presentation"
      cellPadding="0"
      cellSpacing="0"
      width="100%"
    >
      <tbody>
        {rows.map(([label, value]) => (
          <tr key={label}>
            <td style={styles.detailLabel}>{label}</td>
            <td style={styles.detailValue}>{value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </Section>
);
