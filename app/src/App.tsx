import React, { createRef, useRef, useState} from "react";
import {teal, yellow} from '@mui/material/colors';
import { createTheme, ThemeProvider, responsiveFontSizes } from '@mui/material/styles'
import { SnackbarProvider } from 'notistack';
import { useSnackbar } from "notistack";
import { Typography, Button, Grid, Box, Card, IconButton } from "@mui/material";
import { NavBar } from "./components/NavBar";
import {Carousel, CarouselItem} from "./components/Carousel"
import DisplayCard from "./components/DisplayCard";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

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
        fontFamily: ['Cabin Sketch', 'Roboto', '"Helvetica Neue"'].join(", "),
        h3: {fontWeight: 700},
        h5: {fontWeight: 700},
        h4: {fontWeight: 700}
    }
  })

theme = responsiveFontSizes(theme);

const App = () => {
    const styles : string[] = ["style_1.jpg", "style_2.jpg", "style_3.jpg", "style_4.jpg"]
    const [userImage, setUserImage] = useState("sample_portrait.jpg");
    const [selectImagePrompt, setSelectImagePrompt] = useState("Select an Image")
    const [activeIndex, setActiveIndex] = useState(0);
    // const {enqueueSnackbar, closeSnackbar} = useSnackbar();
    const onFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length < 1) return console.log("No file selected !");
        setUserImage(URL.createObjectURL(files[0]));
        setSelectImagePrompt("Image to Style Transfer")
    }

    const onNextSlide = () => {
        setActiveIndex(activeIndex+1);
    }

    const onPrevSlide = () => {
        setActiveIndex(activeIndex-1)
    }
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
                                <DisplayCard>
                                    <Box sx={{
                                        width: "100%",
                                        display:"flex",
                                        marginTop: "10px",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        flex: 1,
                                    }}>
                                        
                                        <Button     
                                        component="label"
                                        variant="text"
                                        sx={{
                                            backgroundImage: `url('${userImage}')`,
                                            backgroundPosition: 'center',
                                            backgroundRepeat:'no-repeat',
                                            backgroundSize: 'cover',
                                            width: "90%",
                                            height: "90%"
                                        }}>
                                            <Typography variant="h4" sx={{
                                                backgroundColor: "rgba(0,0,0, 0.4)",
                                                padding: "10px",
                                                borderRadius: "10px"
                                            }}>
                                                {selectImagePrompt}
                                            </Typography>
                                            <input
                                                type="file"
                                                hidden
                                                onChange={onFileSelected}
                                            />
                                        </Button>
                                    </Box>

                                </DisplayCard>
                            </Grid>

                            <Grid xs={6} sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center"
                            }}>
                                <DisplayCard>
                                    
                                    <Box sx={{
                                        width: "100%",
                                        display:"flex",
                                        marginTop: "10px",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        flex: 1,
                                        flexDirection: "row",
                                        padding: "10px",
                                    }}>
                                        <IconButton 
                                            disabled={activeIndex == 0 ? true : false}
                                            size="large"
                                            color="secondary"
                                            onClick={onPrevSlide}>
                                            <NavigateBeforeIcon sx={{fontSize:"3rem"}} />
                                        </IconButton>
                                        <Carousel activeIndex={activeIndex} style={{
                                            margin: "10px"
                                        }}>
                                            {
                                            styles.map((file) => 
                                                <CarouselItem
                                                key={file}
                                                style={{
                                                    backgroundImage: `url('/styles/${file}')`,
                                                    backgroundPosition: 'center',
                                                    backgroundRepeat:'no-repeat',
                                                    backgroundSize: 'cover',
                                                    font: "Times New Roman"
                                                }}>
                                                    <Typography>
                                                        The is the first slide ...
                                                    </Typography>
                                                </CarouselItem>
                                            )
                                            }
                                        </Carousel>
                                        <IconButton
                                            disabled={activeIndex == styles.length-1 ? true : false}
                                            size="large"
                                            color="secondary"
                                            onClick={onNextSlide}>
                                            <NavigateNextIcon sx={{fontSize:"3rem"}} />
                                        </IconButton>
                                        
                                    </Box>

                                </DisplayCard>
                            </Grid>

                        </Grid>



                </SnackbarProvider>
            </ThemeProvider>
    )
};

export default App;