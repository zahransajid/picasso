import React from "react";
import {teal, yellow} from '@mui/material/colors';
import { createTheme, ThemeProvider, responsiveFontSizes } from '@mui/material/styles'
import { SnackbarProvider } from 'notistack';
import { Typography, Button, Grid, Box, Card } from "@mui/material"
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
                        <Grid container spacing={10} sx={{
                            height:"100%",
                            width:"100%",
                            display:"flex",
                            marginTop:"5px",
                            marginLeft:"5px",

                        }}>

                            <Grid xs={6} sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center"
                            }}>
                                <Card sx={{
                                    width: "80%",
                                    height: "70%",
                                    backgroundColor: "rgba(0,0,0, 0.4)",
                                    display: "flex",
                                    flexDirection: "column",
                                    borderColor: theme.palette.secondary.main,
                                    borderRadius: '15px',
                                    borderStyle: 'solid',
                                    borderWidth: "2px",

                                }}>
                                    <Typography marginTop="10px" variant="h3" textAlign="center" color={theme.palette.secondary.main} >
                                        Image to Stylize
                                    </Typography>
                                    
                                    <Box sx={{
                                        width: "100%",
                                        display:"flex",
                                        marginTop: "10px",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        flex: 1,
                                    }}>
                                        <Button sx={{
                                            width: "90%",
                                            height: "90%",

                                        }}>
                                            Select your Image or Drag and Drop
                                        </Button>
                                    </Box>

                                </Card>
                            </Grid>

                            <Grid xs={6} sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center"
                            }}>
                                <Card sx={{
                                        width: "80%",
                                        height: "70%",
                                        backgroundColor: "rgba(0,0,0, 0.4)",
                                        display: "flex",
                                        flexDirection: "column",
                                        borderColor: theme.palette.secondary.main,
                                        borderRadius: '15px',
                                        borderStyle: 'solid',
                                        borderWidth: "2px",

                                    }}>
                                    <Typography marginTop="10px" variant="h3" textAlign="center" color={theme.palette.secondary.main} >
                                        Image Style to Transfer
                                    </Typography>
                                    
                                    <Box sx={{
                                        width: "100%",
                                        display:"flex",
                                        marginTop: "10px",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        flex: 1,
                                    }}>
                                        <Button sx={{
                                            width: "90%",
                                            height: "90%",

                                        }}>
                                            Select your Image or Drag and Drop
                                        </Button>
                                    </Box>

                                </Card>
                            </Grid>

                        </Grid>



                </SnackbarProvider>
            </ThemeProvider>
    )
};

export default App;