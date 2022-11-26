import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

export interface NavLinkProps {
  label: string;
  href: string;
  isActive?: boolean;
  icon?: JSX.Element;
  iconName?: IconDefinition;
  isVertical?: boolean;
  onClick?: () => void;
  subLinks?: {
    label: string;
    href: string;
    icon?: JSX.Element;
    iconName?: IconDefinition;
    isActive?: boolean;
  }[];
}

export const headerLinks: NavLinkProps[] = [
  {
    iconName: solid('home'),
    label: 'Home',
    href: '/',
  },
  {
    label: 'About',
    href: 'about',
  },
  {
    label: 'Support',
    href: 'support',
  },
];
