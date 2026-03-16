import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const DRAWER_WIDTH = 260; // must match expanded sidebar width

export default function AppLayout() {
  return (
    <Box
      sx={{
        display: 'flex',
        height: '100vh',
        bgcolor: 'background.default',
      }}
    >
      <Sidebar />

<Box
  component="main"
  sx={{
    flexGrow: 1,
    p: 4,
    minHeight: '100vh',
    backgroundColor: '#050505',
  }}
>
        <Box
          sx={{
            minHeight: '100%',
            px: { xs: 1, md: 1.2 },
            py: { xs: 0.9, md: 1 },
          }}
        >
          <Box
            sx={{
              width: '100%',
              maxWidth: '1520px',
            }}
          >
            <Outlet />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}