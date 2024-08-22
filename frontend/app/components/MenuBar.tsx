'use client';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import { useState } from 'react';
import DarkModeSwitcher from './DarkModeSwitcher';
import AccountMenu from './AccountMenu';
import Link from 'next/link';
import NextButton from './UI/NextButton';
import { Stack } from '@mui/material';

const drawerWidth = 200;
const navItems = [
  { name: 'Workouts', href: '/account/workouts' },
  { name: 'Exercises', href: '/account/exercises' },
];

export default function MenuBar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton
              component={Link}
              href={item.href}
              sx={{ textAlign: 'center' }}
            >
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
        <Divider />
      </List>
      <Box sx={{ marginRight: '1rem' }}>
        <DarkModeSwitcher />
      </Box>
    </Box>
  );

  return (
    <>
      <AppBar color='secondary' component='nav' enableColorOnDark>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Stack
            direction='row'
            spacing={2}
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            {navItems.map((item) => (
              <NextButton key={item.name} href={item.href} color='inherit'>
                {item.name}
              </NextButton>
            ))}
          </Stack>
          <Stack direction='row' spacing={2} sx={{ alignItems: 'center' }}>
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              <DarkModeSwitcher />
            </Box>
            <AccountMenu />
          </Stack>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          variant='temporary'
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </>
  );
}
