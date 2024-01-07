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

export const hrItems: NavItem[] = [
  {
    title: 'Home',
    path: '/hr/home',
    icon: (
      <SvgIcon fontSize="medium">
        <IoMdHome />
      </SvgIcon>
    )
  },
  {
    title: 'Profile',
    path: '/hr/employee-profiles',
    icon: (
      <SvgIcon fontSize="medium">
        <IoMdPerson />
      </SvgIcon>
    )
  },
  {
    title: 'Visa Management',
    path: '/hr/visa-management',
    icon: (
      <SvgIcon fontSize="medium">
        <FaPassport />
      </SvgIcon>
    )
  },
  {
    title: 'Hiring Management',
    path: '/hr/Hiring-management',
    icon: (
      <SvgIcon fontSize="medium">
        <FaPassport />
      </SvgIcon>
    )
  },
  {
    title: 'Settings',
    path: '/hr/settings',
    icon: (
      <SvgIcon fontSize="medium">
        <IoMdSettings />
      </SvgIcon>
    )
  }
];
