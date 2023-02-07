import { Box, Button, Grid, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React from "react";
import { useNavigate } from "react-router-dom";

import animated_gif from "../../public/processing.gif"
export const Landing = () => {
    console.log(animated_gif);
    
    const navigate = useNavigate();

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "row",
                flex: 1,
                width: 0,
            }}
        >
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    flex: 1,
                    margin: "20px",
                }}
            >
                <Typography variant="h1">
                    Your Photos <br />
                    Repainted.
                </Typography>

                <Button
                    variant="outlined"
                    size="large"
                    disableRipple
                    style={{
                        borderWidth: "thick",
                    }}
                    onClick={() => navigate("/stylize")}
                >
                    <Typography variant="h5">Get Started</Typography>
                </Button>
            </div>

            <div
                style={{
                    display: "flex",
                    flex: 1,
                    padding: "10px",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                }}
            >
                <img
                    src={animated_gif}
                    alt="An abstract image"
                    style={{
                        height: "100%",
                    }}
                />
            </div>
        </div>
    );
};

export default Landing;
