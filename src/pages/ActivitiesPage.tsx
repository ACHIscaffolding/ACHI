import { useState } from 'react';
import {
  Box, Button, TextField, InputAdornment, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, IconButton, Dialog,
  DialogTitle, DialogContent, DialogActions, MenuItem, Typography, Chip,
} from '@mui/material';
import { Search, Add, Edit, Delete } from '@mui/icons-material';
import TopBar from '../components/layout/TopBar';
import { activities as initialData, Activity } from '../data/dummyData';

const activityTypes = ['Phone Call', 'Email', 'Meeting', 'Site Visit'] as const;
const employees = ['Ahmed K.', 'Mohammed S.', 'Hassan R.', 'Omar T.', 'Ali M.'];

const typeIcons: Record<string, { bg: string; color: string }> = {
  'Phone Call': { bg: '#EFF6FF', color: '#2563EB' },
  'Email': { bg: '#FFF7ED', color: '#EA580C' },
  'Meeting': { bg: '#F0FDF4', color: '#16A34A' },
  'Site Visit': { bg: '#F5F3FF', color: '#7C3AED' },
};

export default function ActivitiesPage() {
  const [items, setItems] = useState<Activity[]>(initialData);
  const [search, setSearch] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Activity | null>(null);
  const [form, setForm] = useState<Partial<Activity>>({});

  const filtered = items.filter(a => !search || a.clientName.toLowerCase().includes(search.toLowerCase()));

  const openAdd = () => { setEditing(null); setForm({}); setDialogOpen(true); };
  const openEdit = (a: Activity) => { setEditing(a); setForm(a); setDialogOpen(true); };
  const handleDelete = (id: number) => setItems(items.filter(a => a.id !== id));
  const handleSave = () => {
    if (editing) setItems(items.map(a => a.id === editing.id ? { ...a, ...form } as Activity : a));
    else setItems([...items, { ...form, id: Date.now() } as Activity]);
    setDialogOpen(false);
  };

  return (
    <Box>
      <TopBar title="Activities" subtitle="Log and review communication history" />
      <Box sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
          <TextField size="small" placeholder="Search…" value={search} onChange={e => setSearch(e.target.value)}
            InputProps={{ startAdornment: <InputAdornment position="start"><Search sx={{ color: '#94A3B8' }} /></InputAdornment> }}
            sx={{ minWidth: 250 }} />
          <Box sx={{ flex: 1 }} />
          <Button variant="contained" startIcon={<Add />} onClick={openAdd} sx={{ bgcolor: '#28509E' }}>Log Activity</Button>
        </Box>

        <TableContainer component={Paper} sx={{ boxShadow: '0 1px 3px rgba(0,0,0,0.08)', borderRadius: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Client</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Employee</TableCell>
                <TableCell>Notes</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filtered.map(a => {
                const tc = typeIcons[a.activityType] || { bg: '#F1F5F9', color: '#475569' };
                return (
                  <TableRow key={a.id} hover>
                    <TableCell><Typography fontWeight={600} fontSize="0.875rem">{a.clientName}</Typography></TableCell>
                    <TableCell><Chip label={a.activityType} size="small" sx={{ bgcolor: tc.bg, color: tc.color, fontWeight: 600 }} /></TableCell>
                    <TableCell>{a.date}</TableCell>
                    <TableCell>{a.employee}</TableCell>
                    <TableCell sx={{ maxWidth: 250, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{a.notes}</TableCell>
                    <TableCell align="right">
                      <IconButton size="small" onClick={() => openEdit(a)}><Edit fontSize="small" /></IconButton>
                      <IconButton size="small" onClick={() => handleDelete(a.id)}><Delete fontSize="small" sx={{ color: '#EF4444' }} /></IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle>{editing ? 'Edit Activity' : 'Log Activity'}</DialogTitle>
          <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: '16px !important' }}>
            <TextField label="Client Name" value={form.clientName || ''} onChange={e => setForm({ ...form, clientName: e.target.value })} fullWidth />
            <TextField select label="Activity Type" value={form.activityType || ''} onChange={e => setForm({ ...form, activityType: e.target.value as Activity['activityType'] })} fullWidth>
              {activityTypes.map(t => <MenuItem key={t} value={t}>{t}</MenuItem>)}
            </TextField>
            <TextField label="Date" type="date" value={form.date || ''} onChange={e => setForm({ ...form, date: e.target.value })} InputLabelProps={{ shrink: true }} fullWidth />
            <TextField select label="Employee" value={form.employee || ''} onChange={e => setForm({ ...form, employee: e.target.value })} fullWidth>
              {employees.map(e => <MenuItem key={e} value={e}>{e}</MenuItem>)}
            </TextField>
            <TextField label="Notes" value={form.notes || ''} onChange={e => setForm({ ...form, notes: e.target.value })} multiline rows={2} fullWidth />
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2 }}>
            <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button variant="contained" onClick={handleSave} sx={{ bgcolor: '#28509E' }}>Save</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
}
