import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Container,
  FormControlLabel,
  Link,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

export default function RegisterPage() {
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [dob, setDob] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [captchaChecked, setCaptchaChecked] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegister = () => {
    if (!firstName || !lastName || !email || !dob || !password || !confirmPassword) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Password and confirm password do not match.');
      return;
    }

    if (!captchaChecked) {
      setErrorMessage('Please confirm that you are not a robot.');
      return;
    }

    setErrorMessage('');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        bgcolor: '#f7f8fa',
        py: 4,
      }}
    >
      <Container maxWidth="md">
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
                <Typography
                  variant="h4"
                  fontWeight={700}
                  sx={{ color: '#1E293B', mb: 1 }}
                >
                  Register
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Create your account to join the ACHI Scaffolding ERP system.
                </Typography>
              </Box>

              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                  gap: 2.2,
                }}
              >
                <TextField
                  label="First Name"
                  fullWidth
                  required
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                    if (errorMessage) setErrorMessage('');
                  }}
                />

                <TextField
                  label="Middle Name"
                  fullWidth
                  value={middleName}
                  onChange={(e) => setMiddleName(e.target.value)}
                />

                <TextField
                  label="Last Name"
                  fullWidth
                  required
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                    if (errorMessage) setErrorMessage('');
                  }}
                />

                <TextField
                  label="Email"
                  type="email"
                  fullWidth
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errorMessage) setErrorMessage('');
                  }}
                />

                <TextField
                  label="Phone Number"
                  fullWidth
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />

                <TextField
                  label="Date of Birth"
                  type="date"
                  fullWidth
                  required
                  InputLabelProps={{ shrink: true }}
                  value={dob}
                  onChange={(e) => {
                    setDob(e.target.value);
                    if (errorMessage) setErrorMessage('');
                  }}
                />

                <TextField
                  label="Password"
                  type="password"
                  fullWidth
                  required
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errorMessage) setErrorMessage('');
                  }}
                />

                <TextField
                  label="Confirm Password"
                  type="password"
                  fullWidth
                  required
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    if (errorMessage) setErrorMessage('');
                  }}
                />
              </Box>

              <Box
                sx={{
                  border: '1px solid #d9d9d9',
                  borderRadius: 2,
                  px: 2,
                  py: 1.5,
                  bgcolor: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: 2,
                }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={captchaChecked}
                      onChange={(e) => {
                        setCaptchaChecked(e.target.checked);
                        if (errorMessage) setErrorMessage('');
                      }}
                    />
                  }
                  label="I'm not a robot"
                />

                <Box textAlign="right">
                  <Typography variant="caption" sx={{ display: 'block', color: 'text.secondary' }}>
                    CAPTCHA
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Demo only
                  </Typography>
                </Box>
              </Box>

              {errorMessage && (
                <Typography
                  variant="body2"
                  sx={{ color: 'error.main', fontWeight: 500 }}
                >
                  {errorMessage}
                </Typography>
              )}

              <Stack spacing={1.5}>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={handleRegister}
                  sx={{
                    py: 1.4,
                    borderRadius: 2,
                    textTransform: 'none',
                    fontWeight: 700,
                    bgcolor: '#28509E',
                  }}
                >
                  Register
                </Button>

                <Typography
                  variant="caption"
                  color="text.secondary"
                  textAlign="center"
                >
                  Registration backend not connected yet.
                </Typography>
              </Stack>

              <Typography variant="body2" textAlign="center" color="text.secondary">
                Already have an account?{' '}
                <Link
                  component={RouterLink}
                  to="/login"
                  underline="hover"
                  sx={{ fontWeight: 600, color: '#28509E' }}
                >
                  Login
                </Link>
              </Typography>
            </Stack>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}