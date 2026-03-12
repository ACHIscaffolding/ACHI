import { Box, Typography, Avatar, IconButton, Badge, InputBase } from '@mui/material';
import { Notifications, Search } from '@mui/icons-material';

interface TopBarProps {
  title: string;
  subtitle?: string;
}

export default function TopBar({ title, subtitle }: TopBarProps) {
  return (
    <Box
      sx={{
        px: 3, py: 2,
        bgcolor: '#fff',
        borderBottom: '1px solid #E2E8F0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Box>
        <Typography variant="h5" sx={{ color: '#1A2332', fontWeight: 700 }}>{title}</Typography>
        {subtitle && <Typography variant="body2" sx={{ color: '#64748B' }}>{subtitle}</Typography>}
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: '#F5F6FA', borderRadius: 2, px: 1.5, py: 0.5 }}>
          <Search sx={{ color: '#94A3B8', fontSize: 20, mr: 1 }} />
          <InputBase placeholder="Search…" sx={{ fontSize: '0.875rem' }} />
        </Box>
        <IconButton>
          <Badge badgeContent={3} color="error" variant="dot">
            <Notifications sx={{ color: '#64748B' }} />
          </Badge>
        </IconButton>
        <Avatar sx={{ width: 36, height: 36, bgcolor: '#28509E', fontSize: '0.875rem', fontWeight: 600 }}>AK</Avatar>
      </Box>
    </Box>
  );
}
