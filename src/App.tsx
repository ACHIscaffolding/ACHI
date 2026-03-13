import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import theme from './theme/muiTheme';
import AppLayout from './components/layout/AppLayout';
import DashboardPage from './pages/DashboardPage';
import LeadsPage from './pages/LeadsPage';
import ClientsPage from './pages/ClientsPage';
import OpportunitiesPage from './pages/OpportunitiesPage';
import FollowUpsPage from './pages/FollowUpsPage';
import ActivitiesPage from './pages/ActivitiesPage';
import QuotationsPage from './pages/QuotationsPage';
import ReportsPage from './pages/ReportsPage';
import SettingsPage from './pages/SettingsPage';
import LoginPage from './pages/LoginPage';
import InventoryPage from './pages/InventoryPage';
import NotFound from './pages/NotFound';

const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<AppLayout />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/leads" element={<LeadsPage />} />
          <Route path="/clients" element={<ClientsPage />} />
          <Route path="/inventory" element={<InventoryPage />} />
          <Route path="/opportunities" element={<OpportunitiesPage />} />
          <Route path="/follow-ups" element={<FollowUpsPage />} />
          <Route path="/activities" element={<ActivitiesPage />} />
          <Route path="/quotations" element={<QuotationsPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </ThemeProvider>
);

export default App;