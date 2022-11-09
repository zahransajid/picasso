import React, { useEffect, useRef, useState } from "react";
// Adds the CPU backend.
import "@tensorflow/tfjs-backend-cpu";
// Adds the WASM backend to the global backend registry.
import '@tensorflow/tfjs-backend-wasm';
import {setWasmPaths, setThreadsCount, getThreadsCount} from '@tensorflow/tfjs-backend-wasm';

// Import @tensorflow/tfjs-core
import * as tf from "@tensorflow/tfjs-core";
// Import @tensorflow/tfjs-tflite.
import { Button, Typography } from "@mui/material";
import { GraphModel, loadGraphModel, Tensor3D, Tensor4D } from "@tensorflow/tfjs";
// import wasmSmidPath from "./tfjs-backend-wasm-simd.wasm";
const wasmSimdPath = require("./tfjs-backend-wasm-simd.wasm")
const wasmSimdThreadedPath = require("./tfjs-backend-wasm-threaded-simd.wasm")
const wasmPath = require("./tfjs-backend-wasm.wasm")
setWasmPaths({
  'tfjs-backend-wasm.wasm': wasmPath,
  'tfjs-backend-wasm-simd.wasm': wasmSimdPath,
  'tfjs-backend-wasm-threaded-simd.wasm': wasmSimdThreadedPath
})


const Processor = () => {
    const [model, setModel] = useState<GraphModel | undefined>(undefined);

    const image = useRef<HTMLImageElement>(null);
    const style = useRef<HTMLImageElement>(null);
    const canvas = useRef<HTMLCanvasElement>(null);
    let height = 256;
    let width = 256 ;

    const loadModel = async () => {
        setModel(await loadGraphModel("mobilenet/web_model/model.json"));
    };

    async function stylize() {
        console.log(tf.getBackend());
        // tf.setBackend('wasm');
        console.log(tf.getBackend());
        const biasAddTensor = tf.tidy(() => {
            const ele = style.current!;
            // const ele = document.getElementById("image_container")?.querySelector('img')!;
            // Get pixels data.
            height = image.current!.clientWidth;
            width = image.current!.clientHeight;
            const styleImage = tf.browser.fromPixels(ele);
            const contentImage = tf.browser.fromPixels(image.current!);
            // Normalize.
            //
            // Since the images are already 224*224 that matches the model's input size,
            // tf.reshape(img, [224, 224]);
            // we don't resize them here.
            const input = tf.div(tf.expandDims(styleImage), 255);
            const input2 = tf.div(tf.expandDims(contentImage), 255);
            console.log(input2);
            
            
            // const input = tf.avgPool(temp, [3,3], [1,1], "same");
            console.log(model?.inputs);
            const outputTensor = model?.execute([input2, input]) as tf.Tensor;
            // return tf.mul(outputTensor, 255);
            return outputTensor;
        });
        
        tf.browser.toPixels(biasAddTensor.as3D(biasAddTensor.shape[1]!, biasAddTensor.shape[2]!, 3), canvas.current!);

    }

    useEffect(() => {
        // setThreadsCount();
        tf.setBackend('wasm').then(
            () => {
                console.log(tf.backend());
                loadModel();
            }
        )

        // loadModel();

    }, []);

    return (
        <div>
            {model == undefined && (
                <Typography>The model is being fetched ....</Typography>
            )}

            {model && (
                <>
                    <Typography>
                        The model is loaded is successfully !
                    </Typography>
                    <img
                        ref={image}
                        style={{
                            width: `10%`,
                            height: `auto`,
                        }}
                        crossOrigin='anonymous'
                        src="sample_portrait.jpg"
                        alt="Hi there !"
                    />

                    <img
                        ref={style}
                        style={{
                            width: `10%`,
                            height: `auto`,
                        }}
                        crossOrigin='anonymous'
                        src="styles/style_2.jpg"
                        alt="Hi there !"
                    />

                    <canvas 
                        ref={canvas}
                        style={{
                            width: `${width}px`,
                            height: `${height}px`,
                        }}
                    />

                    <Button onClick={stylize}>Click to run !</Button>
                    <Button> Test there !</Button>
                </>
            )}
        </div>
    );
};

export default Processor;
