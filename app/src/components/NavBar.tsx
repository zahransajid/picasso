import React from "react";

import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import PaletteIcon from '@mui/icons-material/Palette';
import { ChildFriendlyOutlined } from '@mui/icons-material'
import {ThemeProvider, useTheme} from "@mui/material/styles"


export function NavBar () {
  let theme = useTheme()
  return(
        <AppBar 
          position="static"
          color="primary"
          style={{
            backgroundColor: "rgba(0,0,0, 0.4)"
          }}>
          <Toolbar>
            <Typography variant="h4" align="center" component="div" color={theme.palette.secondary.main} sx={{ flexGrow: 1 }}>
              PICASSO
            </Typography>
          </Toolbar>
        </AppBar>
    )
}