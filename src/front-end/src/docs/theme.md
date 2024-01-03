# How to use Material-UI theme and theme provider
## current theme
```
palette: {
            primary:{
                light: '#a1caff',
                main: '#3a4d8f',
                dark: '#3a4d8f',
                contrastText: '#fff',
            }
        }
```
## the path of theme file: ./src/front-end/src/theme.tsx
> you can config any theme of Material-UI in this file
## global theme provider
```tsx
// App.tsx
import { ThemeProvider } from '@mui/material';
import theme from './theme';
function App() {
  return (
    <ThemeProvider theme={theme}>
        ...
    </ThemeProvider>
  );
}

export default App;
```