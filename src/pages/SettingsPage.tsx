import {
  Box, Card, CardContent, Typography, TextField, Button,
  Switch, FormControlLabel, Grid, Avatar,
} from '@mui/material';
import TopBar from '../components/layout/TopBar';

export default function SettingsPage() {
  return (
    <Box>
      <TopBar title="Settings" subtitle="Manage your account and preferences" />
      <Box sx={{ p: 3, maxWidth: 800 }}>
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>Profile</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <Avatar sx={{ width: 64, height: 64, bgcolor: '#28509E', fontSize: '1.5rem', fontWeight: 700 }}>AK</Avatar>
              <Box>
                <Typography fontWeight={600}>Ahmed Khalil</Typography>
                <Typography variant="body2">Sales Manager</Typography>
              </Box>
            </Box>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField label="Full Name" defaultValue="Ahmed Khalil" fullWidth size="small" />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField label="Email" defaultValue="ahmed@achiscaffolding.com" fullWidth size="small" />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField label="Phone" defaultValue="+971 50 123 4567" fullWidth size="small" />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField label="Role" defaultValue="Sales Manager" fullWidth size="small" disabled />
              </Grid>
            </Grid>
            <Button variant="contained" sx={{ mt: 2, bgcolor: '#28509E' }}>Save Changes</Button>
          </CardContent>
        </Card>

        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>Notifications</Typography>
            <FormControlLabel control={<Switch defaultChecked />} label="Email notifications for new leads" />
            <FormControlLabel control={<Switch defaultChecked />} label="Follow-up reminders" />
            <FormControlLabel control={<Switch />} label="Weekly summary report" />
            <FormControlLabel control={<Switch defaultChecked />} label="Quotation status updates" />
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>Company</Typography>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField label="Company Name" defaultValue="ACHI Scaffolding" fullWidth size="small" />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField label="Industry" defaultValue="Scaffolding & Construction" fullWidth size="small" />
              </Grid>
              <Grid size={12}>
                <TextField label="Address" defaultValue="Dubai Industrial City, UAE" fullWidth size="small" />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
