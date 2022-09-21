import { useEffect, useState } from "react";
import {
    Typography,
    Button,
    Grid,
    Box,
    Card,
    IconButton,
    CircularProgress,
    Backdrop,
} from "@mui/material";
import api from "./api";
import React from "react";
import DisplayCard from "./DisplayCard";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

import Carousel, { CarouselItem } from "./Carousel";
import { redirect, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

interface props {
    image: string | undefined;
    setImage: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export const Stylize = (props: props) => {
    const navigate = useNavigate();
    const [userImage, setUserImage] = useState("sample_portrait.jpg");
    const [userImageFile, setUserImageFile] = useState<File>();
    const [selectImagePrompt, setSelectImagePrompt] =
        useState("Select an Image");
    const [activeIndex, setActiveIndex] = useState(1);
    const [loading, setLoading] = useState(false);
    const {enqueueSnackbar, closeSnackbar} = useSnackbar();
    const [stylesInfo, setStylesInfo] = useState<
        | Array<{ id: string; title: any; file: any; description: any }>
        | undefined
    >(undefined);
    const onFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length < 1)
            return console.log("No file selected !");
        setUserImageFile(files[0]);
        setUserImage(URL.createObjectURL(files[0]));
        setSelectImagePrompt("Image to Style Transfer");
    };

    const onNextSlide = () => {
        setActiveIndex(activeIndex + 1);
    };

    const onPrevSlide = () => {
        setActiveIndex(activeIndex - 1);
    };

    const enqueueRequest = async () => {
        if (userImageFile === undefined)
            return enqueueSnackbar("Please select an image to stylize");
        setLoading(true);
        api.send_files(userImageFile!, stylesInfo![activeIndex].id).then(
            (data) => {
                setLoading(false);
                console.log(data);
                props.setImage(data);
                navigate("/result");
            }
        );
    };

    useEffect(() => {
        setLoading(true);
        api.get_styles().then((styles) => {
            setStylesInfo(styles);
            setLoading(false);
        });
    }, []);
    return (
        <Box
            sx={{
                height: "100%",
                width: "100%",
                display: "flex",
                marginTop: "5px",
                marginLeft: "5px",
            }}
        >
            <Backdrop
                sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Box
                sx={{
                    width: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flex: 1,
                }}
            >
                <DisplayCard>
                    <Box
                        sx={{
                            width: "100%",
                            display: "flex",
                            marginTop: "10px",
                            alignItems: "center",
                            justifyContent: "center",
                            flex: 1,
                        }}
                    >
                        <Button
                            component="label"
                            variant="text"
                            sx={{
                                backgroundImage: `url('${userImage}')`,
                                backgroundPosition: "center",
                                backgroundRepeat: "no-repeat",
                                backgroundSize: "cover",
                                alignItems: "flex-end",
                                width: "90%",
                                height: "90%",
                            }}
                        >
                            <Typography
                                variant="h4"
                                sx={{
                                    backgroundColor: "rgba(0,0,0, 0.4)",
                                    padding: "10px",
                                    borderRadius: "10px",
                                }}
                            >
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

            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <IconButton color="secondary" onClick={enqueueRequest}>
                    <CompareArrowsIcon
                        sx={{
                            fontSize: "3rem",
                        }}
                    />
                </IconButton>
            </Box>

            <Box
                sx={{
                    width: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <DisplayCard>
                    <Box
                        sx={{
                            width: "100%",
                            display: "flex",
                            marginTop: "10px",
                            marginBottom: "10px",
                            alignItems: "center",
                            justifyContent: "center",
                            flex: 1,
                            flexDirection: "row",
                            padding: "10px",
                            borderRadius: "4px",
                        }}
                    >
                        <IconButton
                            disabled={activeIndex == 0 ? true : false}
                            size="large"
                            color="secondary"
                            onClick={onPrevSlide}
                        >
                            <NavigateBeforeIcon
                                sx={{
                                    fontSize: "2.5rem",
                                }}
                            />
                        </IconButton>
                        <Carousel
                            activeIndex={activeIndex}
                            style={{
                                margin: "10px",
                            }}
                        >
                            {stylesInfo === undefined ? (
                                <CarouselItem
                                    key="index"
                                    style={{
                                        backgroundImage: `url('/styles/style_1.jpg')`,
                                        backgroundPosition: "center",
                                        backgroundRepeat: "no-repeat",
                                        backgroundSize: "cover",
                                        font: "Times New Roman",
                                    }}
                                />
                            ) : (
                                stylesInfo.map((style) => (
                                    <CarouselItem
                                        key={style.id}
                                        style={{
                                            backgroundImage: `url('${api.get_style_image_path(
                                                style.id
                                            )}')`,
                                            backgroundPosition: "center",
                                            backgroundRepeat: "no-repeat",
                                            backgroundSize: "cover",
                                            font: "Times New Roman",
                                        }}
                                    />
                                ))
                            )}
                        </Carousel>
                        <IconButton
                            disabled={
                                stylesInfo === undefined
                                    ? true
                                    : activeIndex == stylesInfo.length - 1
                                    ? true
                                    : false
                            }
                            size="large"
                            color="secondary"
                            onClick={onNextSlide}
                        >
                            <NavigateNextIcon
                                sx={{
                                    fontSize: "2.5rem",
                                }}
                            />
                        </IconButton>
                    </Box>
                </DisplayCard>
            </Box>
        </Box>
    );
};

export default Stylize;
