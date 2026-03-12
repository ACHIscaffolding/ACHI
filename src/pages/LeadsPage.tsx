import { useState } from 'react';
import {
  Box, Button, TextField, InputAdornment, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow, Paper, IconButton,
  Dialog, DialogTitle, DialogContent, DialogActions, MenuItem, Typography,
} from '@mui/material';
import { Search, Add, Edit, Delete } from '@mui/icons-material';
import TopBar from '../components/layout/TopBar';
import StatusChip from '../components/common/StatusChip';
import { leads as initialLeads, Lead } from '../data/dummyData';

const statuses = ['New', 'Contacted', 'Qualified', 'Unqualified'] as const;
const employees = ['Ahmed K.', 'Mohammed S.', 'Hassan R.', 'Omar T.', 'Ali M.'];

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);
  const [form, setForm] = useState<Partial<Lead>>({});

  const filtered = leads.filter(l => {
    const matchSearch = !search || l.companyName.toLowerCase().includes(search.toLowerCase()) || l.contactPerson.toLowerCase().includes(search.toLowerCase());
    const matchStatus = !filterStatus || l.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const openAdd = () => { setEditingLead(null); setForm({}); setDialogOpen(true); };
  const openEdit = (lead: Lead) => { setEditingLead(lead); setForm(lead); setDialogOpen(true); };
  const handleDelete = (id: number) => setLeads(leads.filter(l => l.id !== id));

  const handleSave = () => {
    if (editingLead) {
      setLeads(leads.map(l => l.id === editingLead.id ? { ...l, ...form } as Lead : l));
    } else {
      setLeads([...leads, { ...form, id: Date.now() } as Lead]);
    }
    setDialogOpen(false);
  };

  return (
    <Box>
      <TopBar title="Leads" subtitle="Manage potential clients and track their progress" />
      <Box sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
          <TextField size="small" placeholder="Search leads…" value={search} onChange={e => setSearch(e.target.value)}
            InputProps={{ startAdornment: <InputAdornment position="start"><Search sx={{ color: '#94A3B8' }} /></InputAdornment> }}
            sx={{ minWidth: 250 }} />
          <TextField select size="small" label="Status" value={filterStatus} onChange={e => setFilterStatus(e.target.value)} sx={{ minWidth: 150 }}>
            <MenuItem value="">All</MenuItem>
            {statuses.map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
          </TextField>
          <Box sx={{ flex: 1 }} />
          <Button variant="contained" startIcon={<Add />} onClick={openAdd} sx={{ bgcolor: '#28509E' }}>Add Lead</Button>
        </Box>

        <TableContainer component={Paper} sx={{ boxShadow: '0 1px 3px rgba(0,0,0,0.08)', borderRadius: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Company</TableCell>
                <TableCell>Contact</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Assigned To</TableCell>
                <TableCell>Next Follow-Up</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filtered.map(lead => (
                <TableRow key={lead.id} hover>
                  <TableCell><Typography fontWeight={600} fontSize="0.875rem">{lead.companyName}</Typography></TableCell>
                  <TableCell>{lead.contactPerson}</TableCell>
                  <TableCell>{lead.phone}</TableCell>
                  <TableCell>{lead.email}</TableCell>
                  <TableCell><StatusChip status={lead.status} /></TableCell>
                  <TableCell>{lead.assignedTo}</TableCell>
                  <TableCell>{lead.nextFollowUp}</TableCell>
                  <TableCell align="right">
                    <IconButton size="small" onClick={() => openEdit(lead)}><Edit fontSize="small" /></IconButton>
                    <IconButton size="small" onClick={() => handleDelete(lead.id)}><Delete fontSize="small" sx={{ color: '#EF4444' }} /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle>{editingLead ? 'Edit Lead' : 'Add Lead'}</DialogTitle>
          <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: '16px !important' }}>
            <TextField label="Company Name" value={form.companyName || ''} onChange={e => setForm({ ...form, companyName: e.target.value })} fullWidth />
            <TextField label="Contact Person" value={form.contactPerson || ''} onChange={e => setForm({ ...form, contactPerson: e.target.value })} fullWidth />
            <TextField label="Phone" value={form.phone || ''} onChange={e => setForm({ ...form, phone: e.target.value })} fullWidth />
            <TextField label="Email" value={form.email || ''} onChange={e => setForm({ ...form, email: e.target.value })} fullWidth />
            <TextField select label="Status" value={form.status || ''} onChange={e => setForm({ ...form, status: e.target.value as Lead['status'] })} fullWidth>
              {statuses.map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
            </TextField>
            <TextField select label="Assigned To" value={form.assignedTo || ''} onChange={e => setForm({ ...form, assignedTo: e.target.value })} fullWidth>
              {employees.map(e => <MenuItem key={e} value={e}>{e}</MenuItem>)}
            </TextField>
            <TextField label="Next Follow-Up" type="date" value={form.nextFollowUp || ''} onChange={e => setForm({ ...form, nextFollowUp: e.target.value })} InputLabelProps={{ shrink: true }} fullWidth />
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
