import { useTheme } from "@mui/material/styles";
import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { useNavigate, redirect } from "react-router-dom";
import DisplayCard from "./DisplayCard";
import ReplayIcon from "@mui/icons-material/Replay";
import * as tf from "@tensorflow/tfjs";

interface props {
    image: tf.Tensor<tf.Rank> | undefined;
}

export const Result = (props: props) => {
    // const url = window.URL.createObjectURL(props.image);
    const canvas = useRef<HTMLCanvasElement>(null);
    const theme = useTheme();
    const navigate = useNavigate();
    useEffect(() => {
        if (props.image === undefined) {
            navigate("/stylize");
            console.log("hit");
        } else {
            tf.browser.toPixels(props.image.as3D(props.image.shape[1]!, props.image.shape[2]!, 3), canvas.current!);
        }
    }, []);

    return (
        <Box
            sx={{
                height: "100%",
                width: "100%",
                display: "flex",
                marginTop: "5px",
                marginLeft: "5px",
                justifyContent: "space-around",
                alignItems: "center",
                flexDirection: "column",
            }}
        >
            <Typography variant="h3" color={theme.palette.secondary.main}>
                et Voilà !
            </Typography>

            <DisplayCard
                style={{
                    height: "60%",
                    width: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "10px",
                }}
            >
            <canvas 
                ref={canvas}
            />
            </DisplayCard>

            <Button
                size="large"
                variant="contained"
                startIcon={<ReplayIcon />}
                onClick={() => navigate("/stylize")}
            >
                Try Again
            </Button>
        </Box>
    );
};

export default Result;
