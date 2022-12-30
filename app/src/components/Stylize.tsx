import { useEffect, useState } from "react";
import { Box, CircularProgress, Backdrop } from "@mui/material";
import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import SourceImageSelector from "./SourceImageSelector";
import StyleImageSelector from "./StyleImageSelector";
import Process from "./Process";

export const Stylize = () => {
    const [sourceImage, setSourceImage] = useState<string | undefined>(
        undefined
    );
    const [styleImage, setStyleImage] = useState<string | undefined>(undefined);

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (sourceImage === undefined) navigate("/stylize/");
        else if (styleImage === undefined) navigate("/stylize/style");
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

            <Routes>
                <Route
                    index
                    element={
                        <SourceImageSelector
                            sourceImage={sourceImage}
                            setSourceImage={setSourceImage}
                        />
                    }
                />
                <Route
                    path="style"
                    element={
                        <StyleImageSelector
                            styleImage={styleImage}
                            setStyleImage={setStyleImage}
                        />
                    }
                />
                <Route
                    path="process"
                    element={
                        <Process
                            sourceImage={sourceImage}
                            styleImage={styleImage!}
                        />
                    }
                />
            </Routes>
        </Box>
    );
};

export default Stylize;
