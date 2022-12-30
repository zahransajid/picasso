import { Typography } from "@mui/material";
import { width } from "@mui/system";
import React from "react";
type props = {
    children: JSX.Element;
    style?: React.CSSProperties;
};

export default function Frame(props: props) {
    return (
        <div
            style={{
                display: "flex",
                height: 0,
                margin: "40px",
                flexGrow: "1",
                flexDirection: "column",
            }}
        >
            <div
                style={{
                    display: "flex",
                    height: 0,
                    flexGrow: "1",
                    borderTop: "8px solid black",
                    borderBottom: "8px solid black",
                    borderLeft: "8px solid black",
                    borderRight: "8px solid black",
                    // width: 0
                    backgroundColor: "white",
                }}
            >
                {props.children}
            </div>

            <div
                style={{
                    marginTop: "-2em",
                    marginLeft: "10px",
                    marginRight: "80px",
                    backgroundColor: "White",
                    display: "block",
                    width: "fit-content",
                    padding: "0px 20px",
                    alignSelf: "flex-end",
                }}
            >
                <Typography variant="h3">Picasso</Typography>
            </div>
        </div>
    );
}
