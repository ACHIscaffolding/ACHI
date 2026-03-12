import { useState } from 'react';
import {
  Box, Button, TextField, InputAdornment, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow, Paper, IconButton,
  Dialog, DialogTitle, DialogContent, DialogActions, Typography,
} from '@mui/material';
import { Search, Add, Edit, Delete } from '@mui/icons-material';
import TopBar from '../components/layout/TopBar';
import { clients as initialClients, Client } from '../data/dummyData';

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>(initialClients);
  const [search, setSearch] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Client | null>(null);
  const [form, setForm] = useState<Partial<Client>>({});

  const filtered = clients.filter(c => !search || c.companyName.toLowerCase().includes(search.toLowerCase()) || c.contactPerson.toLowerCase().includes(search.toLowerCase()));

  const openAdd = () => { setEditing(null); setForm({}); setDialogOpen(true); };
  const openEdit = (c: Client) => { setEditing(c); setForm(c); setDialogOpen(true); };
  const handleDelete = (id: number) => setClients(clients.filter(c => c.id !== id));
  const handleSave = () => {
    if (editing) setClients(clients.map(c => c.id === editing.id ? { ...c, ...form } as Client : c));
    else setClients([...clients, { ...form, id: Date.now() } as Client]);
    setDialogOpen(false);
  };

  return (
    <Box>
      <TopBar title="Clients" subtitle="Manage confirmed client information" />
      <Box sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
          <TextField size="small" placeholder="Search clients…" value={search} onChange={e => setSearch(e.target.value)}
            InputProps={{ startAdornment: <InputAdornment position="start"><Search sx={{ color: '#94A3B8' }} /></InputAdornment> }}
            sx={{ minWidth: 250 }} />
          <Box sx={{ flex: 1 }} />
          <Button variant="contained" startIcon={<Add />} onClick={openAdd} sx={{ bgcolor: '#28509E' }}>Add Client</Button>
        </Box>

        <TableContainer component={Paper} sx={{ boxShadow: '0 1px 3px rgba(0,0,0,0.08)', borderRadius: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Company</TableCell>
                <TableCell>Contact</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Notes</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filtered.map(c => (
                <TableRow key={c.id} hover>
                  <TableCell><Typography fontWeight={600} fontSize="0.875rem">{c.companyName}</Typography></TableCell>
                  <TableCell>{c.contactPerson}</TableCell>
                  <TableCell>{c.phone}</TableCell>
                  <TableCell>{c.email}</TableCell>
                  <TableCell>{c.projectLocation}</TableCell>
                  <TableCell sx={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.notes}</TableCell>
                  <TableCell align="right">
                    <IconButton size="small" onClick={() => openEdit(c)}><Edit fontSize="small" /></IconButton>
                    <IconButton size="small" onClick={() => handleDelete(c.id)}><Delete fontSize="small" sx={{ color: '#EF4444' }} /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle>{editing ? 'Edit Client' : 'Add Client'}</DialogTitle>
          <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: '16px !important' }}>
            <TextField label="Company Name" value={form.companyName || ''} onChange={e => setForm({ ...form, companyName: e.target.value })} fullWidth />
            <TextField label="Contact Person" value={form.contactPerson || ''} onChange={e => setForm({ ...form, contactPerson: e.target.value })} fullWidth />
            <TextField label="Phone" value={form.phone || ''} onChange={e => setForm({ ...form, phone: e.target.value })} fullWidth />
            <TextField label="Email" value={form.email || ''} onChange={e => setForm({ ...form, email: e.target.value })} fullWidth />
            <TextField label="Project Location" value={form.projectLocation || ''} onChange={e => setForm({ ...form, projectLocation: e.target.value })} fullWidth />
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
