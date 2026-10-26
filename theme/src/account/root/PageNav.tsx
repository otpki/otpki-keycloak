/**
 * This file has been claimed for ownership from @keycloakify/keycloak-account-ui version 260700.0.4.
 * To relinquish ownership and restore this file to its original content, run the following command:
 *
 * $ npx keycloakify own --path "account/root/PageNav.tsx" --revert
 */

/* eslint-disable */

// @ts-nocheck

import { useEnvironment } from '../../shared/keycloak-ui-shared';
import {
  Nav,
  NavExpandable,
  NavItem,
  NavList,
  PageSidebar,
  PageSidebarBody,
  Spinner,
} from '../../shared/@patternfly/react-core';
import {
  AppWindow,
  BadgeCheck,
  Building2,
  FolderOpen,
  KeyRound,
  LayoutGrid,
  Link as LinkIcon,
  MonitorSmartphone,
  ShieldCheck,
  UserRound,
  UsersRound,
  type LucideIcon,
} from 'lucide-react';
import { PropsWithChildren, MouseEvent as ReactMouseEvent, Suspense, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { matchPath, useHref, useLinkClickHandler, useLocation } from 'react-router-dom';

import fetchContentJson from '../content/fetchContent';
import type { TFuncKey } from '../i18n-type';
import type { AccountEnvironment, Feature } from '..';
import { usePromise } from '../utils/usePromise';

type RootMenuItem = {
  id?: string;
  label: TFuncKey;
  path: string;
  isVisible?: keyof Feature;
  modulePath?: string;
};

type MenuItemWithChildren = {
  label: TFuncKey;
  children: MenuItem[];
  isVisible?: keyof Feature;
};

export type MenuItem = RootMenuItem | MenuItemWithChildren;

const LABEL_ICONS: Record<string, LucideIcon> = {
  personalInfo: UserRound,
  accountSecurity: ShieldCheck,
  signingIn: KeyRound,
  deviceActivity: MonitorSmartphone,
  linkedAccounts: LinkIcon,
  applications: AppWindow,
  verifiableCredentials: BadgeCheck,
  groups: UsersRound,
  organizations: Building2,
  resources: FolderOpen,
};

const MenuIcon = ({ label }: { label: string }) => {
  const Icon = LABEL_ICONS[label] ?? LayoutGrid;
  return (
    <Icon
      className="otpki-nav-icon"
      size={16}
      strokeWidth={1.75}
    />
  );
};

export const PageNav = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>();
  const context = useEnvironment<AccountEnvironment>();

  usePromise((signal) => fetchContentJson({ signal, context }), setMenuItems);
  return (
    <PageSidebar>
      <PageSidebarBody>
        <Nav>
          <NavList>
            <Suspense fallback={<Spinner />}>
              {menuItems
                ?.filter((menuItem) => (menuItem.isVisible ? context.environment.features[menuItem.isVisible] : true))
                .map((menuItem) => (
                  <NavMenuItem
                    key={menuItem.label as string}
                    menuItem={menuItem}
                  />
                ))}
            </Suspense>
          </NavList>
        </Nav>
      </PageSidebarBody>
    </PageSidebar>
  );
};

type NavMenuItemProps = {
  menuItem: MenuItem;
};

function NavMenuItem({ menuItem }: NavMenuItemProps) {
  const { t } = useTranslation();
  const { environment } = useEnvironment<AccountEnvironment>();
  const { pathname } = useLocation();
  const isActive = useMemo(
    () => matchMenuItem(pathname, menuItem, environment.baseUrl),
    [pathname, menuItem, environment.baseUrl],
  );

  if ('path' in menuItem) {
    return (
      <NavLink
        path={menuItem.path}
        isActive={isActive}
        icon={<MenuIcon label={menuItem.label as string} />}
      >
        {t(menuItem.label)}
      </NavLink>
    );
  }

  return (
    <NavExpandable
      data-testid={menuItem.label}
      title={
        <span className="otpki-nav__label">
          <MenuIcon label={menuItem.label as string} />
          {t(menuItem.label)}
        </span>
      }
      isActive={isActive}
      isExpanded={isActive}
    >
      {menuItem.children
        .filter((menuItem) => (menuItem.isVisible ? environment.features[menuItem.isVisible] : true))
        .map((child) => (
          <NavMenuItem
            key={child.label as string}
            menuItem={child}
          />
        ))}
    </NavExpandable>
  );
}

function getFullUrl(path: string, baseUrl: string) {
  return `${new URL(baseUrl).pathname}${path}`;
}

function matchMenuItem(currentPath: string, menuItem: MenuItem, baseUrl: string): boolean {
  if ('path' in menuItem) {
    return !!matchPath(getFullUrl(menuItem.path, baseUrl), currentPath);
  }

  return menuItem.children.some((child) => matchMenuItem(currentPath, child, baseUrl));
}

type NavLinkProps = {
  path: string;
  isActive: boolean;
  icon?: React.ReactNode;
};

export const NavLink = ({ path, isActive, icon, children }: PropsWithChildren<NavLinkProps>) => {
  const { environment } = useEnvironment<AccountEnvironment>();
  const menuItemPath = getFullUrl(path, environment.baseUrl) + location.search;
  const href = useHref(menuItemPath);
  const handleClick = useLinkClickHandler(menuItemPath);

  return (
    <NavItem
      data-testid={path}
      to={href}
      isActive={isActive}
      onClick={(event) =>
        // PatternFly does not have the correct type for this event, so we need to cast it.
        handleClick(event as unknown as ReactMouseEvent<HTMLAnchorElement>)
      }
    >
      {icon}
      {children}
    </NavItem>
  );
};
