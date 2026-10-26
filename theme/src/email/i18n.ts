import type { GetMessages } from 'keycloakify-emails';

/*
 * Translations for strings referenced by templates but not defined in the
 * template bodies themselves (required-action names, link expiration units,
 * workflow notification keys). Values match the upstream Keycloak base
 * email theme (themes/base/email/messages/messages_en.properties).
 */
export const getMessages: GetMessages = ({ locale }): Record<string, string> => {
  if (locale !== 'en') {
    return {};
  }

  return {
    'requiredAction.CONFIGURE_TOTP': 'Configure OTP',
    'requiredAction.TERMS_AND_CONDITIONS': 'Terms and Conditions',
    'requiredAction.UPDATE_PASSWORD': 'Update Password',
    'requiredAction.UPDATE_PROFILE': 'Update Profile',
    'requiredAction.VERIFY_EMAIL': 'Verify Email',
    'requiredAction.CONFIGURE_RECOVERY_AUTHN_CODES': 'Generate Recovery Codes',

    'linkExpirationFormatter.timePeriodUnit.seconds': '{0,choice,0#seconds|1#second|1<seconds}',
    'linkExpirationFormatter.timePeriodUnit.minutes': '{0,choice,0#minutes|1#minute|1<minutes}',
    'linkExpirationFormatter.timePeriodUnit.hours': '{0,choice,0#hours|1#hour|1<hours}',
    'linkExpirationFormatter.timePeriodUnit.days': '{0,choice,0#days|1#day|1<days}',

    accountNotificationSubject: 'Account Notification',
    accountNotificationBody:
      'Your account requires attention. Please contact your administrator if you have questions.',
    accountDisableNotificationSubject: 'Account Disable Warning',
    accountDisableNotificationBody:
      'Your account will be disabled in {0} days due to {1}. Please log in to prevent this action.',
    accountDeleteNotificationSubject: 'Account Deletion Notice',
    accountDeleteNotificationBody:
      'Your account will be permanently deleted in {0} days due to {1}. All data will be lost. Please contact your administrator immediately if this is unexpected.',
  };
};
