import { Box, Typography } from '@mui/material';

const statusMap: Record<
  string,
  { bg: string; color: string; border: string }
> = {
  /* EXISTING STATUSES */

  NEW: {
    bg: 'rgba(40, 80, 158, 0.10)',
    color: '#28509E',
    border: 'rgba(40, 80, 158, 0.22)',
  },

  DEPLOYED: {
    bg: 'rgba(40, 80, 158, 0.10)',
    color: '#28509E',
    border: 'rgba(40, 80, 158, 0.22)',
  },

  UNPAID: {
    bg: 'rgba(240, 68, 56, 0.10)',
    color: '#F04438',
    border: 'rgba(240, 68, 56, 0.22)',
  },

  AWAITING: {
    bg: 'rgba(255, 107, 53, 0.10)',
    color: '#FF6B35',
    border: 'rgba(255, 107, 53, 0.22)',
  },

  COLLECTED: {
    bg: 'rgba(40, 80, 158, 0.10)',
    color: '#28509E',
    border: 'rgba(40, 80, 158, 0.22)',
  },

  OVERDUE: {
    bg: 'rgba(240, 68, 56, 0.10)',
    color: '#F04438',
    border: 'rgba(240, 68, 56, 0.22)',
  },

  /* INVENTORY STATUSES */

  AVAILABLE: {
    bg: 'rgba(40, 80, 158, 0.10)',
    color: '#28509E',
    border: 'rgba(40, 80, 158, 0.25)',
  },

  'LOW STOCK': {
    bg: 'rgba(255, 107, 53, 0.10)',
    color: '#FF6B35',
    border: 'rgba(255, 107, 53, 0.22)',
  },

  'IN USE': {
    bg: 'rgba(40, 80, 158, 0.10)',
    color: '#28509E',
    border: 'rgba(40, 80, 158, 0.22)',
  },

  DAMAGED: {
    bg: 'rgba(240, 68, 56, 0.10)',
    color: '#EF4444',
    border: 'rgba(240, 68, 56, 0.22)',
  },



  /* QUOTATION STATUSES */

PENDING: {
  bg: 'rgba(40, 80, 158, 0.10)',
  color: '#28509E',
  border: 'rgba(40, 80, 158, 0.22)',
},

ACCEPTED: {
  bg: 'rgba(40, 80, 158, 0.10)',
  color: '#28509E',
  border: 'rgba(40, 80, 158, 0.22)',
},

REJECTED: {
  bg: 'rgba(240, 68, 56, 0.10)',
  color: '#F04438',
  border: 'rgba(240, 68, 56, 0.22)',
},
};

export default function StatusChip({ status }: { status: string }) {
  const key = status.toUpperCase();

  const colors = statusMap[key] || {
    bg: 'rgba(152,162,179,0.10)',
    color: '#98A2B3',
    border: 'rgba(152,162,179,0.20)',
  };

  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        px: 1,
        py: 0.35,
        bgcolor: colors.bg,
        border: `1px solid ${colors.border}`,
        borderRadius: '6px',
      }}
    >
      <Typography
        sx={{
          fontFamily: "'Rajdhani', sans-serif",
          fontSize: '0.78rem',
          fontWeight: 700,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: colors.color,
          lineHeight: 1,
        }}
      >
        {status}
      </Typography>
    </Box>
  );
}