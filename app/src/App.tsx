import React from "react";
import {teal, yellow} from '@mui/material/colors';
import { createTheme, ThemeProvider, responsiveFontSizes } from '@mui/material/styles'
import { SnackbarProvider } from 'notistack';
import { Typography, Button, Grid, Box } from "@mui/material"
import { NavBar } from "./components/NavBar";

let theme = createTheme({
    palette: {
      primary: {
        //   light: teal['A100'],
          main: yellow['A100'],
        },
      secondary: {
          main: teal['A100']
        } 
    },
    typography:{
        fontFamily: ['Roboto', '"Helvetica Neue"'].join(", ") ,
        h5: {fontWeight: 500},
        h4: {fontWeight: 500}
    }
  })

theme = responsiveFontSizes(theme);

const App = () => {
    return (
            <ThemeProvider theme={theme}>
                <SnackbarProvider autoHideDuration={2000}>
                    <NavBar />                    
                        <Grid container spacing={2} sx={{
                            height:"100%",
                            display:"flex",
                            marginTop:"5px"
                        }}>

                            <Grid
                                xs={5}
                                display='flex'  
                                justifyContent='center' 
                                alignContent='center' 
                                height='100%'>
                                    <Box 
                                        component='img'
                                        sx={{
                                            width: '70%',
                                            height: 'auto',
                                        }}
                                        src="art_lover.svg">
                                            
                                    </Box>
                            </Grid>

                            <Grid xs={7}  className='' justifyContent="center" alignContent='center' display='flex'>
                                <Typography alignSelf="center" variant="h1" fontWeight='200' textAlign='right' marginRight='20px'>
                                    Reincarnating art of past with AI of today
                                </Typography>
                            </Grid>

                            <Grid xs={6}>
                                
                            </Grid>

                            <Grid xs={6}>
                                
                            </Grid>

                        </Grid>



                </SnackbarProvider>
            </ThemeProvider>
    )
};

export default App;