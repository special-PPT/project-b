import { Container } from '@mui/material';
import AuthTopBar from './AuthTopBar';
import LoginPage from './LoginPage';
import Footer from '../common/Footer';
import CreatePage from './CreateAccPage';
import RouteProtector from './RouteProtector';
interface AuthLayoutProps {
  content: string 
}
export default function AuthLayout({ content }: AuthLayoutProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <AuthTopBar />
        <Container style={{ flex: 1 }}>
            {content === 'login' ? <LoginPage /> : <CreatePage />}
        </Container>
        <Footer />
    </div>
  );
}