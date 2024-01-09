import { AppBar, Box, Toolbar, useMediaQuery } from '@mui/material'
import React from 'react'
import { Logo } from '../common/logo'
import theme from '../../theme';

export default function AuthTopBar() {
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <AppBar position="static"
        sx={{
            backgroundColor:isMobile ? theme.palette.primary.main :'#ffffff',
            borderRadius: '0px 0px 20px 20px',        
        }}
        elevation={0}
    >
        <Toolbar>
            <Logo color={isMobile? 'inherit':'black'}/>
            {
                isMobile ? null : 
                <React.Fragment>
                    <Box flexGrow={1} />
                    <Box
                    sx={{
                        width: 200,  
                        height: 100, 
                        borderRadius: '50%', 
                        backgroundColor: theme.palette.primary.main,
                        transform: 'scale(2)'
                    }}
                    />
                    <Box
                    sx={{
                        width: 100,  
                        height: 100, 
                        borderRadius: '50%', 
                        backgroundColor: theme.palette.primary.main,
                        transform: 'scale(3.5)'
                    }}
                    />
                </React.Fragment>
            }
        </Toolbar>
    </AppBar>
  )
}
