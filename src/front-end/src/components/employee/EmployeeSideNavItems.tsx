import { IoMdHome, IoMdPerson, IoMdSettings } from "react-icons/io";
import { FaPassport } from "react-icons/fa";
import { SvgIcon } from '@mui/material';

interface NavItem {
  title: string;
  path: string;
  icon: JSX.Element;
  active?: boolean;
  disabled?: boolean;
  external?: boolean;
}

export const items: NavItem[] = [
  {
    title: 'Home',
    path: '/',
    icon: (
      <SvgIcon fontSize="medium">
        <IoMdHome />
      </SvgIcon>
    )
  },
  {
    title: 'Profile',
    path: '/profile',
    icon: (
      <SvgIcon fontSize="medium">
        <IoMdPerson />
      </SvgIcon>
    )
  },
  {
    title: 'Visa Management',
    path: '/visa-management',
    icon: (
      <SvgIcon fontSize="medium">
        <FaPassport />
      </SvgIcon>
    )
  },
  {
    title: 'Settings',
    path: '/settings',
    icon: (
      <SvgIcon fontSize="medium">
        <IoMdSettings />
      </SvgIcon>
    )
  }
];
