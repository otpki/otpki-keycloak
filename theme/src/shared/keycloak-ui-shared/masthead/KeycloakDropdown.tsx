/**
 * This file has been claimed for ownership from @keycloakify/keycloak-ui-shared version 260700.0.3.
 * To relinquish ownership and restore this file to its original content, run the following command:
 *
 * $ npx keycloakify own --path "shared/keycloak-ui-shared/masthead/KeycloakDropdown.tsx" --revert
 */

/* eslint-disable */

// @ts-nocheck

import { Dropdown, DropdownList, DropdownProps, MenuToggle } from '../../@patternfly/react-core';
import { EllipsisVertical } from 'lucide-react';
import { ReactNode, useState } from 'react';

type KeycloakDropdownProps = Omit<DropdownProps, 'toggle'> & {
  'data-testid'?: string;
  isKebab?: boolean;
  title?: ReactNode;
  dropDownItems: ReactNode[];
};

export const KeycloakDropdown = ({ isKebab = false, title, dropDownItems, ...rest }: KeycloakDropdownProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Dropdown
      {...rest}
      popperProps={{
        position: 'right',
      }}
      onOpenChange={(isOpen) => setOpen(isOpen)}
      toggle={(ref) => (
        <MenuToggle
          data-testid={`${rest['data-testid']}-toggle`}
          ref={ref}
          onClick={() => setOpen(!open)}
          isExpanded={open}
          variant={isKebab ? 'plain' : 'default'}
        >
          {isKebab ? <EllipsisVertical size={18} /> : title}
        </MenuToggle>
      )}
      isOpen={open}
    >
      <DropdownList>{dropDownItems}</DropdownList>
    </Dropdown>
  );
};
