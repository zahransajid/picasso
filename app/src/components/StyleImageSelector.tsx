import { Button, ImageList, ImageListItem, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import styles from "./Styles";

interface props {
    styleImage: string | undefined;
    setStyleImage: React.Dispatch<
        React.SetStateAction<string | undefined>
    >;
}

// const styles = [
//     "style_1.jpg",
//     "style_2.jpg",
//     "style_3.jpg",
//     "style_4.jpg",
//     "style_6.jpg",
//     "style_7.jpg",
//     "style_8.jpg",
//     "style_9.jpg",
// ];

const STYLE_IMAGES_ROOT = "/styles/";

export default function StyleImageSelector(props: props) {
    const [selectedStyle, setSelectedStyle] = useState<number | undefined>();
    const navigate = useNavigate();

    const onSelectStyle = (counter : number) => {
        setSelectedStyle(counter);
        props.setStyleImage(styles[counter])
    }
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
                <Typography variant="h3" textAlign="center">
                    Select the Image
                    <br />
                    Style
                </Typography>

                <Button
                    disabled={props.styleImage === undefined}
                    variant="outlined"
                    size="large"
                    disableRipple
                    style={{
                        borderWidth: "thick",
                        alignSelf: "center",
                    }}
                    onClick={() => navigate("/stylize/process")}
                >
                    <Typography variant="h5">Repaint</Typography>
                </Button>
            </div>

            <div
                style={{
                    flex: 1,
                    width: 0,
                    overflow: "scroll",
                    marginBottom: "20px",
                }}
            >
                <ImageList variant="masonry" cols={2} gap={8}>
                    {styles.map((img, i) => (
                        <ImageListItem key={i}>
                            <Button
                                onClick={() => onSelectStyle(i)}
                                style={{
                                    backgroundColor: selectedStyle === i ? "black" : "white",
                                    border: "5px solid black",
                                    display: "block",
                                    height: "100%",
                                    width: "100%",
                                    padding: "10px",
                                    boxSizing: "border-box",
                                }}
                            >
                                <img
                                    src={img}
                                    loading="lazy"
                                    style={{
                                        display: "block",
                                        height:"100%",
                                        width: "100%",
                                    }}/>
                            </Button>
                        </ImageListItem>
                    ))}
                </ImageList>
            </div>
        </div>
    );
}
