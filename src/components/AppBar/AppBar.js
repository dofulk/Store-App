import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HubIcon from '@mui/icons-material/Hub';
import { Badge } from '@mui/material';


export default function CustomAppBar() {


  const cartCount = useSelector((state) => {
    let numberOfItems = 0
    for (let item in state.cart.items) {

      numberOfItems += state.cart.items[item].quantity
    }
    return numberOfItems
  }
  )

  let navigate = useNavigate()


  return (
    <div style={{ flexGrow: 1, height: '100vh' }}>
      <AppBar position="static" sx={{ backgroundColor: 'background.default' }}>
        <Toolbar sx={{ width: '70%', alignSelf: 'center' }}>

          <HubIcon onClick={() => navigate('/')} sx={{ cursor: 'pointer' }} />
          <div style={{ flexGrow: '1' }}>
            <Typography variant="text" color="inherit" onClick={() => navigate('/Store')} sx={{ cursor: 'pointer' }}>FitHub</Typography>
          </div>
          <IconButton color="inherit" onClick={() => navigate('/Cart')} sx={{ right: '10px' }}>
            <Badge badgeContent={cartCount} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box className='app_body' sx={{
        backgroundColor: 'background.default',
        minHeight: '95%'
      }}>
        <Outlet/>
      </Box>
    </div >
  );
}