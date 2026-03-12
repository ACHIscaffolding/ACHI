import { useState } from 'react';
import {
  Box, Button, TextField, InputAdornment, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, IconButton, Dialog,
  DialogTitle, DialogContent, DialogActions, MenuItem, Typography,
} from '@mui/material';
import { Search, Add, Edit, Delete } from '@mui/icons-material';
import TopBar from '../components/layout/TopBar';
import StatusChip from '../components/common/StatusChip';
import { followUps as initialData, FollowUp } from '../data/dummyData';

const activityTypes = ['Call', 'Email', 'Meeting', 'Site Visit'] as const;
const statusOptions = ['Pending', 'Completed', 'Overdue'] as const;
const employees = ['Ahmed K.', 'Mohammed S.', 'Hassan R.', 'Omar T.', 'Ali M.'];

export default function FollowUpsPage() {
  const [items, setItems] = useState<FollowUp[]>(initialData);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<FollowUp | null>(null);
  const [form, setForm] = useState<Partial<FollowUp>>({});

  const filtered = items.filter(f => {
    const matchSearch = !search || f.clientName.toLowerCase().includes(search.toLowerCase());
    const matchStatus = !filterStatus || f.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const openAdd = () => { setEditing(null); setForm({}); setDialogOpen(true); };
  const openEdit = (f: FollowUp) => { setEditing(f); setForm(f); setDialogOpen(true); };
  const handleDelete = (id: number) => setItems(items.filter(f => f.id !== id));
  const handleSave = () => {
    if (editing) setItems(items.map(f => f.id === editing.id ? { ...f, ...form } as FollowUp : f));
    else setItems([...items, { ...form, id: Date.now() } as FollowUp]);
    setDialogOpen(false);
  };

  return (
    <Box>
      <TopBar title="Follow Ups" subtitle="Track scheduled communications and tasks" />
      <Box sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
          <TextField size="small" placeholder="Search…" value={search} onChange={e => setSearch(e.target.value)}
            InputProps={{ startAdornment: <InputAdornment position="start"><Search sx={{ color: '#94A3B8' }} /></InputAdornment> }}
            sx={{ minWidth: 250 }} />
          <TextField select size="small" label="Status" value={filterStatus} onChange={e => setFilterStatus(e.target.value)} sx={{ minWidth: 150 }}>
            <MenuItem value="">All</MenuItem>
            {statusOptions.map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
          </TextField>
          <Box sx={{ flex: 1 }} />
          <Button variant="contained" startIcon={<Add />} onClick={openAdd} sx={{ bgcolor: '#28509E' }}>Add Follow Up</Button>
        </Box>

        <TableContainer component={Paper} sx={{ boxShadow: '0 1px 3px rgba(0,0,0,0.08)', borderRadius: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Client</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Due Date</TableCell>
                <TableCell>Assigned To</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Notes</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filtered.map(f => (
                <TableRow key={f.id} hover>
                  <TableCell><Typography fontWeight={600} fontSize="0.875rem">{f.clientName}</Typography></TableCell>
                  <TableCell>{f.activityType}</TableCell>
                  <TableCell>{f.dueDate}</TableCell>
                  <TableCell>{f.assignedTo}</TableCell>
                  <TableCell><StatusChip status={f.status} /></TableCell>
                  <TableCell sx={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{f.notes}</TableCell>
                  <TableCell align="right">
                    <IconButton size="small" onClick={() => openEdit(f)}><Edit fontSize="small" /></IconButton>
                    <IconButton size="small" onClick={() => handleDelete(f.id)}><Delete fontSize="small" sx={{ color: '#EF4444' }} /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle>{editing ? 'Edit Follow Up' : 'Add Follow Up'}</DialogTitle>
          <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: '16px !important' }}>
            <TextField label="Client Name" value={form.clientName || ''} onChange={e => setForm({ ...form, clientName: e.target.value })} fullWidth />
            <TextField select label="Activity Type" value={form.activityType || ''} onChange={e => setForm({ ...form, activityType: e.target.value as FollowUp['activityType'] })} fullWidth>
              {activityTypes.map(t => <MenuItem key={t} value={t}>{t}</MenuItem>)}
            </TextField>
            <TextField label="Due Date" type="date" value={form.dueDate || ''} onChange={e => setForm({ ...form, dueDate: e.target.value })} InputLabelProps={{ shrink: true }} fullWidth />
            <TextField select label="Assigned To" value={form.assignedTo || ''} onChange={e => setForm({ ...form, assignedTo: e.target.value })} fullWidth>
              {employees.map(e => <MenuItem key={e} value={e}>{e}</MenuItem>)}
            </TextField>
            <TextField select label="Status" value={form.status || ''} onChange={e => setForm({ ...form, status: e.target.value as FollowUp['status'] })} fullWidth>
              {statusOptions.map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
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
