import { useState } from 'react';
import {
  Box, Button, TextField, InputAdornment, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, IconButton, Dialog,
  DialogTitle, DialogContent, DialogActions, MenuItem, Typography, Tabs, Tab, Card, CardContent, Chip,
} from '@mui/material';
import { Search, Add, Edit, Delete, AttachMoney } from '@mui/icons-material';
import TopBar from '../components/layout/TopBar';
import StatusChip from '../components/common/StatusChip';
import { opportunities as initialOps, Opportunity } from '../data/dummyData';

const stages = ['Initial Inquiry', 'Site Visit', 'Proposal Sent', 'Negotiation', 'Won', 'Lost'] as const;
const employees = ['Ahmed K.', 'Mohammed S.', 'Hassan R.', 'Omar T.', 'Ali M.'];

const stageColors: Record<string, string> = {
  'Initial Inquiry': '#2563EB', 'Site Visit': '#7C3AED', 'Proposal Sent': '#EA580C',
  'Negotiation': '#D97706', 'Won': '#16A34A', 'Lost': '#DC2626',
};

export default function OpportunitiesPage() {
  const [opps, setOpps] = useState<Opportunity[]>(initialOps);
  const [search, setSearch] = useState('');
  const [view, setView] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Opportunity | null>(null);
  const [form, setForm] = useState<Partial<Opportunity>>({});

  const filtered = opps.filter(o => !search || o.clientName.toLowerCase().includes(search.toLowerCase()) || o.projectName.toLowerCase().includes(search.toLowerCase()));

  const openAdd = () => { setEditing(null); setForm({}); setDialogOpen(true); };
  const openEdit = (o: Opportunity) => { setEditing(o); setForm(o); setDialogOpen(true); };
  const handleDelete = (id: number) => setOpps(opps.filter(o => o.id !== id));
  const handleSave = () => {
    if (editing) setOpps(opps.map(o => o.id === editing.id ? { ...o, ...form } as Opportunity : o));
    else setOpps([...opps, { ...form, id: Date.now() } as Opportunity]);
    setDialogOpen(false);
  };

  return (
    <Box>
      <TopBar title="Opportunities" subtitle="Track your sales pipeline and deals" />
      <Box sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap', alignItems: 'center' }}>
          <TextField size="small" placeholder="Search…" value={search} onChange={e => setSearch(e.target.value)}
            InputProps={{ startAdornment: <InputAdornment position="start"><Search sx={{ color: '#94A3B8' }} /></InputAdornment> }}
            sx={{ minWidth: 250 }} />
          <Tabs value={view} onChange={(_, v) => setView(v)} sx={{ '& .MuiTab-root': { textTransform: 'none', fontWeight: 600 } }}>
            <Tab label="Table View" />
            <Tab label="Pipeline View" />
          </Tabs>
          <Box sx={{ flex: 1 }} />
          <Button variant="contained" startIcon={<Add />} onClick={openAdd} sx={{ bgcolor: '#28509E' }}>Add Opportunity</Button>
        </Box>

        {view === 0 ? (
          <TableContainer component={Paper} sx={{ boxShadow: '0 1px 3px rgba(0,0,0,0.08)', borderRadius: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Client</TableCell>
                  <TableCell>Project</TableCell>
                  <TableCell>Value (AED)</TableCell>
                  <TableCell>Stage</TableCell>
                  <TableCell>Assigned To</TableCell>
                  <TableCell>Expected Close</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filtered.map(o => (
                  <TableRow key={o.id} hover>
                    <TableCell><Typography fontWeight={600} fontSize="0.875rem">{o.clientName}</Typography></TableCell>
                    <TableCell>{o.projectName}</TableCell>
                    <TableCell>{o.value.toLocaleString()}</TableCell>
                    <TableCell><StatusChip status={o.stage} /></TableCell>
                    <TableCell>{o.assignedTo}</TableCell>
                    <TableCell>{o.expectedClose}</TableCell>
                    <TableCell align="right">
                      <IconButton size="small" onClick={() => openEdit(o)}><Edit fontSize="small" /></IconButton>
                      <IconButton size="small" onClick={() => handleDelete(o.id)}><Delete fontSize="small" sx={{ color: '#EF4444' }} /></IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Box sx={{ display: 'flex', gap: 2, overflowX: 'auto', pb: 2 }}>
            {stages.map(stage => {
              const stageOpps = filtered.filter(o => o.stage === stage);
              const total = stageOpps.reduce((s, o) => s + o.value, 0);
              return (
                <Box key={stage} sx={{ minWidth: 280, flex: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5, px: 1 }}>
                    <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: stageColors[stage] }} />
                    <Typography fontWeight={600} fontSize="0.875rem">{stage}</Typography>
                    <Chip label={stageOpps.length} size="small" sx={{ ml: 'auto', bgcolor: '#F1F5F9' }} />
                  </Box>
                  <Typography variant="body2" sx={{ px: 1, mb: 1.5, color: '#64748B', fontSize: '0.75rem' }}>
                    AED {total.toLocaleString()}
                  </Typography>
                  {stageOpps.map(o => (
                    <Card key={o.id} sx={{ mb: 1.5, cursor: 'pointer', '&:hover': { boxShadow: '0 4px 12px rgba(0,0,0,0.1)' } }} onClick={() => openEdit(o)}>
                      <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                        <Typography fontWeight={600} fontSize="0.875rem">{o.projectName}</Typography>
                        <Typography variant="body2" fontSize="0.8rem">{o.clientName}</Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1, alignItems: 'center' }}>
                          <Typography fontWeight={600} fontSize="0.8rem" sx={{ color: '#28509E' }}>
                            <AttachMoney sx={{ fontSize: 14, verticalAlign: 'text-bottom' }} />
                            {o.value.toLocaleString()}
                          </Typography>
                          <Typography variant="body2" fontSize="0.7rem">{o.assignedTo}</Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  ))}
                </Box>
              );
            })}
          </Box>
        )}

        <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle>{editing ? 'Edit Opportunity' : 'Add Opportunity'}</DialogTitle>
          <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: '16px !important' }}>
            <TextField label="Client Name" value={form.clientName || ''} onChange={e => setForm({ ...form, clientName: e.target.value })} fullWidth />
            <TextField label="Project Name" value={form.projectName || ''} onChange={e => setForm({ ...form, projectName: e.target.value })} fullWidth />
            <TextField label="Value (AED)" type="number" value={form.value || ''} onChange={e => setForm({ ...form, value: Number(e.target.value) })} fullWidth />
            <TextField select label="Stage" value={form.stage || ''} onChange={e => setForm({ ...form, stage: e.target.value as Opportunity['stage'] })} fullWidth>
              {stages.map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
            </TextField>
            <TextField select label="Assigned To" value={form.assignedTo || ''} onChange={e => setForm({ ...form, assignedTo: e.target.value })} fullWidth>
              {employees.map(e => <MenuItem key={e} value={e}>{e}</MenuItem>)}
            </TextField>
            <TextField label="Expected Close" type="date" value={form.expectedClose || ''} onChange={e => setForm({ ...form, expectedClose: e.target.value })} InputLabelProps={{ shrink: true }} fullWidth />
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
