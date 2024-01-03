import { createTheme } from "@mui/material";

const theme = createTheme({
    components: {
        MuiButton: {
            styleOverrides:{
                root:{
                    borderRadius: '20px',
                },
            },
        },
    },
    palette: {
        primary:{
            light: '#a1caff',
            main: '#3a4d8f',
            dark: '#3a4d8f',
            contrastText: '#fff',
        }
    }
    }
)

export default theme;