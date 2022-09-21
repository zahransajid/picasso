import { Box, Button, Grid, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React from "react";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import { useNavigate } from "react-router-dom";
export const Landing = () => {
    const theme = useTheme();
    const navigate = useNavigate();

    return (
        <Grid
            container
            spacing={0}
            sx={{
                height: "100%",
                display: "flex",
                marginTop: "5px",
            }}
        >
            <Grid
                xs={5}
                display="flex"
                justifyContent="center"
                alignItems="center"
            >
                <Box
                    component="img"
                    sx={{
                        width: "70%",
                        height: "auto",
                    }}
                    src="art_lover.svg"
                ></Box>
            </Grid>

            <Grid
                xs={7}
                className=""
                justifyContent="center"
                alignContent="center"
                display="flex"
            >
                <Typography
                    alignSelf="center"
                    variant="h1"
                    fontWeight="200"
                    textAlign="right"
                    marginRight="20px"
                    color={theme.palette.primary.main}
                >
                    Reincarnating the art of the past with the AI of today
                </Typography>
            </Grid>

            <Grid
                xs={12}
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Button
                    size="large"
                    variant="contained"
                    startIcon={<ColorLensIcon />}
                    onClick={() => navigate("/stylize")}
                >
                    Get Started
                </Button>
            </Grid>
        </Grid>
    );
};

export default Landing;
