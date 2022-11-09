import React, { useState } from "react";
import { teal, yellow } from "@mui/material/colors";
import {
    createTheme,
    ThemeProvider,
    responsiveFontSizes,
} from "@mui/material/styles";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import { NavBar } from "./components/NavBar";
import Stylize from "./components/Stylize";
import Result from "./components/Result";
import Landing from "./components/Landing";
import Processor from "./components/processor";
import * as tf from "@tensorflow/tfjs-core";

let theme = createTheme({
    palette: {
        primary: {
            //   light: teal['A100'],
            main: yellow["A100"],
        },
        secondary: {
            main: teal["A100"],
        },
    },
    typography: {
        fontFamily: ["Roboto", '"Helvetica Neue"'].join(", "),
        h1: { fontWeight: 700 },
        h3: { fontWeight: 700 },
        h5: { fontWeight: 700 },
        h4: { fontWeight: 700 },
    },
});

theme = responsiveFontSizes(theme);

const App = () => {
    const [resultImage, setResultImage] = useState<tf.Tensor<tf.Rank> | undefined>(
        undefined
    );
    return (
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <SnackbarProvider autoHideDuration={2000}>
                    <NavBar />
                    <Routes>
                        <Route index element={<Landing />} />
                        <Route
                            path="stylize"
                            element={
                                <Stylize
                                    image={resultImage}
                                    setImage={setResultImage}
                                />
                            }
                        />
                        <Route
                            path="result"
                            element={<Result image={resultImage} />}
                        />
                        <Route 
                            path="beta"
                            element={<Processor/>}
                        />
                    </Routes>
                </SnackbarProvider>
            </ThemeProvider>
        </BrowserRouter>
    );
};

export default App;
