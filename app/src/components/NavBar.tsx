import React from "react";

import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import PaletteIcon from '@mui/icons-material/Palette';
import { ChildFriendlyOutlined } from '@mui/icons-material'


export function NavBar () {
  
  return(
        <AppBar 
          position="static"
          color="primary">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
            <PaletteIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Picasso 
            </Typography>
          </Toolbar>
        </AppBar>
    )
}