import { Card } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React from "react";

type props = {
    children: JSX.Element;
    style?: React.CSSProperties;
};

const DisplayCard = (props: props) => {
    const theme = useTheme();
    return (
        <div
            style={{
                width: "80%",
                height: "70%",
                // backgroundColor: "rgba(0,0,0, 0.4)",
                display: "flex",
                flexDirection: "column",
                borderColor: theme.palette.primary.main,
                borderStyle: "dashed",
                borderWidth: "10px",
                overflow: "hidden",
                ...props.style,
            }}
        >
            {props.children}
        </div>
    );
};

export default DisplayCard;
