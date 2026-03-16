import { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import {
  Add,
  Delete,
  Description,
  Edit,
  Groups,
  PersonAddAlt1,
  Search,
  UploadFile,
  Visibility,
  WorkOutline,
} from '@mui/icons-material';
import TopBar from '../components/layout/TopBar';
import StatusChip from '../components/common/StatusChip';

type ContactStatus =
  | 'Prospect'
  | 'Lead'
  | 'Client'
  | 'Supplier'
  | 'Employee'
  | 'Partner'
  | 'Worker';

type ContactSource =
  | 'Google'
  | 'Instagram'
  | 'Facebook'
  | 'Website'
  | 'Social Media'
  | 'WhatsApp'
  | 'Referral'
  | 'LinkedIn'
  | 'Phone Call'
  | 'Other';

type ProjectItem = {
  id: number;
  projectName: string;
  location: string;
  stage: 'Inquiry' | 'Quotation' | 'Negotiation' | 'Won' | 'Lost';
};

type ContactItem = {
  id: number;
  name: string;
  surname: string;
  company: string;
  mobile: string;
  tel: string;
  email: string;
  website: string;
  address: string;
  source: ContactSource;
  status: ContactStatus;
  projects: ProjectItem[];
};

type ColumnKey =
  | 'name'
  | 'surname'
  | 'company'
  | 'mobile'
  | 'tel'
  | 'email'
  | 'website'
  | 'address'
  | 'source'
  | 'status'
  | 'projects'
  | 'actions';

type ImportOption = 'googleContacts' | 'gmail' | 'outlook' | 'notepad';

const statuses: ContactStatus[] = [
  'Prospect',
  'Lead',
  'Client',
  'Supplier',
  'Employee',
  'Partner',
  'Worker',
];

const sources: ContactSource[] = [
  'Google',
  'Instagram',
  'Facebook',
  'Website',
  'Social Media',
  'WhatsApp',
  'Referral',
  'LinkedIn',
  'Phone Call',
  'Other',
];

const initialContacts: ContactItem[] = [
  {
    id: 1,
    name: 'Ahmad',
    surname: 'Khalil',
    company: 'BuildCo',
    mobile: '+961 70 123 456',
    tel: '01 456 789',
    email: 'ahmad@buildco.com',
    website: 'www.buildco.com',
    address: 'Beirut, Lebanon',
    source: 'Google',
    status: 'Lead',
    projects: [
      { id: 101, projectName: 'ABC Tower Scaffolding', location: 'Downtown Beirut', stage: 'Quotation' },
      { id: 102, projectName: 'Facade Access Work', location: 'Jal El Dib', stage: 'Negotiation' },
    ],
  },
  {
    id: 2,
    name: 'Karim',
    surname: 'Haddad',
    company: 'Skyline Contracting',
    mobile: '+961 71 555 888',
    tel: '01 789 456',
    email: 'karim@skyline.com',
    website: 'www.skyline.com',
    address: 'Dbayeh, Lebanon',
    source: 'Instagram',
    status: 'Prospect',
    projects: [
      { id: 201, projectName: 'Residential Building Access', location: 'Dbayeh', stage: 'Inquiry' },
    ],
  },
  {
    id: 3,
    name: 'Maya',
    surname: 'Nassar',
    company: 'Urban Developers',
    mobile: '+961 76 222 111',
    tel: '01 963 852',
    email: 'maya@urban.com',
    website: 'www.urban.com',
    address: 'Achrafieh, Lebanon',
    source: 'Referral',
    status: 'Client',
    projects: [
      { id: 301, projectName: 'Mall Expansion Project', location: 'Hazmieh', stage: 'Won' },
      { id: 302, projectName: 'Roof Access System', location: 'Verdun', stage: 'Won' },
      { id: 303, projectName: 'Bridge Maintenance Access', location: 'Nahr El Kalb', stage: 'Quotation' },
    ],
  },
];

const defaultColumnWidths: Record<ColumnKey, number> = {
  name: 130,
  surname: 130,
  company: 180,
  mobile: 150,
  tel: 130,
  email: 220,
  website: 180,
  address: 220,
  source: 140,
  status: 130,
  projects: 170,
  actions: 150,
};

const emptyForm: Partial<ContactItem> = {
  name: '',
  surname: '',
  company: '',
  mobile: '',
  tel: '',
  email: '',
  website: '',
  address: '',
  source: 'Google',
  status: 'Prospect',
  projects: [],
};

const importOptionMeta: Record<
  ImportOption,
  {
    title: string;
    description: string;
    suggestedSource: ContactSource;
  }
> = {
  googleContacts: {
    title: 'Google Contacts',
    description: 'Import a contact exported from Google Contacts.',
    suggestedSource: 'Google',
  },
  gmail: {
    title: 'Gmail',
    description: 'Import a contact file exported from Gmail.',
    suggestedSource: 'Google',
  },
  outlook: {
    title: 'Outlook',
    description: 'Import a contact file exported from Outlook.',
    suggestedSource: 'Other',
  },
  notepad: {
    title: 'Notepad / CSV',
    description: 'Import a CSV or TXT contact file.',
    suggestedSource: 'Other',
  },
};

export default function ContactPage() {
  const [contacts, setContacts] = useState<ContactItem[]>(initialContacts);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterSource, setFilterSource] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [projectsDialogOpen, setProjectsDialogOpen] = useState(false);
  const [summaryDialogOpen, setSummaryDialogOpen] = useState(false);
  const [importOptionsOpen, setImportOptionsOpen] = useState(false);
  const [editingContact, setEditingContact] = useState<ContactItem | null>(null);
  const [selectedContactProjects, setSelectedContactProjects] = useState<ContactItem | null>(null);
  const [selectedSummaryContact, setSelectedSummaryContact] = useState<ContactItem | null>(null);
  const [columnWidths, setColumnWidths] = useState<Record<ColumnKey, number>>(defaultColumnWidths);
  const [form, setForm] = useState<Partial<ContactItem>>(emptyForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isImportedContact, setIsImportedContact] = useState(false);
  const [importError, setImportError] = useState('');
  const [importedFileName, setImportedFileName] = useState('');
  const [selectedImportOption, setSelectedImportOption] = useState<ImportOption | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const filtered = contacts.filter((item) => {
    const q = search.toLowerCase();

    const matchSearch =
      !search ||
      item.name.toLowerCase().includes(q) ||
      item.surname.toLowerCase().includes(q) ||
      item.company.toLowerCase().includes(q) ||
      item.email.toLowerCase().includes(q) ||
      item.mobile.toLowerCase().includes(q) ||
      item.tel.toLowerCase().includes(q) ||
      item.address.toLowerCase().includes(q);

    const matchStatus = !filterStatus || item.status === filterStatus;
    const matchSource = !filterSource || item.source === filterSource;

    return matchSearch && matchStatus && matchSource;
  });

  const stats = useMemo(() => {
    const total = contacts.length;
    const prospects = contacts.filter((item) => item.status === 'Prospect').length;
    const leads = contacts.filter((item) => item.status === 'Lead').length;
    const clients = contacts.filter((item) => item.status === 'Client').length;

    return { total, prospects, leads, clients };
  }, [contacts]);

  const resetFormState = () => {
    setForm(emptyForm);
    setErrors({});
    setImportedFileName('');
    setImportError('');
    setIsImportedContact(false);
    setSelectedImportOption(null);
  };

  const openAdd = () => {
    setEditingContact(null);
    resetFormState();
    setDialogOpen(true);
  };

  const openEdit = (contact: ContactItem) => {
    setEditingContact(contact);
    setIsImportedContact(false);
    setErrors({});
    setImportError('');
    setImportedFileName('');
    setSelectedImportOption(null);
    setForm(contact);
    setDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    setContacts((prev) => prev.filter((item) => item.id !== id));
  };

  const openProjectsDialog = (contact: ContactItem) => {
    setSelectedContactProjects(contact);
    setProjectsDialogOpen(true);
  };

  const openSummaryDialog = (contact: ContactItem) => {
    setSelectedSummaryContact(contact);
    setSummaryDialogOpen(true);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!form.name?.trim()) newErrors.name = 'Name is required';
    if (!form.surname?.trim()) newErrors.surname = 'Surname is required';
    if (!form.company?.trim()) newErrors.company = 'Company is required';
    if (!form.mobile?.trim()) newErrors.mobile = 'Mobile is required';

    if (!form.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      newErrors.email = 'Enter a valid email address';
    }

    if (!form.source) newErrors.source = 'Source is required';
    if (!form.status) newErrors.status = 'Type is required';

    const duplicateByEmail = contacts.find(
      (item) =>
        item.email.trim().toLowerCase() === (form.email || '').trim().toLowerCase() &&
        item.id !== editingContact?.id
    );

    if (duplicateByEmail) {
      newErrors.email = 'A contact with this email already exists';
    }

    const duplicateByMobile = contacts.find(
      (item) =>
        item.mobile.trim().toLowerCase() === (form.mobile || '').trim().toLowerCase() &&
        item.id !== editingContact?.id
    );

    if (duplicateByMobile) {
      newErrors.mobile = 'A contact with this mobile number already exists';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) return;

    const payload: ContactItem = {
      id: editingContact ? editingContact.id : Date.now(),
      name: form.name?.trim() || '',
      surname: form.surname?.trim() || '',
      company: form.company?.trim() || '',
      mobile: form.mobile?.trim() || '',
      tel: form.tel?.trim() || '',
      email: form.email?.trim() || '',
      website: form.website?.trim() || '',
      address: form.address?.trim() || '',
      source: (form.source as ContactSource) || 'Google',
      status: (form.status as ContactStatus) || 'Prospect',
      projects: editingContact?.projects || [],
    };

    if (editingContact) {
      setContacts((prev) => prev.map((item) => (item.id === editingContact.id ? payload : item)));
    } else {
      setContacts((prev) => [payload, ...prev]);
    }

    setDialogOpen(false);
    setEditingContact(null);
    resetFormState();
  };

  const startResize = (column: ColumnKey, e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const startX = e.clientX;
    const startWidth = columnWidths[column];

    const onMouseMove = (moveEvent: MouseEvent) => {
      const delta = moveEvent.clientX - startX;
      const newWidth = Math.max(90, startWidth + delta);

      setColumnWidths((prev) => ({
        ...prev,
        [column]: newWidth,
      }));
    };

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };

    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  const columns = useMemo(
    () => [
      { key: 'name' as ColumnKey, label: 'Name' },
      { key: 'surname' as ColumnKey, label: 'Surname' },
      { key: 'company' as ColumnKey, label: 'Company' },
      { key: 'mobile' as ColumnKey, label: 'Mobile' },
      { key: 'tel' as ColumnKey, label: 'Tel' },
      { key: 'email' as ColumnKey, label: 'Email' },
      { key: 'website' as ColumnKey, label: 'Website' },
      { key: 'address' as ColumnKey, label: 'Address' },
      { key: 'source' as ColumnKey, label: 'Source' },
      { key: 'status' as ColumnKey, label: 'Type' },
      { key: 'projects' as ColumnKey, label: 'Projects Number' },
      { key: 'actions' as ColumnKey, label: 'Actions' },
    ],
    []
  );

  const headerCellSx = (key: ColumnKey) => ({
    width: columnWidths[key],
    minWidth: columnWidths[key],
    maxWidth: columnWidths[key],
    position: 'relative',
    whiteSpace: 'nowrap',
    fontWeight: 700,
    backgroundColor: '#F8FAFC',
    borderBottom: '1px solid #E2E8F0',
    px: 1.5,
    color: '#0F172A',
  });

  const bodyCellSx = (key: ColumnKey) => ({
    width: columnWidths[key],
    minWidth: columnWidths[key],
    maxWidth: columnWidths[key],
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    px: 1.5,
    color: '#334155',
  });

  const normalizeHeader = (value: string) => value.toLowerCase().replace(/[-_\s]/g, '');

  const splitCsvLine = (line: string) => {
    const result: string[] = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i += 1) {
      const char = line[i];
      const next = line[i + 1];

      if (char === '"') {
        if (inQuotes && next === '"') {
          current += '"';
          i += 1;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (char === ',' && !inQuotes) {
        result.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }

    result.push(current.trim());
    return result.map((item) => item.replace(/^"(.*)"$/, '$1').trim());
  };

  const extractImportedContact = (csvText: string): Partial<ContactItem> | null => {
    const lines = csvText
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean);

    if (lines.length < 2) return null;

    const headers = splitCsvLine(lines[0]).map(normalizeHeader);
    const firstRow = splitCsvLine(lines[1]);

    const getValue = (...possibleHeaders: string[]) => {
      for (const header of possibleHeaders) {
        const index = headers.indexOf(normalizeHeader(header));
        if (index !== -1) return firstRow[index] || '';
      }
      return '';
    };

    const fullName = getValue('name', 'fullname', 'full name', 'displayname', 'display name') || '';

    let firstName = getValue('firstname', 'first name', 'givenname', 'given name');
    let lastName = getValue('lastname', 'last name', 'surname', 'familyname', 'family name');

    if (!firstName && !lastName && fullName) {
      const parts = fullName.split(' ').filter(Boolean);
      firstName = parts[0] || '';
      lastName = parts.slice(1).join(' ');
    }

    return {
      name: firstName || '',
      surname: lastName || '',
      company: getValue('company', 'companyname', 'organization', 'business'),
      mobile: getValue('mobile', 'phone', 'mobilephone', 'cellphone', 'cell', 'primaryphone'),
      tel: getValue('tel', 'telephone', 'workphone', 'businessphone'),
      email: getValue('email', 'emailaddress', 'e-mail'),
      website: getValue('website', 'web', 'url'),
      address: getValue('address', 'location', 'streetaddress'),
      projects: [],
    };
  };

  const handleImportedContact = (
    imported: Partial<ContactItem>,
    fileName: string,
    option: ImportOption
  ) => {
    setEditingContact(null);
    setIsImportedContact(true);
    setImportedFileName(fileName);
    setImportError('');
    setErrors({});
    setSelectedImportOption(option);
    setForm({
      ...emptyForm,
      ...imported,
      source: importOptionMeta[option].suggestedSource,
      status: 'Prospect',
      projects: [],
    });
    setDialogOpen(true);
  };

  const handleChooseImportOption = (option: ImportOption) => {
    setSelectedImportOption(option);
    setImportOptionsOpen(false);
    fileInputRef.current?.click();
  };

  const handleImportFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const isSupported =
      file.name.toLowerCase().endsWith('.csv') ||
      file.name.toLowerCase().endsWith('.txt') ||
      file.type === 'text/csv' ||
      file.type === 'text/plain' ||
      file.type === 'application/vnd.ms-excel';

    if (!isSupported) {
      setImportError('Please import a CSV or TXT file exported from Google Contacts, Gmail, Outlook, or Notepad.');
      event.target.value = '';
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      try {
        const text = String(reader.result || '');
        const imported = extractImportedContact(text);

        if (!imported) {
          setImportError('The file could not be read. Make sure the file contains at least one contact row.');
          return;
        }

        handleImportedContact(imported, file.name, selectedImportOption || 'notepad');
      } catch {
        setImportError('Failed to read the imported contact file.');
      }
    };

    reader.onerror = () => {
      setImportError('Failed to read the imported contact file.');
    };

    reader.readAsText(file);
    event.target.value = '';
  };

  useEffect(() => {
    return () => {
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, []);

  return (
    <Box>
      <TopBar
        title="Contacts"
        subtitle="Manage contact listings, addresses, lead sources, and linked client projects from one place."
      />

      <Box sx={{ p: 3 }}>
        <Card
          sx={{
            mb: 3,
            borderRadius: 3,
            boxShadow: '0 8px 24px rgba(15, 23, 42, 0.06)',
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Stack
              direction={{ xs: 'column', md: 'row' }}
              justifyContent="space-between"
              alignItems={{ xs: 'flex-start', md: 'center' }}
              spacing={2}
            >
              <Box>
                <Typography variant="h5" fontWeight={700} sx={{ color: '#0F172A', mb: 1 }}>
                  Contact Management
                </Typography>

                <Typography variant="body2" sx={{ color: '#64748B', maxWidth: 860 }}>
                  Store and manage prospects, leads, clients, suppliers, employees, partners, and workers in one
                  structured CRM view. Track contact details, source, relationship type, and project connections.
                </Typography>
              </Box>

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".csv,.txt"
                  style={{ display: 'none' }}
                  onChange={handleImportFile}
                />

                <Button
                  variant="outlined"
                  startIcon={<UploadFile />}
                  onClick={() => setImportOptionsOpen(true)}
                  sx={{
                    borderColor: '#28509E',
                    color: '#28509E',
                    textTransform: 'none',
                    borderRadius: 2,
                    px: 2.5,
                    '&:hover': {
                      borderColor: '#1E3A73',
                      backgroundColor: 'rgba(40,80,158,0.05)',
                    },
                  }}
                >
                  Import Contact
                </Button>

                <Button
                  variant="contained"
                  startIcon={<Add />}
                  onClick={openAdd}
                  sx={{
                    backgroundColor: '#28509E',
                    textTransform: 'none',
                    borderRadius: 2,
                    px: 2.5,
                    '&:hover': {
                      backgroundColor: '#1E3A73',
                    },
                  }}
                >
                  Add Contact
                </Button>
              </Stack>
            </Stack>
          </CardContent>
        </Card>

        {importError && (
          <Alert severity="error" onClose={() => setImportError('')} sx={{ mb: 3, borderRadius: 2 }}>
            {importError}
          </Alert>
        )}

        <Grid container spacing={2.5} sx={{ mb: 3 }}>
          {[
            {
              label: 'Total Contacts',
              value: stats.total,
              icon: <Groups />,
              color: '#28509E',
              bg: 'rgba(40,80,158,0.10)',
            },
            {
              label: 'Prospects',
              value: stats.prospects,
              icon: <PersonAddAlt1 />,
              color: '#7C3AED',
              bg: 'rgba(124,58,237,0.10)',
            },
            {
              label: 'Leads',
              value: stats.leads,
              icon: <WorkOutline />,
              color: '#EA580C',
              bg: 'rgba(234,88,12,0.10)',
            },
            {
              label: 'Clients',
              value: stats.clients,
              icon: <Groups />,
              color: '#16A34A',
              bg: 'rgba(22,163,74,0.10)',
            },
          ].map((item) => (
            <Grid key={item.label} size={{ xs: 12, sm: 6, md: 3 }}>
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: '0 8px 24px rgba(15, 23, 42, 0.05)',
                  height: '100%',
                }}
              >
                <CardContent>
                  <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Box>
                      <Typography variant="body2" sx={{ color: '#64748B', mb: 0.5 }}>
                        {item.label}
                      </Typography>
                      <Typography variant="h4" fontWeight={700} sx={{ color: '#0F172A' }}>
                        {item.value}
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: 2,
                        backgroundColor: item.bg,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: item.color,
                      }}
                    >
                      {item.icon}
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Card
          sx={{
            mb: 3,
            borderRadius: 3,
            boxShadow: '0 8px 24px rgba(15, 23, 42, 0.05)',
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 5 }}>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Search contacts by name, company, email, mobile, or address"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search sx={{ color: '#94A3B8' }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 3.5 }}>
                <TextField
                  select
                  fullWidth
                  size="small"
                  label="Filter by Type"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <MenuItem value="">All</MenuItem>
                  {statuses.map((status) => (
                    <MenuItem key={status} value={status}>
                      {status}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid size={{ xs: 12, md: 3.5 }}>
                <TextField
                  select
                  fullWidth
                  size="small"
                  label="Filter by Source"
                  value={filterSource}
                  onChange={(e) => setFilterSource(e.target.value)}
                >
                  <MenuItem value="">All</MenuItem>
                  {sources.map((source) => (
                    <MenuItem key={source} value={source}>
                      {source}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Card
          sx={{
            borderRadius: 3,
            boxShadow: '0 8px 24px rgba(15, 23, 42, 0.05)',
            overflow: 'hidden',
          }}
        >
          <TableContainer
            component={Paper}
            elevation={0}
            sx={{
              borderRadius: 0,
              overflowX: 'auto',
            }}
          >
            <Table
              sx={{
                tableLayout: 'fixed',
                minWidth: Object.values(columnWidths).reduce((sum, width) => sum + width, 0),
              }}
            >
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell key={column.key} sx={headerCellSx(column.key)}>
                      <Box sx={{ pr: 1.5 }}>{column.label}</Box>

                      <Box
                        onMouseDown={(e) => startResize(column.key, e)}
                        sx={{
                          position: 'absolute',
                          top: 0,
                          right: 0,
                          width: '8px',
                          height: '100%',
                          cursor: 'col-resize',
                          zIndex: 2,
                          '&:hover': {
                            backgroundColor: 'rgba(40,80,158,0.15)',
                          },
                        }}
                      />
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {filtered.map((item) => (
                  <TableRow
                    key={item.id}
                    hover
                    sx={{
                      '&:last-child td': { borderBottom: 0 },
                    }}
                  >
                    <TableCell sx={bodyCellSx('name')}>
                      <Typography fontWeight={600} fontSize="0.875rem" noWrap sx={{ color: '#0F172A' }}>
                        {item.name}
                      </Typography>
                    </TableCell>

                    <TableCell sx={bodyCellSx('surname')}>{item.surname}</TableCell>
                    <TableCell sx={bodyCellSx('company')}>{item.company}</TableCell>
                    <TableCell sx={bodyCellSx('mobile')}>{item.mobile}</TableCell>
                    <TableCell sx={bodyCellSx('tel')}>{item.tel}</TableCell>
                    <TableCell sx={bodyCellSx('email')}>{item.email}</TableCell>
                    <TableCell sx={bodyCellSx('website')}>{item.website}</TableCell>
                    <TableCell sx={bodyCellSx('address')}>{item.address}</TableCell>
                    <TableCell sx={bodyCellSx('source')}>{item.source}</TableCell>

                    <TableCell sx={bodyCellSx('status')}>
                      <StatusChip status={item.status} />
                    </TableCell>

                    <TableCell sx={bodyCellSx('projects')}>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Chip
                          label={item.projects.length}
                          size="small"
                          sx={{
                            bgcolor: 'rgba(40,80,158,0.10)',
                            color: '#28509E',
                            fontWeight: 700,
                          }}
                        />
                        <Button
                          size="small"
                          variant="outlined"
                          startIcon={<Visibility />}
                          onClick={() => openProjectsDialog(item)}
                          sx={{
                            borderColor: '#28509E',
                            color: '#28509E',
                            textTransform: 'none',
                            minWidth: 'auto',
                            px: 1,
                            '&:hover': {
                              borderColor: '#1E3A73',
                              backgroundColor: 'rgba(40,80,158,0.05)',
                            },
                          }}
                        >
                          View
                        </Button>
                      </Stack>
                    </TableCell>

                    <TableCell sx={bodyCellSx('actions')} align="right">
                      <Stack direction="row" spacing={0.5} justifyContent="flex-end">
                        <IconButton
                          size="small"
                          onClick={() => openSummaryDialog(item)}
                          title="Contact Summary"
                          sx={{
                            border: '1px solid #E2E8F0',
                            borderRadius: 2,
                          }}
                        >
                          <Description fontSize="small" sx={{ color: '#28509E' }} />
                        </IconButton>

                        <IconButton
                          size="small"
                          onClick={() => openEdit(item)}
                          sx={{
                            border: '1px solid #E2E8F0',
                            borderRadius: 2,
                          }}
                        >
                          <Edit fontSize="small" />
                        </IconButton>

                        <IconButton
                          size="small"
                          onClick={() => handleDelete(item.id)}
                          sx={{
                            border: '1px solid #FECACA',
                            borderRadius: 2,
                          }}
                        >
                          <Delete fontSize="small" sx={{ color: '#EF4444' }} />
                        </IconButton>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}

                {filtered.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={12} align="center" sx={{ py: 5, color: '#64748B' }}>
                      No contacts found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>

        <Dialog open={importOptionsOpen} onClose={() => setImportOptionsOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle sx={{ fontWeight: 700 }}>Import Contact</DialogTitle>
          <DialogContent dividers>
            <Typography sx={{ mb: 2, color: '#475569' }}>
              Choose where you want to import the contact from.
            </Typography>

            <Stack spacing={1.5}>
              {(Object.keys(importOptionMeta) as ImportOption[]).map((option) => (
                <Paper
                  key={option}
                  variant="outlined"
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    borderColor: '#E2E8F0',
                  }}
                >
                  <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={2}
                    alignItems={{ xs: 'flex-start', sm: 'center' }}
                    justifyContent="space-between"
                  >
                    <Box>
                      <Typography sx={{ fontWeight: 700, color: '#0F172A' }}>
                        {importOptionMeta[option].title}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#64748B', mt: 0.5 }}>
                        {importOptionMeta[option].description}
                      </Typography>
                    </Box>

                    <Button
                      variant="outlined"
                      onClick={() => handleChooseImportOption(option)}
                      sx={{
                        borderColor: '#28509E',
                        color: '#28509E',
                        textTransform: 'none',
                        minWidth: 130,
                        '&:hover': {
                          borderColor: '#1E3A73',
                          backgroundColor: 'rgba(40,80,158,0.05)',
                        },
                      }}
                    >
                      Choose
                    </Button>
                  </Stack>
                </Paper>
              ))}
            </Stack>
          </DialogContent>
          <DialogActions sx={{ p: 2 }}>
            <Button onClick={() => setImportOptionsOpen(false)} sx={{ textTransform: 'none' }}>
              Close
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={dialogOpen}
          onClose={() => {
            setDialogOpen(false);
            setEditingContact(null);
            resetFormState();
          }}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle sx={{ fontWeight: 700 }}>
            {editingContact
              ? 'Edit Contact'
              : isImportedContact
              ? 'Complete Imported Contact'
              : 'Add Contact'}
          </DialogTitle>

          <DialogContent
            dividers
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
              gap: 2,
              pt: '16px !important',
            }}
          >
            {isImportedContact && (
              <Box sx={{ gridColumn: '1 / -1' }}>
                <Alert severity="info">
                  Imported from{' '}
                  <strong>
                    {selectedImportOption ? importOptionMeta[selectedImportOption].title : importedFileName || 'file'}
                  </strong>
                  {importedFileName ? ` (${importedFileName})` : ''}. Please complete all required fields before
                  saving this contact into the CRM.
                </Alert>
              </Box>
            )}

            <TextField
              label="Name *"
              value={form.name || ''}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              error={!!errors.name}
              helperText={errors.name}
              fullWidth
            />

            <TextField
              label="Surname *"
              value={form.surname || ''}
              onChange={(e) => setForm({ ...form, surname: e.target.value })}
              error={!!errors.surname}
              helperText={errors.surname}
              fullWidth
            />

            <TextField
              label="Company *"
              value={form.company || ''}
              onChange={(e) => setForm({ ...form, company: e.target.value })}
              error={!!errors.company}
              helperText={errors.company}
              fullWidth
            />

            <TextField
              label="Mobile *"
              value={form.mobile || ''}
              onChange={(e) => setForm({ ...form, mobile: e.target.value })}
              error={!!errors.mobile}
              helperText={errors.mobile}
              fullWidth
            />

            <TextField
              label="Tel"
              value={form.tel || ''}
              onChange={(e) => setForm({ ...form, tel: e.target.value })}
              fullWidth
            />

            <TextField
              label="Email *"
              value={form.email || ''}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              error={!!errors.email}
              helperText={errors.email}
              fullWidth
            />

            <TextField
              label="Website"
              value={form.website || ''}
              onChange={(e) => setForm({ ...form, website: e.target.value })}
              fullWidth
            />

            <TextField
              label="Address"
              value={form.address || ''}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              fullWidth
            />

            <TextField
              select
              label="Source *"
              value={form.source || 'Google'}
              onChange={(e) => setForm({ ...form, source: e.target.value as ContactSource })}
              error={!!errors.source}
              helperText={errors.source}
              fullWidth
            >
              {sources.map((source) => (
                <MenuItem key={source} value={source}>
                  {source}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              select
              label="Type *"
              value={form.status || 'Prospect'}
              onChange={(e) => setForm({ ...form, status: e.target.value as ContactStatus })}
              error={!!errors.status}
              helperText={errors.status}
              fullWidth
            >
              {statuses.map((status) => (
                <MenuItem key={status} value={status}>
                  {status}
                </MenuItem>
              ))}
            </TextField>
          </DialogContent>

          <DialogActions sx={{ px: 3, pb: 2 }}>
            <Button
              onClick={() => {
                setDialogOpen(false);
                setEditingContact(null);
                resetFormState();
              }}
              sx={{ textTransform: 'none' }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleSave}
              sx={{
                bgcolor: '#28509E',
                textTransform: 'none',
                '&:hover': { bgcolor: '#1E3A73' },
              }}
            >
              {isImportedContact ? 'Save Imported Contact' : 'Save'}
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={projectsDialogOpen} onClose={() => setProjectsDialogOpen(false)} maxWidth="md" fullWidth>
          <DialogTitle sx={{ fontWeight: 700 }}>
            {selectedContactProjects
              ? `${selectedContactProjects.name} ${selectedContactProjects.surname} - Projects`
              : 'Projects'}
          </DialogTitle>

          <DialogContent dividers>
            {selectedContactProjects?.projects.length ? (
              <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: 2 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 700 }}>Project Name</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Location</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Stage</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {selectedContactProjects.projects.map((project) => (
                      <TableRow key={project.id}>
                        <TableCell>
                          <Typography fontWeight={600} fontSize="0.875rem" sx={{ color: '#0F172A' }}>
                            {project.projectName}
                          </Typography>
                        </TableCell>
                        <TableCell>{project.location}</TableCell>
                        <TableCell>{project.stage}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <Typography color="#64748B">No projects found for this contact.</Typography>
            )}
          </DialogContent>

          <DialogActions sx={{ p: 2 }}>
            <Button onClick={() => setProjectsDialogOpen(false)} sx={{ textTransform: 'none' }}>
              Close
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={summaryDialogOpen} onClose={() => setSummaryDialogOpen(false)} maxWidth="md" fullWidth>
          <DialogTitle sx={{ fontWeight: 700 }}>
            {selectedSummaryContact
              ? `${selectedSummaryContact.name} ${selectedSummaryContact.surname} - Contact Summary`
              : 'Contact Summary'}
          </DialogTitle>

          <DialogContent dividers>
            {selectedSummaryContact && (
              <Stack spacing={3}>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: '#28509E' }}>
                    Basic Information
                  </Typography>
                  <Divider sx={{ my: 1.2 }} />
                  <Typography><strong>Name:</strong> {selectedSummaryContact.name}</Typography>
                  <Typography><strong>Surname:</strong> {selectedSummaryContact.surname}</Typography>
                  <Typography><strong>Company:</strong> {selectedSummaryContact.company}</Typography>
                  <Typography><strong>Status:</strong> {selectedSummaryContact.status}</Typography>
                  <Typography><strong>Source:</strong> {selectedSummaryContact.source}</Typography>
                </Box>

                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: '#28509E' }}>
                    Contact Details
                  </Typography>
                  <Divider sx={{ my: 1.2 }} />
                  <Typography><strong>Mobile:</strong> {selectedSummaryContact.mobile}</Typography>
                  <Typography><strong>Tel:</strong> {selectedSummaryContact.tel || '-'}</Typography>
                  <Typography><strong>Email:</strong> {selectedSummaryContact.email}</Typography>
                  <Typography><strong>Website:</strong> {selectedSummaryContact.website || '-'}</Typography>
                  <Typography><strong>Address:</strong> {selectedSummaryContact.address || '-'}</Typography>
                </Box>

                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: '#28509E' }}>
                    Projects Summary
                  </Typography>
                  <Divider sx={{ my: 1.2 }} />
                  <Typography sx={{ mb: 1.2 }}>
                    <strong>Total Projects:</strong> {selectedSummaryContact.projects.length}
                  </Typography>

                  {selectedSummaryContact.projects.length ? (
                    <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: 2 }}>
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell sx={{ fontWeight: 700 }}>Project Name</TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>Location</TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>Stage</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {selectedSummaryContact.projects.map((project) => (
                            <TableRow key={project.id}>
                              <TableCell>{project.projectName}</TableCell>
                              <TableCell>{project.location}</TableCell>
                              <TableCell>{project.stage}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  ) : (
                    <Typography color="#64748B">No projects found for this contact.</Typography>
                  )}
                </Box>
              </Stack>
            )}
          </DialogContent>

          <DialogActions sx={{ p: 2 }}>
            <Button onClick={() => setSummaryDialogOpen(false)} sx={{ textTransform: 'none' }}>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
}