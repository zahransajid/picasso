import React from "react";
import {teal, yellow} from '@mui/material/colors';
import { createTheme, ThemeProvider, responsiveFontSizes } from '@mui/material/styles'
import { SnackbarProvider } from 'notistack';
import { Typography, Button } from "@mui/material"
import { NavBar } from "./components/NavBar";

let theme = createTheme({
    palette: {
      primary: {
        //   light: teal['A100'],
          main : yellow['A100'],
        },
      secondary: {
          main : teal['A100']
        } 
    },
    typography:{
        fontFamily : ['Roboto', '"Helvetica Neue"'].join(", ") ,
        h5: { fontWeight : 500 }
    }
  })

// theme = responsiveFontSizes(theme);

const App = () => {
    return (
            <ThemeProvider theme={theme}>
                <SnackbarProvider autoHideDuration={2000}>
                    <NavBar />
                    <Typography variant="h5">
                        Salut La Mode 
                    </Typography>
                    <Button
                        variant="contained"
                        component="label"
                        >
                            <input type="file" />
                            Upload File
                    </Button>

                </SnackbarProvider>
            </ThemeProvider>
    )
};

export default App;