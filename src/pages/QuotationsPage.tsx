import { useState } from 'react';
import {
  Box, Button, TextField, InputAdornment, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, IconButton, Dialog,
  DialogTitle, DialogContent, DialogActions, MenuItem, Typography,
} from '@mui/material';
import { Search, Add, Edit, Delete } from '@mui/icons-material';
import TopBar from '../components/layout/TopBar';
import StatusChip from '../components/common/StatusChip';
import { quotations as initialData, Quotation } from '../data/dummyData';

const statusOptions = ['Pending', 'Accepted', 'Rejected'] as const;

export default function QuotationsPage() {
  const [items, setItems] = useState<Quotation[]>(initialData);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Quotation | null>(null);
  const [form, setForm] = useState<Partial<Quotation>>({});

  const filtered = items.filter(q => {
    const matchSearch = !search || q.clientName.toLowerCase().includes(search.toLowerCase()) || q.projectName.toLowerCase().includes(search.toLowerCase());
    const matchStatus = !filterStatus || q.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const openAdd = () => { setEditing(null); setForm({}); setDialogOpen(true); };
  const openEdit = (q: Quotation) => { setEditing(q); setForm(q); setDialogOpen(true); };
  const handleDelete = (id: number) => setItems(items.filter(q => q.id !== id));
  const handleSave = () => {
    if (editing) setItems(items.map(q => q.id === editing.id ? { ...q, ...form } as Quotation : q));
    else setItems([...items, { ...form, id: Date.now() } as Quotation]);
    setDialogOpen(false);
  };

  const totalValue = filtered.reduce((s, q) => s + q.value, 0);

  return (
    <Box>
      <TopBar title="Quotations" subtitle="Track proposals and quotation status" />
      <Box sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
          <TextField size="small" placeholder="Search…" value={search} onChange={e => setSearch(e.target.value)}
            InputProps={{ startAdornment: <InputAdornment position="start"><Search sx={{ color: '#94A3B8' }} /></InputAdornment> }}
            sx={{ minWidth: 250 }} />
          <TextField select size="small" label="Status" value={filterStatus} onChange={e => setFilterStatus(e.target.value)} sx={{ minWidth: 150 }}>
            <MenuItem value="">All</MenuItem>
            {statusOptions.map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
          </TextField>
          <Typography sx={{ alignSelf: 'center', color: '#64748B', fontSize: '0.875rem' }}>
            Total: <strong style={{ color: '#28509E' }}>AED {totalValue.toLocaleString()}</strong>
          </Typography>
          <Box sx={{ flex: 1 }} />
          <Button variant="contained" startIcon={<Add />} onClick={openAdd} sx={{ bgcolor: '#28509E' }}>Add Quotation</Button>
        </Box>

        <TableContainer component={Paper} sx={{ boxShadow: '0 1px 3px rgba(0,0,0,0.08)', borderRadius: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Client</TableCell>
                <TableCell>Project</TableCell>
                <TableCell>Value (AED)</TableCell>
                <TableCell>Date Sent</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filtered.map(q => (
                <TableRow key={q.id} hover>
                  <TableCell><Typography fontWeight={600} fontSize="0.875rem">{q.clientName}</Typography></TableCell>
                  <TableCell>{q.projectName}</TableCell>
                  <TableCell>{q.value.toLocaleString()}</TableCell>
                  <TableCell>{q.dateSent}</TableCell>
                  <TableCell><StatusChip status={q.status} /></TableCell>
                  <TableCell align="right">
                    <IconButton size="small" onClick={() => openEdit(q)}><Edit fontSize="small" /></IconButton>
                    <IconButton size="small" onClick={() => handleDelete(q.id)}><Delete fontSize="small" sx={{ color: '#EF4444' }} /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle>{editing ? 'Edit Quotation' : 'Add Quotation'}</DialogTitle>
          <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: '16px !important' }}>
            <TextField label="Client Name" value={form.clientName || ''} onChange={e => setForm({ ...form, clientName: e.target.value })} fullWidth />
            <TextField label="Project Name" value={form.projectName || ''} onChange={e => setForm({ ...form, projectName: e.target.value })} fullWidth />
            <TextField label="Value (AED)" type="number" value={form.value || ''} onChange={e => setForm({ ...form, value: Number(e.target.value) })} fullWidth />
            <TextField label="Date Sent" type="date" value={form.dateSent || ''} onChange={e => setForm({ ...form, dateSent: e.target.value })} InputLabelProps={{ shrink: true }} fullWidth />
            <TextField select label="Status" value={form.status || ''} onChange={e => setForm({ ...form, status: e.target.value as Quotation['status'] })} fullWidth>
              {statusOptions.map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
            </TextField>
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
