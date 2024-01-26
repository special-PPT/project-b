import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import MenuIcon from '@mui/icons-material/Menu';
import {
  Avatar,
  Badge,
  Box,
  IconButton,
  Stack,
  SvgIcon,
  Tooltip,
  useMediaQuery,
  Theme,
  Typography,
  Button
} from "@mui/material";
import userImage from './user.png';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const SIDE_NAV_WIDTH = 280;
const TOP_NAV_HEIGHT = 64;

interface TopNavProps {
  onNavOpen: () => void;
}

export default function TopNav(props: TopNavProps) {
  const [cookies, , removeCookie] = useCookies(['username', 'role', 'userId', 'authToken', 'email']);
  const username = cookies.username;
  const { onNavOpen } = props;
  const navigate = useNavigate();
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("lg"));
  const handleLogout = async () => {
    removeCookie('username', { path: '/' });
    removeCookie('role', { path: '/' });
    removeCookie('userId', { path: '/' });
    removeCookie('authToken', { path: '/' });
    removeCookie('email', { path: '/' });
    localStorage.setItem('currentTab', '0');
    navigate('/login');
  }

  return (
    <>
      <Box
        component="header"
        sx={{
          backdropFilter: "blur(6px)",
          backgroundColor: '#D9D9D9',
          color: '#3A4D8F',
          position: "sticky",
          left: {
            lg: `${SIDE_NAV_WIDTH}px`,
          },
          top: 0,
          width: {
            lg: `calc(100% - ${SIDE_NAV_WIDTH}px)`,
          },
          zIndex: (theme) => theme.zIndex.appBar,
        }}
      >
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
          spacing={2}
          sx={{
            minHeight: TOP_NAV_HEIGHT,
            px: 2,
          }}
        >
          <Stack alignItems="center" direction="row" spacing={2}>
            {!lgUp && (
              <IconButton onClick={onNavOpen}>
                <SvgIcon fontSize="small">
                  <MenuIcon />
                </SvgIcon>
              </IconButton>
            )}
            <Typography>Welcome back, {username}!</Typography>
          </Stack>
          <Stack alignItems="center" direction="row" spacing={2}>
            <Tooltip title="Notifications">
              <IconButton>
                <Badge badgeContent={4} color="success" variant="dot">
                  <SvgIcon fontSize="small">
                    <NotificationsNoneIcon />
                  </SvgIcon>
                </Badge>
              </IconButton>
            </Tooltip>
            <Button onClick={handleLogout}>Logout</Button>
            <Avatar
              sx={{
                cursor: "pointer",
                height: 40,
                width: 40,
              }}
              src={userImage}
            />

          </Stack>
        </Stack>
      </Box>
    </>
  );
}
