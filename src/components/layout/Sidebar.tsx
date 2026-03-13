import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  Avatar,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  ViewKanban,
  People,
  Business,
  TrendingUp,
  EventNote,
  History,
  Description,
  BarChart,
  Settings,
  Logout,
  Inventory2,
} from '@mui/icons-material';

const DRAWER_WIDTH = 260;

const navItems = [
  { label: 'Dashboard', icon: <DashboardIcon />, path: '/' },
  { label: 'CRM', icon: <ViewKanban />, path: '/crm' },
  { label: 'Leads', icon: <People />, path: '/leads' },
  { label: 'Clients', icon: <Business />, path: '/clients' },
  { label: 'Inventory', icon: <Inventory2 />, path: '/inventory' },
  { label: 'Opportunities', icon: <TrendingUp />, path: '/opportunities' },
  { label: 'Follow Ups', icon: <EventNote />, path: '/follow-ups' },
  { label: 'Activities', icon: <History />, path: '/activities' },
  { label: 'Quotations', icon: <Description />, path: '/quotations' },
  { label: 'Reports', icon: <BarChart />, path: '/reports' },
  { label: 'Settings', icon: <Settings />, path: '/settings' },
];

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: DRAWER_WIDTH,
          boxSizing: 'border-box',
          bgcolor: '#28509E',
          color: '#fff',
          borderRight: 'none',
        },
      }}
    >
      <Box sx={{ p: 2.5, display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Avatar
          sx={{ bgcolor: '#fff', color: '#28509E', fontWeight: 700, width: 40, height: 40 }}
        >
          A
        </Avatar>
        <Box>
          <Typography
            variant="h6"
            sx={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem', lineHeight: 1.2 }}
          >
            ACHI
          </Typography>
          <Typography
            sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.7rem', letterSpacing: '0.1em' }}
          >
            SCAFFOLDING CRM
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.15)', mx: 2 }} />

      <List sx={{ px: 1.5, py: 1, flex: 1 }}>
        {navItems.map((item) => {
          const active = location.pathname === item.path;

          return (
            <ListItemButton
              key={item.path}
              onClick={() => navigate(item.path)}
              sx={{
                borderRadius: 2,
                mb: 0.5,
                py: 1,
                bgcolor: active ? 'rgba(255,255,255,0.18)' : 'transparent',
                '&:hover': {
                  bgcolor: active ? 'rgba(255,255,255,0.22)' : 'rgba(255,255,255,0.08)',
                },
              }}
            >
              <ListItemIcon
                sx={{ color: active ? '#fff' : 'rgba(255,255,255,0.7)', minWidth: 40 }}
              >
                {item.icon}
              </ListItemIcon>

              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  fontSize: '0.875rem',
                  fontWeight: active ? 600 : 400,
                  color: active ? '#fff' : 'rgba(255,255,255,0.85)',
                }}
              />
            </ListItemButton>
          );
        })}
      </List>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.15)', mx: 2 }} />

      <List sx={{ px: 1.5, pb: 2 }}>
        <ListItemButton
          onClick={() => navigate('/login')}
          sx={{ borderRadius: 2, py: 1, '&:hover': { bgcolor: 'rgba(255,255,255,0.08)' } }}
        >
          <ListItemIcon sx={{ color: 'rgba(255,255,255,0.7)', minWidth: 40 }}>
            <Logout />
          </ListItemIcon>

          <ListItemText
            primary="Logout"
            primaryTypographyProps={{
              fontSize: '0.875rem',
              color: 'rgba(255,255,255,0.85)',
            }}
          />
        </ListItemButton>
      </List>
    </Drawer>
  );
}