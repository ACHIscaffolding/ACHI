import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  IconButton,
  Tooltip,
} from '@mui/material';
import { Logout, ChevronLeft, ChevronRight } from '@mui/icons-material';

const DEFAULT_DRAWER_WIDTH = 260;
const COLLAPSED_DRAWER_WIDTH = 72;
const MIN_DRAWER_WIDTH = 220;
const MAX_DRAWER_WIDTH = 420;

const SECONDARY_TEXT = '#64748B';
const PRIMARY_BLUE = '#28509E';
const LIGHT_BLUE_BG = 'rgba(40, 80, 158, 0.08)';
const LIGHT_BLUE_HOVER = 'rgba(40, 80, 158, 0.12)';
const BORDER_BLUE = 'rgba(40, 80, 158, 0.15)';

const TinyDiamond = ({ active = false }: { active?: boolean }) => (
  <Box
    sx={{
      width: 7,
      height: 7,
      transform: 'rotate(45deg)',
      border: active ? 'none' : `1px solid ${SECONDARY_TEXT}`,
      bgcolor: active ? PRIMARY_BLUE : 'transparent',
    }}
  />
);

const TinyRing = () => (
  <Box
    sx={{
      width: 7,
      height: 7,
      borderRadius: '50%',
      border: `1px solid ${SECONDARY_TEXT}`,
    }}
  />
);

const TinyRingDot = () => (
  <Box
    sx={{
      width: 8,
      height: 8,
      borderRadius: '50%',
      border: `1px solid ${SECONDARY_TEXT}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <Box
      sx={{
        width: 2.5,
        height: 2.5,
        borderRadius: '50%',
        bgcolor: SECONDARY_TEXT,
      }}
    />
  </Box>
);

const TinySquare = () => (
  <Box
    sx={{
      width: 7,
      height: 7,
      border: `1px solid ${SECONDARY_TEXT}`,
    }}
  />
);

const TinyStack = () => (
  <Box
    sx={{
      width: 8,
      height: 8,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    }}
  >
    <Box sx={{ height: 1, bgcolor: SECONDARY_TEXT }} />
    <Box sx={{ height: 1, bgcolor: SECONDARY_TEXT }} />
    <Box sx={{ height: 1, bgcolor: SECONDARY_TEXT }} />
  </Box>
);

const TinyFlag = () => (
  <Box
    sx={{
      width: 8,
      height: 8,
      position: 'relative',
    }}
  >
    <Box
      sx={{
        position: 'absolute',
        left: 1,
        top: 0,
        width: 1,
        height: 8,
        bgcolor: SECONDARY_TEXT,
      }}
    />
    <Box
      sx={{
        position: 'absolute',
        left: 2,
        top: 1,
        width: 4,
        height: 3,
        bgcolor: SECONDARY_TEXT,
        clipPath: 'polygon(0 0, 100% 20%, 75% 100%, 0 80%)',
      }}
    />
  </Box>
);

const navSections = [
  {
    title: 'Overview',
    items: [{ label: 'Dashboard', icon: <TinyDiamond />, path: '/' }],
  },
  {
    title: 'Commercial',
    items: [
      { label: 'CRM', icon: <TinyRingDot />, path: '/crm' },
      { label: 'Quotations', icon: <TinySquare />, path: '/quotations' },
      { label: 'Contacts', icon: <TinyRing />, path: '/contacts' },
    ],
  },
  {
    title: 'Operations',
    items: [
      { label: 'Inventory', icon: <TinyStack />, path: '/inventory' },
      { label: 'Activities', icon: <TinyRingDot />, path: '/activities' },
    ],
  },
  {
    title: 'Finance',
    items: [{ label: 'Finance', icon: <TinyDiamond />, path: '/crm/invoices' }],
  },
  {
    title: 'Compliance',
    items: [{ label: 'Reports', icon: <TinyFlag />, path: '/reports' }],
  },
  {
    title: 'System',
    items: [{ label: 'Settings', icon: <TinyDiamond />, path: '/settings' }],
  },
];

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [drawerWidth, setDrawerWidth] = useState(DEFAULT_DRAWER_WIDTH);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const effectiveWidth = isCollapsed ? COLLAPSED_DRAWER_WIDTH : drawerWidth;

  const toggleSidebar = () => {
    setIsCollapsed((prev) => !prev);
  };

  const startResize = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isCollapsed) return;

    e.preventDefault();
    e.stopPropagation();

    const startX = e.clientX;
    const startWidth = drawerWidth;

    const onMouseMove = (moveEvent: MouseEvent) => {
      const delta = moveEvent.clientX - startX;
      const nextWidth = Math.min(
        MAX_DRAWER_WIDTH,
        Math.max(MIN_DRAWER_WIDTH, startWidth + delta)
      );
      setDrawerWidth(nextWidth);
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

  useEffect(() => {
    document.documentElement.style.setProperty('--sidebar-width', `${effectiveWidth}px`);

    return () => {
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [effectiveWidth]);

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  const renderNavButton = (item: { label: string; icon: JSX.Element; path: string }) => {
    const active = isActive(item.path);

    const button = (
      <ListItemButton
        key={item.path}
        onClick={() => navigate(item.path)}
        sx={{
          minHeight: 38,
          px: isCollapsed ? 1 : 2.2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: isCollapsed ? 'center' : 'flex-start',
          borderLeft: isCollapsed
            ? '2px solid transparent'
            : active
              ? `2px solid ${PRIMARY_BLUE}`
              : '2px solid transparent',
          bgcolor: active ? LIGHT_BLUE_BG : 'transparent',
          '&:hover': {
            bgcolor: active ? LIGHT_BLUE_HOVER : 'rgba(40, 80, 158, 0.05)',
          },
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: isCollapsed ? 0 : 20,
            mr: isCollapsed ? 0 : 1,
            color: active ? PRIMARY_BLUE : SECONDARY_TEXT,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mt: '1px',
          }}
        >
          <Box
            sx={{
              color: active ? PRIMARY_BLUE : SECONDARY_TEXT,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {item.label === 'Dashboard' || item.label === 'Settings' ? (
              <TinyDiamond active={active} />
            ) : (
              item.icon
            )}
          </Box>
        </ListItemIcon>

        {!isCollapsed && (
          <ListItemText
            primary={item.label}
            sx={{ ml: 0.6 }}
            primaryTypographyProps={{
              fontFamily: "'Oxanium', sans-serif",
              fontWeight: active ? 700 : 600,
              fontSize: '0.86rem',
              letterSpacing: '0.01em',
              color: active ? PRIMARY_BLUE : SECONDARY_TEXT,
              noWrap: true,
            }}
          />
        )}
      </ListItemButton>
    );

    return isCollapsed ? (
      <Tooltip key={item.path} title={item.label} placement="right">
        {button}
      </Tooltip>
    ) : (
      button
    );
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: effectiveWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: effectiveWidth,
          boxSizing: 'border-box',
          bgcolor: '#FFFFFF',
          color: PRIMARY_BLUE,
          borderRight: `1px solid ${BORDER_BLUE}`,
          overflowX: 'hidden',
          transition: 'width 0.2s ease',
          position: 'fixed',
          top: 0,
          left: 0,
          height: '100vh',
        },
      }}
    >
      <Box
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
        }}
      >
        <Box
          sx={{
            px: isCollapsed ? 1 : 2.2,
            py: 1.7,
            borderBottom: `1px solid ${BORDER_BLUE}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: isCollapsed ? 'center' : 'space-between',
            gap: 1,
          }}
        >
          {!isCollapsed ? (
            <Box>
              <Typography
                sx={{
                  fontFamily: "'Oxanium', sans-serif",
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  lineHeight: 1.05,
                  color: PRIMARY_BLUE,
                  letterSpacing: '0.02em',
                  textTransform: 'uppercase',
                }}
              >
                ACHI SCAFFOLDING
              </Typography>

              <Typography
                sx={{
                  mt: 0.45,
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: '0.66rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: SECONDARY_TEXT,
                }}
              >
                ERP SYSTEM · V2.0
              </Typography>
            </Box>
          ) : (
            <Typography
              sx={{
                fontFamily: "'Oxanium', sans-serif",
                fontWeight: 700,
                fontSize: '0.9rem',
                color: PRIMARY_BLUE,
              }}
            >
              A
            </Typography>
          )}

          <Tooltip title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'} placement="right">
            <IconButton
              onClick={toggleSidebar}
              size="small"
              sx={{
                color: PRIMARY_BLUE,
                bgcolor: 'rgba(40, 80, 158, 0.08)',
                '&:hover': {
                  bgcolor: 'rgba(40, 80, 158, 0.15)',
                },
              }}
            >
              {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
            </IconButton>
          </Tooltip>
        </Box>

        <Box sx={{ flex: 1, overflowY: 'auto', py: 0.9 }}>
          {navSections.map((section) => (
            <Box key={section.title} sx={{ mb: 0.8 }}>
              {!isCollapsed && (
                <Typography
                  sx={{
                    px: 2.2,
                    py: 0.8,
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: '0.62rem',
                    fontWeight: 500,
                    letterSpacing: '0.16em',
                    textTransform: 'uppercase',
                    color: SECONDARY_TEXT,
                  }}
                >
                  {section.title}
                </Typography>
              )}

              <List sx={{ p: 0 }}>
                {section.items.map((item) => renderNavButton(item))}
              </List>
            </Box>
          ))}
        </Box>

        <Box sx={{ mt: 'auto', borderTop: `1px solid ${BORDER_BLUE}` }}>
          {!isCollapsed && (
            <Box sx={{ px: 2.2, py: 1.4 }}>
              <Typography
                sx={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: '0.62rem',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: SECONDARY_TEXT,
                  mb: 0.9,
                }}
              >
                System Live
              </Typography>

              <Typography
                sx={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: '0.68rem',
                  color: SECONDARY_TEXT,
                  lineHeight: 1.7,
                }}
              >
                IT 4
                <Box component="span" sx={{ mx: 2.2 }}>
                  LB 3
                </Box>
                DK 3
              </Typography>
            </Box>
          )}

          <Divider sx={{ borderColor: BORDER_BLUE }} />

          <List sx={{ p: 0 }}>
            {isCollapsed ? (
              <Tooltip title="Logout" placement="right">
                <ListItemButton
                  onClick={() => navigate('/login')}
                  sx={{
                    minHeight: 38,
                    px: 1,
                    justifyContent: 'center',
                    '&:hover': {
                      bgcolor: 'rgba(239, 68, 68, 0.06)',
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      color: '#EF4444',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      '& svg': { fontSize: 14 },
                    }}
                  >
                    <Logout />
                  </ListItemIcon>
                </ListItemButton>
              </Tooltip>
            ) : (
              <ListItemButton
                onClick={() => navigate('/login')}
                sx={{
                  minHeight: 38,
                  px: 2.2,
                  '&:hover': {
                    bgcolor: 'rgba(239, 68, 68, 0.06)',
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 20,
                    color: '#EF4444',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    '& svg': { fontSize: 14 },
                  }}
                >
                  <Logout />
                </ListItemIcon>

                <ListItemText
                  primary="Logout"
                  sx={{ ml: 0.6 }}
                  primaryTypographyProps={{
                    fontFamily: "'Oxanium', sans-serif",
                    fontWeight: 700,
                    fontSize: '0.86rem',
                    color: '#EF4444',
                    noWrap: true,
                  }}
                />
              </ListItemButton>
            )}
          </List>
        </Box>

        {!isCollapsed && (
          <Box
            onMouseDown={startResize}
            sx={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '8px',
              height: '100%',
              cursor: 'col-resize',
              zIndex: 20,
              '&:hover': {
                backgroundColor: 'rgba(40, 80, 158, 0.12)',
              },
            }}
          />
        )}
      </Box>
    </Drawer>
  );
}