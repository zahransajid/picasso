import React, { useState } from "react";
import { grey } from "@mui/material/colors";
import {
    createTheme,
    ThemeProvider,
    responsiveFontSizes,
} from "@mui/material/styles";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Stylize from "./components/Stylize";
import Landing from "./components/Landing";
import Frame from "./components/Frame";

let theme = createTheme({
    palette: {
        primary: {
            //   light: teal['A100'],
            main: grey["900"],
        },
        secondary: {
            main: grey["100"],
        },
    },
    typography: {
        fontFamily: ["Goblin One", "Roboto", '"Helvetica Neue"'].join(", "),
        h1: { fontWeight: 700 },
        h3: { fontWeight: 700 },
        h5: { fontWeight: 700 },
        h4: { fontWeight: 700 },
    },
});

theme = responsiveFontSizes(theme);

const App = () => {
    return (
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <Frame>
                    <Routes>
                        <Route index element={<Landing />} />
                        <Route path="stylize/*" element={<Stylize />} />
                    </Routes>
                </Frame>
            </ThemeProvider>
        </BrowserRouter>
    );
};

export default App;
