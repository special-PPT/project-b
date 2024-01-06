import { Box, ButtonBase } from '@mui/material';
import { NavLink } from 'react-router-dom';
import React, { ReactNode } from 'react';

interface SideNavItemProps {
  active?: boolean;      
  disabled?: boolean;   
  external?: boolean;   
  icon?: ReactNode;     
  path: string;         
  title: string;          
}

export const SideNavItem: React.FC<SideNavItemProps> = ({ icon, path, title }) => {

  return (
    <li>
      <ButtonBase
        component={NavLink}
        to={path}
        sx={{
          alignItems: 'center',
          borderRadius: 1,
          display: 'flex',
          justifyContent: 'flex-start',
          pl: '16px',
          pr: '16px',
          py: '16px',
          textAlign: 'left',
          width: '100%',
          textDecoration: 'none',
          '&.active': {
            backgroundColor: '#132666',
          },
          '&:hover': {
            backgroundColor: '#132666',
          }
        }}
      >
        {icon && (
          <Box
            component="span"
            sx={{
              alignItems: 'center',
              justifyContent: 'center',
              mr: 2,
            }}
          >
            {icon}
          </Box>
        )}
        <Box
          component="span"
          sx={{
            flexGrow: 1,
            fontFamily: (theme) => theme.typography.fontFamily,
            fontSize: 18,
            fontWeight: 600,
            lineHeight: '24px',
            whiteSpace: 'nowrap'
          }}
        >
          {title}
        </Box>
      </ButtonBase>
    </li>
  );
};

