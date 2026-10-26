/**
 * This file has been claimed for ownership from @keycloakify/keycloak-ui-shared version 260700.0.3.
 * To relinquish ownership and restore this file to its original content, run the following command:
 *
 * $ npx keycloakify own --path "shared/keycloak-ui-shared/masthead/DefaultAvatar.tsx" --revert
 */

/* eslint-disable */

// @ts-nocheck

import styles from '@patternfly/react-styles/css/components/Avatar/avatar';
import { CircleUserRound } from 'lucide-react';
import { css } from '../../@patternfly/react-styles';

type DefaultAvatarProps = {
  className?: string;
  border?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg' | 'xl';
};

export const DefaultAvatar = ({ className = '', border, size = 'md' }: DefaultAvatarProps) => (
  <CircleUserRound
    className={css(
      styles.avatar,
      styles.modifiers[size],
      border === 'light' && styles.modifiers.light,
      border === 'dark' && styles.modifiers.dark,
      className,
    )}
    strokeWidth={1.5}
  />
);
