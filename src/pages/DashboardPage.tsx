import { Box, Grid, Card, CardContent, Typography } from '@mui/material';
import { People, TrendingUp, Description, CheckCircle, EventNote } from '@mui/icons-material';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import TopBar from '../components/layout/TopBar';
import StatCard from '../components/common/StatCard';
import { dashboardStats, leadsByStatus, opportunitiesByMonth, pipelineData } from '../data/dummyData';

export default function DashboardPage() {
  return (
    <Box>
      <TopBar title="Dashboard" subtitle="Welcome back, Ahmed. Here's your CRM overview." />
      <Box sx={{ p: 3 }}>
        <Grid container spacing={2.5} sx={{ mb: 3 }}>
          {[
            { title: 'Total Leads', value: dashboardStats.totalLeads, icon: <People />, color: '#28509E', trend: '+12% this month' },
            { title: 'Active Opportunities', value: dashboardStats.activeOpportunities, icon: <TrendingUp />, color: '#7C3AED' },
            { title: 'Quotations Sent', value: dashboardStats.quotationsSent, icon: <Description />, color: '#EA580C' },
            { title: 'Closed Deals', value: dashboardStats.closedDeals, icon: <CheckCircle />, color: '#16A34A' },
            { title: 'Follow Ups Today', value: dashboardStats.followUpsDueToday, icon: <EventNote />, color: '#D97706' },
          ].map((s, i) => (
            <Grid key={i} size={{ xs: 12, sm: 6, md: 2.4 }}>
              <StatCard {...s} />
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={2.5}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>Leads by Status</Typography>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie data={leadsByStatus} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={4} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
                      {leadsByStatus.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>Opportunities by Month</Typography>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={opportunitiesByMonth}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                    <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#64748B' }} />
                    <YAxis tick={{ fontSize: 12, fill: '#64748B' }} />
                    <Tooltip />
                    <Bar dataKey="value" fill="#28509E" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>Sales Pipeline</Typography>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={pipelineData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                    <XAxis type="number" tick={{ fontSize: 12, fill: '#64748B' }} />
                    <YAxis dataKey="stage" type="category" width={90} tick={{ fontSize: 11, fill: '#64748B' }} />
                    <Tooltip formatter={(val: number) => `AED ${val.toLocaleString()}`} />
                    <Bar dataKey="value" fill="#28509E" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
