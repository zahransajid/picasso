import { Button, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import DisplayCard from "./DisplayCard";

interface props {
    sourceImage: string | undefined;
    setSourceImage: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export default function SourceImageSelector(props: props) {
    const navigate = useNavigate();
    const sample_portrait = "/sample_portrait.jpg";
    const onFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length < 1)
            return console.log("No file selected !");
        // props.setSourceImage(files[0]);
        props.setSourceImage(URL.createObjectURL(files[0]));
        // setSelectImagePrompt("Image to Style Transfer");
    };

    return (
        <div
            style={{
                flex: 1,
                display: "flex",
                width: 0,
                flexDirection: "row",
            }}
        >
            <div
                style={{
                    flex: 1,
                    flexDirection: "column",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    display: "flex",
                    margin: "2em",
                    width: 0,
                }}
            >
                <Typography variant="h3" justifyContent="center">
                    Select Image <br />
                    to be Painted
                </Typography>

                <Button
                    disabled={props.sourceImage === undefined ? true : false}
                    variant="outlined"
                    size="large"
                    disableRipple
                    style={{
                        borderWidth: "thick",
                        alignSelf: "center",
                    }}
                    onClick={() => navigate("/stylize/style")}
                >
                    <Typography variant="h5">Proceed</Typography>
                </Button>
            </div>

            <div
                style={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 0,
                }}
            >
                <DisplayCard>
                    <Button
                        component="label"
                        variant="contained"
                        style={{ flex: 1, overflow: "hidden", margin: "20px" }}
                    >
                        <img
                            src={
                                props.sourceImage
                                    ? props.sourceImage
                                    : sample_portrait
                            }
                            style={{
                                height: "110%",
                            }}
                        />
                        <input type="file" hidden onChange={onFileSelected} />
                    </Button>
                </DisplayCard>
            </div>
        </div>
    );
}
