import React from "react";
import MuiBox from "@material-ui/core/Box";
import { useTheme } from "@material-ui/core/styles";
import PropTypes from "prop-types";

export default function Box(props) {
  const {
    children,
    flexDirection = "column",
    spacing = 0,
    style,
    ...otherProps
  } = props;

  const theme = useTheme();

  const [childMargin] = React.useState(
    (() => {
      const result = {};
      let side;
      if (flexDirection === "column") {
        side = "Top";
      } else if (flexDirection === "column-reverse") {
        side = "Bottom";
      } else if (flexDirection === "row-reverse") {
        side = "Right";
      } else {
        side = "Left";
      }
      result[`margin${side}`] = theme.spacing(spacing);
      return result;
    })()
  );

  return (
    <MuiBox
      {...otherProps}
      flexDirection={flexDirection}
      style={{ ...style, display: "flex" }}
    >
      {React.Children.map(children, (child, index) => {
        if (child) {
          const style = index > 0 ? childMargin : {};
          return React.cloneElement(child, {
            style: { ...style, ...child.props.style },
          });
        } else {
          return null;
        }
      })}
    </MuiBox>
  );
}

Box.propTypes = {
  flexDirection: PropTypes.oneOf([
    "column",
    "column-reverse",
    "row",
    "row-reverse",
  ]),
  spacing: PropTypes.number,
  style: PropTypes.object,
};
