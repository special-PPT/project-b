import { Container } from '@mui/material';
import AuthTopBar from './AuthTopBar';
import LoginPage from './LoginPage';
import Footer from '../common/Footer';

export default function AuthLayout() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <AuthTopBar />
        <Container style={{ flex: 1 }}>
            <LoginPage />
        </Container>
        <Footer />
    </div>
  );
}