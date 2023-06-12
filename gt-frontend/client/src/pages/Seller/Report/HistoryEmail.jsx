import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import './HistoryEmail.scss'
import { useState } from 'react';

import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

const HistoryEmail = () => {
  const [inbox,setInbox] = useState(true)
  const handleDetailMessage= ()=>{
    setInbox(false);
  }
  return (
    <div className='m-6 flex gap-5 h-[700px] mb-0'>
     <Box sx={{ minWidth: '16%', maxWidth: 360, bgcolor: 'background.paper' }} >
      <nav aria-label="main mailbox folders">
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={e=>setInbox(true)}>
              <ListItemIcon >
                <InboxIcon sx={{ fontSize: '18px' }}/>
              </ListItemIcon>
              <ListItemText primary="Inbox"
              primaryTypographyProps={{ sx: { fontSize: '13px' } }} 
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <DraftsIcon  sx={{ fontSize: '18px' }}/>
              </ListItemIcon>
              <ListItemText primary="Drafts" 
               primaryTypographyProps={{ sx: { fontSize: '13px' } }} 
              />
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
      <Divider />
      <nav aria-label="secondary mailbox folders">
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary="Trash" 
               primaryTypographyProps={{ sx: { fontSize: '12px' } }} 
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="#simple-list">
              <ListItemText primary="Spam" 
               primaryTypographyProps={{ sx: { fontSize: '12px' } }} 
              />
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
    </Box>
    {inbox == true ? <List sx={{ width: '100%', bgcolor: 'background.paper' }} className="flex-1">
      <ListItem alignItems="flex-start" sx={{ cursor: 'pointer' }} onClick={handleDetailMessage}>
        <ListItemAvatar  >
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary="Brunch this weekend?"
          primaryTypographyProps={{ sx: { fontSize: '15px' } }}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline', fontSize: '11px' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                Ali Connors
              </Typography>
              <Typography
                sx={{ display: 'inline', fontSize: '13px' }} // Increase the font size here
                component="span"
                variant="body2"
              >
                {" — I'll be in your neighborhood doing errands this…"}
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
 
    </List> :   <div class="bg-white p-12">
                                <div class="card-body flex-col">
                                  <div className='flex gap-4 mb-5'>
                                  <div className='h-[60px] w-[60px]'>
                                    <img className='w-full h-full rounded-full' src='https://www.clipartmax.com/png/middle/257-2572603_user-man-social-avatar-profile-icon-man-avatar-in-circle.png'></img>
                                    </div>
                                    <div class="mb-5">
                                        <div class="flex-1 align-self-center">
                                            <h4 class="font-bold m-0">Humberto D. Champion</h4>
                                            <small class="text-muted">support@domain.com</small>
                                        </div>
                                    </div>
                                  </div>

                                    <h4 class="mt-6 text-2xl leading-10 font-semibold ">This Week's Top Stories</h4>

                                    <p class="mt-6 text-2xl leading-10">Dear Lorem Ipsum,</p>
                                    <p class="mt-6 text-2xl leading-10">Praesent dui ex, dapibus eget mauris ut, finibus vestibulum enim. Quisque
                                        arcu leo, facilisis in fringilla id, luctus in tortor. Nunc vestibulum est
                                        quis orci varius viverra. Curabitur dictum volutpat massa vulputate
                                        molestie. In at felis ac velit maximus convallis.
                                    </p>
                                    <p class="mt-6 text-2xl leading-10">Sed elementum turpis eu lorem interdum, sed porttitor eros commodo. Nam eu
                                        venenatis tortor, id lacinia diam. Sed aliquam in dui et porta. Sed bibendum
                                        orci non tincidunt ultrices. Vivamus fringilla, mi lacinia dapibus
                                        condimentum, ipsum urna lacinia lacus, vel tincidunt mi nibh sit amet lorem.
                                    </p>
                                    <p class="my-6 text-2xl">Sincerly,</p>
                                    <hr />

                                    <div class="mt-6 flex gap-2">
                                        <div class="p-4 ">
                                          <div className='h-[180px] w-[270px]'>
                                                <img class="w-full h-full" src="https://duhocvietglobal.com/wp-content/uploads/2018/12/dat-nuoc-va-con-nguoi-anh-quoc.jpg" alt="Card image cap"></img>
                                            </div>
                                        </div>
                                        <div class="p-4 ">
                                          <div className='h-[180px] w-[270px]'>
                                                <img class="w-full h-full" src="https://duhocvietglobal.com/wp-content/uploads/2018/12/dat-nuoc-va-con-nguoi-anh-quoc.jpg" alt="Card image cap"></img>
                                            </div>
                                        </div>
                                    </div>
                                </div>
        </div>}
    </div>
 
  );
}

export default HistoryEmail;
