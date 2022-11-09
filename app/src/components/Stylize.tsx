import { useEffect, useRef, useState } from "react";
import {
    Typography,
    Button,
    Box,
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

// Adds the WASM backend to the global backend registry.
import "@tensorflow/tfjs-backend-wasm";
import { setWasmPaths } from "@tensorflow/tfjs-backend-wasm";

// Import @tensorflow/tfjs-core
import * as tf from "@tensorflow/tfjs-core";
// Import @tensorflow/tfjs-tflite.
import {
    GraphModel,
    loadGraphModel,
    Tensor3D,
    Tensor4D,
} from "@tensorflow/tfjs";
import { margin } from "@mui/system";
// import wasmSmidPath from "./tfjs-backend-wasm-simd.wasm";
const wasmSimdPath = require("../../node_modules/@tensorflow/tfjs-backend-wasm/dist/tfjs-backend-wasm-simd.wasm");
const wasmSimdThreadedPath = require("../../node_modules/@tensorflow/tfjs-backend-wasm/dist/tfjs-backend-wasm-threaded-simd.wasm");
const wasmPath = require("../../node_modules/@tensorflow/tfjs-backend-wasm/dist/tfjs-backend-wasm.wasm");
setWasmPaths({
    "tfjs-backend-wasm.wasm": wasmPath,
    "tfjs-backend-wasm-simd.wasm": wasmSimdPath,
    "tfjs-backend-wasm-threaded-simd.wasm": wasmSimdThreadedPath,
});

interface props {
    image: tf.Tensor<tf.Rank> | undefined;
    setImage: React.Dispatch<React.SetStateAction<tf.Tensor<tf.Rank> | undefined>>;
}

export const Stylize = (props: props) => {
    const navigate = useNavigate();
    const [userImage, setUserImage] = useState("sample_portrait.jpg");
    const [userImageFile, setUserImageFile] = useState<File>();
    const [selectImagePrompt, setSelectImagePrompt] =
        useState("Select an Image");
    const [activeIndex, setActiveIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const [stylesInfo, setStylesInfo] = useState<
        | Array<{ id: string; title: any; file: any; description: any }>
        | undefined
    >(undefined);

    const [model, setModel] = useState<GraphModel | undefined>(undefined);
    const contentImage = useRef<HTMLImageElement>(null);
    const styleImage = useRef<HTMLImageElement>(null);

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

    // const enqueueRequest = async () => {
    //     if (userImageFile === undefined)
    //         return enqueueSnackbar("Please select an image to stylize");
    //     setLoading(true);
    //     api.send_files(userImageFile!, stylesInfo![activeIndex].id).then(
    //         (data) => {
    //             setLoading(false);
    //             props.setImage(data);
    //             navigate("/result");
    //         }
    //     );
    // };

    function stylize() {
        const tensor = tf.tidy(() => {
            const style_tensor = tf.browser.fromPixels(styleImage.current!);
            const content_tensor = tf.browser.fromPixels(contentImage.current!);
            // Normalize.
            const input = tf.div(tf.expandDims(style_tensor), 255);
            const input2 = tf.div(tf.expandDims(content_tensor), 255);
            console.log(input);
            console.log(input2);

            console.log(model?.inputs);
            const outputTensor = model?.execute([input2, input]) as tf.Tensor;
            return outputTensor;
        });
        tensor.print();
        props.setImage(tensor);
        navigate("/result");
    }

    useEffect(() => {
        setLoading(true);
        tf.setBackend("wasm").then(() => {
            loadGraphModel("mobilenet/web_model/model.json").then((model) => {
                setLoading(false);
                setModel(model);
            });
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
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "justify",
                                width: "90%",
                                height: "90%",
                            }}
                        >
                            <img
                                src={userImage}
                                ref={contentImage}
                                height="auto"
                                width="100%"
                                style={{
                                    objectFit: "cover",
                                    objectPosition: "center",
                                    position: "relative",
                                    left: "50%",
                                    transform: "translateX(-50%)",
                                    zIndex: "-10",
                                }}
                            />
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
                <IconButton color="secondary" onClick={stylize}>
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
                            height: "100%",
                            display: "flex",
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
                                height: "90%",
                                overflow: "hidden",
                            }}
                        >
                            {stylesInfo === undefined ? (
                                <CarouselItem
                                    key="index"
                                    style={{
                                        height: "100%",
                                    }}
                                >
                                    <img
                                        ref={styleImage}
                                        src="/styles/style_1.jpg"
                                        width="100%"
                                        height="auto"
                                    />
                                </CarouselItem>
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
