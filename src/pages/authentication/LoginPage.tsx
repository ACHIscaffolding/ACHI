import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Link,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

export default function LoginPage() {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = () => {
    if (username === 'admin' && password === 'admin') {
      setErrorMessage('');
      navigate('/dashboard');
      return;
    }

    setErrorMessage('Wrong email or password');
  };

  return (
<Box
  sx={{
    minHeight: '100vh',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    px: 2,
    background: `
      radial-gradient(circle at top left, rgba(242, 161, 0, 0.08), transparent 28%),
      radial-gradient(circle at bottom right, rgba(53, 97, 201, 0.14), transparent 32%),
      linear-gradient(180deg, #111111 0%, #181818 100%)
    `,
  }}
>
      <Container maxWidth="sm">
        <Card
          elevation={0}
          sx={{
            borderRadius: 4,
            border: '1px solid',
            borderColor: 'divider',
            boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
          }}
        >
          <CardContent sx={{ p: { xs: 3, sm: 5 } }}>
            <Stack spacing={3}>
              <Box textAlign="center">
                <Typography variant="h4" fontWeight={700}>
                  Login
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Temporary login for development
                </Typography>
              </Box>

              <Stack spacing={2}>
                <TextField
                  label="Username"
                  fullWidth
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    if (errorMessage) setErrorMessage('');
                  }}
                />

                <TextField
                  label="Password"
                  type="password"
                  fullWidth
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errorMessage) setErrorMessage('');
                  }}
                />

                {errorMessage && (
                  <Typography
                    variant="body2"
                    sx={{ color: 'error.main', fontWeight: 500 }}
                  >
                    {errorMessage}
                  </Typography>
                )}

                <Button
                  variant="contained"
                  fullWidth
                  onClick={handleLogin}
                  sx={{
                    py: 1.4,
                    borderRadius: 2,
                    textTransform: 'none',
                    fontWeight: 700,
                    bgcolor: '#28509E',
                  }}
                >
                  Login
                </Button>

                <Typography
                  variant="caption"
                  color="text.secondary"
                  textAlign="center"
                >
                  Test account: admin / admin
                </Typography>
              </Stack>

              <Typography variant="body2" textAlign="center" color="text.secondary">
                Don&apos;t have an account?{' '}
                <Link
                  component={RouterLink}
                  to="/register"
                  underline="hover"
                  sx={{ fontWeight: 600, color: '#28509E' }}
                >
                  Register
                </Link>
              </Typography>
            </Stack>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}