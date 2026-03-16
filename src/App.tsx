import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { HashRouter, Route, Routes, Navigate } from 'react-router-dom';
import theme from './theme/muiTheme';
import AppLayout from './components/layout/AppLayout';
import DashboardPage from './pages/DashboardPage';
import LeadsPage from './pages/LeadsPage';
import ClientsPage from './pages/ClientsPage';
import ContactPage from './pages/ContactPage';
import OpportunitiesPage from './pages/OpportunitiesPage';
import FollowUpsPage from './pages/FollowUpsPage';
import ActivitiesPage from './pages/ActivitiesPage';
import QuotationsPage from './pages/QuotationsPage';
import ReportsPage from './pages/ReportsPage';
import SettingsPage from './pages/SettingsPage';
import LoginPage from './pages/authentication/LoginPage';
import RegisterPage from './pages/authentication/RegisterPage';
import InventoryPage from './pages/InventoryPage';
import NotFound from './pages/NotFound';

// CRM imports
import CRMPage from './pages/CRMPage';
import NewLeadPage from './pages/NewLeadPage';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetailsPage from './pages/ProjectDetailsPage';
import JobOrdersPage from './pages/JobOrdersPage';
import InvoicesPage from './pages/InvoicesPage';

const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <HashRouter>
      <Routes>
        {/* Authentication routes */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Main application routes */}
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/leads" element={<LeadsPage />} />
          <Route path="/clients" element={<ClientsPage />} />
          <Route path="/contacts" element={<ContactPage />} />
          <Route path="/inventory" element={<InventoryPage />} />
          <Route path="/opportunities" element={<OpportunitiesPage />} />
          <Route path="/follow-ups" element={<FollowUpsPage />} />
          <Route path="/activities" element={<ActivitiesPage />} />
          <Route path="/quotations" element={<QuotationsPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/settings" element={<SettingsPage />} />

          {/* CRM routes */}
          <Route path="/crm" element={<CRMPage />} />
          <Route path="/crm/new" element={<NewLeadPage />} />
          <Route path="/crm/projects" element={<ProjectsPage />} />
          <Route path="/crm/projects/:id" element={<ProjectDetailsPage />} />
          <Route path="/crm/job-orders" element={<JobOrdersPage />} />
          <Route path="/crm/invoices" element={<InvoicesPage />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </HashRouter>
  </ThemeProvider>
);

export default App;