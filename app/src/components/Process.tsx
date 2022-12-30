import React, { useEffect, useRef, useState } from "react";
import * as tf from "@tensorflow/tfjs-core";
import { GraphModel, loadGraphModel } from "@tensorflow/tfjs";
// Adds the WASM backend to the global backend registry.
// import "@tensorflow/tfjs-backend-webgl";
import { setWasmPaths } from "@tensorflow/tfjs-backend-wasm";
import { Button, Typography } from "@mui/material";
import DisplayCard from "./DisplayCard";

const wasmSimdPath = require("../../node_modules/@tensorflow/tfjs-backend-wasm/dist/tfjs-backend-wasm-simd.wasm");
const wasmSimdThreadedPath = require("../../node_modules/@tensorflow/tfjs-backend-wasm/dist/tfjs-backend-wasm-threaded-simd.wasm");
const wasmPath = require("../../node_modules/@tensorflow/tfjs-backend-wasm/dist/tfjs-backend-wasm.wasm");
setWasmPaths({
    "tfjs-backend-wasm.wasm": wasmPath,
    "tfjs-backend-wasm-simd.wasm": wasmSimdPath,
    "tfjs-backend-wasm-threaded-simd.wasm": wasmSimdThreadedPath,
});

interface props {
    styleImage: string | undefined;
    sourceImage: string | undefined;
}

type STATES = "rendering" | "loading" | "approval" | "processing" | "complete";
const PROMPTS: Record<STATES, string> = {
    rendering: "Finding the palette...",
    loading: "Finding an inspiring view...",
    approval: "Begin the painting ?",
    processing: "Great things await the patient...",
    complete: "Lo and Behold !",
};

export default function Process(props: props) {
    const [currentState, setCurrentState] = useState<STATES>("rendering");
    const [model, setModel] = useState<GraphModel | undefined>(undefined);
    const canvas = useRef<HTMLCanvasElement>(null);
    const sourceImage = new Image();
    const styleImage = new Image();
    const styleImageRef = useRef<HTMLImageElement>(null);
    const sourceImageRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        let isMounted = true;
        setCurrentState("loading");
        tf.setBackend("wasm").then(() => {
            loadGraphModel("/mobilenet/web_model/model.json").then((model) => {
                if (isMounted) {
                    setModel(model);
                    setCurrentState("approval");
                    console.log("The current backend is : " + tf.getBackend());
                }
            });
        });
        console.log(
            `The source image is ${props.sourceImage} and the style image is : ${props.styleImage}`
        );
        return () => {
            isMounted = false;
        };
    }, []);

    function start () {
        setCurrentState("processing");
        setTimeout(stylize, 1000);
    }

    function stylize() {
        
        const tensor = tf.tidy(() => {
            const style_tensor = tf.browser.fromPixels(styleImageRef.current!);
            const content_tensor = tf.browser.fromPixels(
                sourceImageRef.current!
            );
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
        tf.browser.toPixels(
            tensor.as3D(tensor.shape[1]!, tensor.shape[2]!, 3),
            canvas.current!
        );
        setCurrentState("complete");
    }

    return (
        <div
            style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-evenly",
            }}
        >
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                    height: "50vh",
                    width: "100%",
                }}
            >
                <DisplayCard
                    style={{
                        height: "100%",
                        width: "50vh",
                        overflow: "hidden",
                        display: currentState == "complete" ? "none" : "block",
                        margin: '10px',
                    }}
                >
                    <img
                        hidden={currentState == "complete"}
                        ref={sourceImageRef}
                        src={props.sourceImage}
                        alt="Source Image"
                        style={{ height: "100%" }}
                    />
                </DisplayCard>
                <div
                    style={{
                        height: "100%",
                        width: "50vh",
                        overflow: "hidden",
                        display: currentState == "processing" ? "block" : "none"
                    }}
                >
                    <img
                        src="/processing.gif"
                        alt="A moving artwork"
                        style={{ height: "100%" }}
                    />
                </div>
                <DisplayCard
                    style={{
                        height: "100%",
                        width: "50vh",
                        overflow: "hidden",
                        display: currentState == "complete" ? "none" : "block", 
                    }}
                >
                    <img
                        hidden={currentState == "complete"}
                        ref={styleImageRef}
                        src={props.styleImage}
                        alt="Style Image"
                        style={{ height: "100%"}}
                    />
                </DisplayCard>

                <canvas hidden={currentState != "complete"} ref={canvas} />
            </div>

            <Button
                disabled = {currentState !== "approval"}
                variant={currentState === "approval" ? "outlined" : "text"  }
                size="large"
                disableRipple
                style={{
                    display: currentState === "approval" ? "block" : "none",
                    borderWidth: "thick",
                    alignSelf: "center",
                }}
                onClick={(start)}
            >
                <Typography variant="h5">{PROMPTS[currentState]}</Typography>
            </Button>

            <Typography
                variant="h4"
                display={currentState === "approval" ? "none" : "block"}>
                    {PROMPTS[currentState]}
            </Typography>

            <Typography
                variant="subtitle1"
                display={currentState === "complete" ? "block" : "none"}>
                    Refresh to try again !
            </Typography>
        </div>
    );
}
