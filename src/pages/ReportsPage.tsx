import { Box, Grid, Card, CardContent, Typography } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Cell } from 'recharts';
import TopBar from '../components/layout/TopBar';
import { leadsPerMonth, pipelineData } from '../data/dummyData';

const conversionData = [
  { month: 'Oct', rate: 18 }, { month: 'Nov', rate: 22 }, { month: 'Dec', rate: 28 },
  { month: 'Jan', rate: 25 }, { month: 'Feb', rate: 32 }, { month: 'Mar', rate: 30 },
];

const teamActivity = [
  { name: 'Ahmed K.', calls: 24, emails: 18, meetings: 8 },
  { name: 'Mohammed S.', calls: 18, emails: 22, meetings: 6 },
  { name: 'Hassan R.', calls: 20, emails: 15, meetings: 10 },
  { name: 'Omar T.', calls: 15, emails: 20, meetings: 5 },
  { name: 'Ali M.', calls: 22, emails: 12, meetings: 7 },
];

export default function ReportsPage() {
  return (
    <Box>
      <TopBar title="Reports" subtitle="Analytics and performance insights" />
      <Box sx={{ p: 3 }}>
        <Grid container spacing={2.5}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>Leads Per Month</Typography>
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={leadsPerMonth}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                    <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#64748B' }} />
                    <YAxis tick={{ fontSize: 12, fill: '#64748B' }} />
                    <Tooltip />
                    <Bar dataKey="count" fill="#28509E" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>Conversion Rate (%)</Typography>
                <ResponsiveContainer width="100%" height={280}>
                  <LineChart data={conversionData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                    <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#64748B' }} />
                    <YAxis tick={{ fontSize: 12, fill: '#64748B' }} />
                    <Tooltip />
                    <Line type="monotone" dataKey="rate" stroke="#28509E" strokeWidth={2} dot={{ fill: '#28509E' }} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>Closed Deals Value (AED)</Typography>
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={pipelineData.filter(p => p.stage === 'Won' || p.stage === 'Lost')}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                    <XAxis dataKey="stage" tick={{ fontSize: 12, fill: '#64748B' }} />
                    <YAxis tick={{ fontSize: 12, fill: '#64748B' }} />
                    <Tooltip formatter={(val: number) => `AED ${val.toLocaleString()}`} />
                    <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                      {pipelineData.filter(p => p.stage === 'Won' || p.stage === 'Lost').map((_, i) => (
                        <Cell key={i} fill={i === 0 ? '#16A34A' : '#DC2626'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>Team Activity</Typography>
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={teamActivity}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                    <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#64748B' }} />
                    <YAxis tick={{ fontSize: 12, fill: '#64748B' }} />
                    <Tooltip />
                    <Bar dataKey="calls" fill="#28509E" stackId="a" />
                    <Bar dataKey="emails" fill="#4A72B8" stackId="a" />
                    <Bar dataKey="meetings" fill="#7C9AD4" stackId="a" radius={[4, 4, 0, 0]} />
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
