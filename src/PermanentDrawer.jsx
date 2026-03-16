import TodoList from './TodoList';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';



export default function PermanentDrawer(){
    return ( <>
    <Box sx={{ display: 'flex'}}>
      <AppBar elevation={8} position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography sx={{flexGrow: 1, fontWeight: 500, textAlign: "start"}} variant="h4" noWrap component="div">
            React Todos
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        
        sx={{
          width: 1/4,
          minWidth: 240,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: 1/4, minWidth: 240, boxSizing: 'border-box' },
        }}
        slotProps={{
          paper: {
            sx: {
              boxShadow: 4
            }
          }
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['All mail', 'Trash', 'Spam'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, overflow: 'auto'}}>
        <Toolbar />
        <TodoList />
      </Box>
    </Box>
    </>
  );
}






