import React, { createRef, useEffect, useRef, useState} from "react";
import {teal, yellow} from '@mui/material/colors';
import { createTheme, ThemeProvider, responsiveFontSizes } from '@mui/material/styles'
import { SnackbarProvider } from 'notistack';
import { useSnackbar } from "notistack";
import { Typography, Button, Grid, Box, Card, IconButton, CircularProgress, Backdrop } from "@mui/material";
import { NavBar } from "./components/NavBar";
import {Carousel, CarouselItem} from "./components/Carousel"
import DisplayCard from "./components/DisplayCard";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import api from "./components/api";

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
    const [userImageFile, setUserImageFile] = useState<File>();
    const [selectImagePrompt, setSelectImagePrompt] = useState("Select an Image")
    const [activeIndex, setActiveIndex] = useState(1);
    const [loading, setLoading] = useState(false);
    // const {enqueueSnackbar, closeSnackbar} = useSnackbar();
    const [stylesInfo, setStylesInfo] = useState<Array<{id: string, title: any; file: any; description: any;}> | undefined>(undefined);
    const onFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length < 1) return console.log("No file selected !");
        setUserImageFile(files[0])
        setUserImage(URL.createObjectURL(files[0]));
        setSelectImagePrompt("Image to Style Transfer")
    }

    const onNextSlide = () => {
        setActiveIndex(activeIndex+1);
    }

    const onPrevSlide = () => {
        setActiveIndex(activeIndex-1)
    }

    const enqueueRequest = async () => {
        setLoading(true);
        api.send_files(userImageFile!, stylesInfo![activeIndex].id).then((data) => {
            setLoading(false)
            console.log(data);
        })
    }

    useEffect(() => {
        setLoading(true);
        api.get_styles()
        .then((styles) => {
            setStylesInfo(styles);
            setLoading(false);
        });
    }, [])

    console.log(stylesInfo);

    return (
            <ThemeProvider theme={theme}>
                <SnackbarProvider autoHideDuration={2000}>
                    <NavBar />  
                         
                    <Backdrop
                        sx={{ color: '#fff', opacity:5, zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        open={loading}>
                        <CircularProgress color="inherit" />
                    </Backdrop>

                    <Box sx={{
                        height:"100%",
                        width:"100%",
                        display:"flex",
                        marginTop:"5px",
                        marginLeft:"5px",
                    }}>

                            <Box sx={{
                                width: "50%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flex: 1,
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
                                            alignItems: "flex-end",
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
                            </Box>
                            
                            <Box sx={{
                                display:"flex",
                                alignItems:"center",
                                justifyContent: "center"
                            }}>
                                <IconButton color="secondary" onClick={enqueueRequest}>
                                    <CompareArrowsIcon sx={{fontSize: "3rem"}}/>
                                </IconButton>
                            </Box>

                            <Box sx={{
                                width: "50%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center"
                            }}>
                                <DisplayCard>
                                    
                                    <Box sx={{
                                        width: "100%",
                                        display:"flex",
                                        marginTop:"10px",
                                        marginBottom:"10px",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        flex: 1,
                                        flexDirection: "row",
                                        padding: "10px",
                                        borderRadius: "4px"
                                    }}>
                                        <IconButton 
                                            disabled={activeIndex == 0 ? true : false}
                                            size="large"
                                            color="secondary"
                                            onClick={onPrevSlide}>
                                            <NavigateBeforeIcon sx={{fontSize:"2.5rem"}} />
                                        </IconButton>
                                        <Carousel activeIndex={activeIndex} style={{
                                            margin: "10px"
                                        }}>
                                            {stylesInfo === undefined ? 
                                                <CarouselItem
                                                    key="index"
                                                    style={{
                                                        backgroundImage: `url('/styles/style_1.jpg')`,
                                                        backgroundPosition: 'center',
                                                        backgroundRepeat:'no-repeat',
                                                        backgroundSize: 'cover',
                                                        font: "Times New Roman"
                                                    }}/> : 
                                                
                                                stylesInfo.map((style) => 
                                                    <CarouselItem
                                                        key={style.id}
                                                        style={{
                                                            backgroundImage: `url('${api.get_style_image_path(style.id)}')`,
                                                            backgroundPosition: 'center',
                                                            backgroundRepeat:'no-repeat',
                                                            backgroundSize: 'cover',
                                                            font: "Times New Roman"
                                                    }}/>
                                                )
                                            }
                                        </Carousel>
                                        <IconButton
                                            disabled={activeIndex == styles.length-1 ? true : false}
                                            size="large"
                                            color="secondary"
                                            onClick={onNextSlide}>
                                            <NavigateNextIcon sx={{fontSize:"2.5rem"}} />
                                        </IconButton>
                                        
                                    </Box>

                                </DisplayCard>
                            </Box>

                        </Box>



                </SnackbarProvider>
            </ThemeProvider>
    )
};

export default App;