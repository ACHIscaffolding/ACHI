import { useState } from 'react';
import { Box, Card, CardContent, TextField, Button, Typography, Avatar } from '@mui/material';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#F5F6FA' }}>
      <Card sx={{ maxWidth: 420, width: '100%', mx: 2 }}>
        <CardContent sx={{ p: 4 }}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Avatar sx={{ width: 56, height: 56, bgcolor: '#28509E', mx: 'auto', mb: 2, fontWeight: 700, fontSize: '1.5rem' }}>A</Avatar>
            <Typography variant="h5" sx={{ fontWeight: 700, color: '#1A2332' }}>ACHI Scaffolding</Typography>
            <Typography variant="body2" sx={{ color: '#64748B', mt: 0.5 }}>Sign in to your CRM account</Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            <TextField label="Email Address" type="email" value={email} onChange={e => setEmail(e.target.value)} fullWidth />
            <TextField label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} fullWidth />
            <Button
              variant="contained" fullWidth size="large"
              sx={{ bgcolor: '#28509E', py: 1.2, fontWeight: 600, fontSize: '1rem' }}
              onClick={() => window.location.href = '/'}
            >
              Sign In
            </Button>
          </Box>
          <Typography variant="body2" sx={{ textAlign: 'center', mt: 3, color: '#64748B' }}>
            Forgot your password? Contact your administrator.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
