export interface Lead {
  id: number;
  companyName: string;
  contactPerson: string;
  phone: string;
  email: string;
  status: 'New' | 'Contacted' | 'Qualified' | 'Unqualified';
  assignedTo: string;
  nextFollowUp: string;
  notes: string;
}

export interface Client {
  id: number;
  companyName: string;
  contactPerson: string;
  phone: string;
  email: string;
  projectLocation: string;
  notes: string;
}

export interface Opportunity {
  id: number;
  clientName: string;
  projectName: string;
  value: number;
  stage: 'Initial Inquiry' | 'Site Visit' | 'Proposal Sent' | 'Negotiation' | 'Won' | 'Lost';
  assignedTo: string;
  expectedClose: string;
  notes: string;
}

export interface FollowUp {
  id: number;
  clientName: string;
  activityType: 'Call' | 'Email' | 'Meeting' | 'Site Visit';
  dueDate: string;
  assignedTo: string;
  status: 'Pending' | 'Completed' | 'Overdue';
  notes: string;
}

export interface Activity {
  id: number;
  clientName: string;
  activityType: 'Phone Call' | 'Email' | 'Meeting' | 'Site Visit';
  date: string;
  employee: string;
  notes: string;
}

export interface Quotation {
  id: number;
  clientName: string;
  projectName: string;
  value: number;
  dateSent: string;
  status: 'Pending' | 'Accepted' | 'Rejected';
}

const employees = ['Ahmed K.', 'Mohammed S.', 'Hassan R.', 'Omar T.', 'Ali M.'];

export const leads: Lead[] = [
  { id: 1, companyName: 'Al Futtaim Construction', contactPerson: 'Khalid Ahmed', phone: '+971 50 123 4567', email: 'khalid@alfuttaim.ae', status: 'New', assignedTo: employees[0], nextFollowUp: '2026-03-15', notes: 'Interested in scaffolding for new tower project' },
  { id: 2, companyName: 'Drake & Scull', contactPerson: 'Sara Mohamed', phone: '+971 55 234 5678', email: 'sara@drakescull.com', status: 'Contacted', assignedTo: employees[1], nextFollowUp: '2026-03-18', notes: 'Requested quotation for warehouse project' },
  { id: 3, companyName: 'Arabtec Holdings', contactPerson: 'Nasser Ali', phone: '+971 52 345 6789', email: 'nasser@arabtec.com', status: 'Qualified', assignedTo: employees[2], nextFollowUp: '2026-03-20', notes: 'Large commercial building, high potential' },
  { id: 4, companyName: 'Emaar Properties', contactPerson: 'Fatima Hassan', phone: '+971 56 456 7890', email: 'fatima@emaar.com', status: 'New', assignedTo: employees[3], nextFollowUp: '2026-03-14', notes: 'Mall renovation scaffolding inquiry' },
  { id: 5, companyName: 'DAMAC Properties', contactPerson: 'Yousef Karim', phone: '+971 54 567 8901', email: 'yousef@damac.com', status: 'Contacted', assignedTo: employees[4], nextFollowUp: '2026-03-22', notes: 'Multiple villa project scaffolding needs' },
  { id: 6, companyName: 'Nakheel PJSC', contactPerson: 'Reem Sultan', phone: '+971 50 678 9012', email: 'reem@nakheel.ae', status: 'Qualified', assignedTo: employees[0], nextFollowUp: '2026-03-16', notes: 'Palm Jumeirah maintenance scaffolding' },
  { id: 7, companyName: 'Meraas Holding', contactPerson: 'Omar Rashid', phone: '+971 55 789 0123', email: 'omar@meraas.ae', status: 'Unqualified', assignedTo: employees[1], nextFollowUp: '2026-03-25', notes: 'Budget too low for project scope' },
  { id: 8, companyName: 'Aldar Properties', contactPerson: 'Layla Mahmoud', phone: '+971 52 890 1234', email: 'layla@aldar.com', status: 'New', assignedTo: employees[2], nextFollowUp: '2026-03-13', notes: 'New residential tower in Abu Dhabi' },
];

export const clients: Client[] = [
  { id: 1, companyName: 'Al Habtoor Group', contactPerson: 'Mansoor Al Habtoor', phone: '+971 50 111 2222', email: 'mansoor@habtoor.com', projectLocation: 'Dubai Marina', notes: 'Long-term client, multiple projects' },
  { id: 2, companyName: 'Bin Laden Group', contactPerson: 'Tariq Saeed', phone: '+971 55 333 4444', email: 'tariq@binladen.com', projectLocation: 'Jeddah, KSA', notes: 'Annual scaffolding contract' },
  { id: 3, companyName: 'Saudi Oger', contactPerson: 'Adel Rahman', phone: '+966 50 555 6666', email: 'adel@saudioger.com', projectLocation: 'Riyadh, KSA', notes: 'Government building projects' },
  { id: 4, companyName: 'ACC Construction', contactPerson: 'Jamal Nouri', phone: '+971 56 777 8888', email: 'jamal@acc.ae', projectLocation: 'Abu Dhabi', notes: 'Industrial zone scaffolding' },
  { id: 5, companyName: 'Consolidated Contractors', contactPerson: 'Hani Khoury', phone: '+971 54 999 0000', email: 'hani@ccc.net', projectLocation: 'Sharjah', notes: 'Hospital construction project' },
];

export const opportunities: Opportunity[] = [
  { id: 1, clientName: 'Al Futtaim Construction', projectName: 'Marina Tower Scaffolding', value: 450000, stage: 'Proposal Sent', assignedTo: employees[0], expectedClose: '2026-04-15', notes: 'High-rise 45 floors' },
  { id: 2, clientName: 'Emaar Properties', projectName: 'Mall Renovation Phase 2', value: 280000, stage: 'Site Visit', assignedTo: employees[1], expectedClose: '2026-05-01', notes: 'Interior and exterior scaffolding' },
  { id: 3, clientName: 'Arabtec Holdings', projectName: 'Commercial Complex', value: 620000, stage: 'Negotiation', assignedTo: employees[2], expectedClose: '2026-03-30', notes: 'Final pricing discussion' },
  { id: 4, clientName: 'DAMAC Properties', projectName: 'Villa Community Access', value: 180000, stage: 'Initial Inquiry', assignedTo: employees[3], expectedClose: '2026-06-15', notes: '20 villas scaffolding' },
  { id: 5, clientName: 'Nakheel PJSC', projectName: 'Palm Tower Maintenance', value: 350000, stage: 'Won', assignedTo: employees[4], expectedClose: '2026-03-10', notes: 'Contract signed' },
  { id: 6, clientName: 'Meraas Holding', projectName: 'Bluewaters Phase 3', value: 520000, stage: 'Proposal Sent', assignedTo: employees[0], expectedClose: '2026-04-20', notes: 'Awaiting approval' },
  { id: 7, clientName: 'Aldar Properties', projectName: 'Yas Island Project', value: 390000, stage: 'Lost', assignedTo: employees[1], expectedClose: '2026-03-05', notes: 'Competitor won bid' },
  { id: 8, clientName: 'Al Habtoor Group', projectName: 'Hotel Renovation', value: 210000, stage: 'Won', assignedTo: employees[2], expectedClose: '2026-02-28', notes: 'Project started' },
];

export const followUps: FollowUp[] = [
  { id: 1, clientName: 'Al Futtaim Construction', activityType: 'Call', dueDate: '2026-03-12', assignedTo: employees[0], status: 'Pending', notes: 'Discuss pricing revisions' },
  { id: 2, clientName: 'Emaar Properties', activityType: 'Meeting', dueDate: '2026-03-12', assignedTo: employees[1], status: 'Pending', notes: 'Site visit scheduled' },
  { id: 3, clientName: 'Arabtec Holdings', activityType: 'Email', dueDate: '2026-03-11', assignedTo: employees[2], status: 'Overdue', notes: 'Send updated proposal' },
  { id: 4, clientName: 'DAMAC Properties', activityType: 'Call', dueDate: '2026-03-14', assignedTo: employees[3], status: 'Pending', notes: 'Initial requirements gathering' },
  { id: 5, clientName: 'Nakheel PJSC', activityType: 'Site Visit', dueDate: '2026-03-10', assignedTo: employees[4], status: 'Completed', notes: 'Site inspection done' },
  { id: 6, clientName: 'Meraas Holding', activityType: 'Email', dueDate: '2026-03-13', assignedTo: employees[0], status: 'Pending', notes: 'Follow up on proposal status' },
];

export const activities: Activity[] = [
  { id: 1, clientName: 'Al Habtoor Group', activityType: 'Meeting', date: '2026-03-10', employee: employees[0], notes: 'Discussed Q2 scaffolding needs' },
  { id: 2, clientName: 'Nakheel PJSC', activityType: 'Site Visit', date: '2026-03-10', employee: employees[4], notes: 'Inspected Palm Tower structure' },
  { id: 3, clientName: 'Arabtec Holdings', activityType: 'Phone Call', date: '2026-03-09', employee: employees[2], notes: 'Negotiated pricing for commercial complex' },
  { id: 4, clientName: 'Emaar Properties', activityType: 'Email', date: '2026-03-08', employee: employees[1], notes: 'Sent preliminary quotation' },
  { id: 5, clientName: 'Al Futtaim Construction', activityType: 'Phone Call', date: '2026-03-07', employee: employees[0], notes: 'Confirmed site visit schedule' },
  { id: 6, clientName: 'DAMAC Properties', activityType: 'Meeting', date: '2026-03-06', employee: employees[3], notes: 'Initial project discussion' },
  { id: 7, clientName: 'Consolidated Contractors', activityType: 'Site Visit', date: '2026-03-05', employee: employees[2], notes: 'Hospital site scaffolding assessment' },
  { id: 8, clientName: 'Saudi Oger', activityType: 'Email', date: '2026-03-04', employee: employees[1], notes: 'Contract renewal discussion' },
];

export const quotations: Quotation[] = [
  { id: 1, clientName: 'Al Futtaim Construction', projectName: 'Marina Tower Scaffolding', value: 450000, dateSent: '2026-03-05', status: 'Pending' },
  { id: 2, clientName: 'Arabtec Holdings', projectName: 'Commercial Complex', value: 620000, dateSent: '2026-02-28', status: 'Pending' },
  { id: 3, clientName: 'Nakheel PJSC', projectName: 'Palm Tower Maintenance', value: 350000, dateSent: '2026-02-20', status: 'Accepted' },
  { id: 4, clientName: 'Meraas Holding', projectName: 'Bluewaters Phase 3', value: 520000, dateSent: '2026-03-01', status: 'Pending' },
  { id: 5, clientName: 'Aldar Properties', projectName: 'Yas Island Project', value: 390000, dateSent: '2026-02-15', status: 'Rejected' },
  { id: 6, clientName: 'Al Habtoor Group', projectName: 'Hotel Renovation', value: 210000, dateSent: '2026-02-10', status: 'Accepted' },
  { id: 7, clientName: 'Emaar Properties', projectName: 'Mall Renovation Phase 2', value: 280000, dateSent: '2026-03-08', status: 'Pending' },
];

export const dashboardStats = {
  totalLeads: leads.length,
  activeOpportunities: opportunities.filter(o => !['Won', 'Lost'].includes(o.stage)).length,
  quotationsSent: quotations.length,
  closedDeals: opportunities.filter(o => o.stage === 'Won').length,
  followUpsDueToday: followUps.filter(f => f.dueDate === '2026-03-12' && f.status === 'Pending').length,
};

export const leadsByStatus = [
  { name: 'New', value: leads.filter(l => l.status === 'New').length, color: '#0EA5E9' },
  { name: 'Contacted', value: leads.filter(l => l.status === 'Contacted').length, color: '#F59E0B' },
  { name: 'Qualified', value: leads.filter(l => l.status === 'Qualified').length, color: '#22C55E' },
  { name: 'Unqualified', value: leads.filter(l => l.status === 'Unqualified').length, color: '#EF4444' },
];

export const opportunitiesByMonth = [
  { month: 'Oct', value: 3 },
  { month: 'Nov', value: 5 },
  { month: 'Dec', value: 4 },
  { month: 'Jan', value: 6 },
  { month: 'Feb', value: 8 },
  { month: 'Mar', value: 5 },
];

export const pipelineData = [
  { stage: 'Initial Inquiry', count: opportunities.filter(o => o.stage === 'Initial Inquiry').length, value: opportunities.filter(o => o.stage === 'Initial Inquiry').reduce((s, o) => s + o.value, 0) },
  { stage: 'Site Visit', count: opportunities.filter(o => o.stage === 'Site Visit').length, value: opportunities.filter(o => o.stage === 'Site Visit').reduce((s, o) => s + o.value, 0) },
  { stage: 'Proposal Sent', count: opportunities.filter(o => o.stage === 'Proposal Sent').length, value: opportunities.filter(o => o.stage === 'Proposal Sent').reduce((s, o) => s + o.value, 0) },
  { stage: 'Negotiation', count: opportunities.filter(o => o.stage === 'Negotiation').length, value: opportunities.filter(o => o.stage === 'Negotiation').reduce((s, o) => s + o.value, 0) },
  { stage: 'Won', count: opportunities.filter(o => o.stage === 'Won').length, value: opportunities.filter(o => o.stage === 'Won').reduce((s, o) => s + o.value, 0) },
  { stage: 'Lost', count: opportunities.filter(o => o.stage === 'Lost').length, value: opportunities.filter(o => o.stage === 'Lost').reduce((s, o) => s + o.value, 0) },
];

export const leadsPerMonth = [
  { month: 'Oct', count: 4 },
  { month: 'Nov', count: 6 },
  { month: 'Dec', count: 3 },
  { month: 'Jan', count: 7 },
  { month: 'Feb', count: 5 },
  { month: 'Mar', count: 8 },
];
