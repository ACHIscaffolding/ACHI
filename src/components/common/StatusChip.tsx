import { Chip } from '@mui/material';

const statusColors: Record<string, { bg: string; color: string }> = {
  'New': { bg: '#EFF6FF', color: '#2563EB' },
  'Contacted': { bg: '#FFF7ED', color: '#EA580C' },
  'Qualified': { bg: '#F0FDF4', color: '#16A34A' },
  'Unqualified': { bg: '#FEF2F2', color: '#DC2626' },
  'Pending': { bg: '#FFF7ED', color: '#EA580C' },
  'Completed': { bg: '#F0FDF4', color: '#16A34A' },
  'Overdue': { bg: '#FEF2F2', color: '#DC2626' },
  'Accepted': { bg: '#F0FDF4', color: '#16A34A' },
  'Rejected': { bg: '#FEF2F2', color: '#DC2626' },
  'Initial Inquiry': { bg: '#EFF6FF', color: '#2563EB' },
  'Site Visit': { bg: '#F5F3FF', color: '#7C3AED' },
  'Proposal Sent': { bg: '#FFF7ED', color: '#EA580C' },
  'Negotiation': { bg: '#FFFBEB', color: '#D97706' },
  'Won': { bg: '#F0FDF4', color: '#16A34A' },
  'Lost': { bg: '#FEF2F2', color: '#DC2626' },
};

export default function StatusChip({ status }: { status: string }) {
  const colors = statusColors[status] || { bg: '#F1F5F9', color: '#475569' };
  return (
    <Chip
      label={status}
      size="small"
      sx={{ bgcolor: colors.bg, color: colors.color, fontWeight: 600, border: 'none' }}
    />
  );
}
