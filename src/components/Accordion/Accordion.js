import ButtonBase from "@material-ui/core/ButtonBase";
import Collapse from "@material-ui/core/Collapse";
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PropTypes from "prop-types";
import React from "react";

export default function Accordion(props) {
  const {
    children,
    dividers = false,
    expanded,
    featuredContent,
    onChange,
    title,
    ...otherProps
  } = props;

  const classes = useStyles();

  return (
    <Paper variant="outlined" {...otherProps}>
      {/* Title */}
      <ButtonBase
        className={classes.titleContainer}
        focusRipple
        onClick={(event) => onChange(event, !expanded)}
      >
        {title ? (
          <Typography className={classes.title} color="textSecondary">
            {title}
          </Typography>
        ) : null}
        {expanded ? (
          <ExpandLessIcon className={classes.titleIcon} />
        ) : (
          <ExpandMoreIcon className={classes.titleIcon} />
        )}
      </ButtonBase>

      {/* Featured content */}
      {featuredContent ? (
        <>
          {dividers ? <Divider /> : null}
          {featuredContent}
        </>
      ) : null}

      {/* Other content */}
      <Collapse in={expanded}>
        {dividers && !featuredContent ? <Divider /> : null}
        {children}
      </Collapse>
    </Paper>
  );
}

Accordion.propTypes = {
  dividers: PropTypes.bool,
  expanded: PropTypes.bool.isRequired,
  featuredContent: PropTypes.node,
  onChange: PropTypes.func.isRequired,
  title: PropTypes.string,
};

const useStyles = makeStyles((theme) => ({
  title: {
    marginRight: "auto",
  },
  titleContainer: {
    justifyContent: "flex-end",
    padding: theme.spacing(2),
    width: "100%",
  },
  titleIcon: {
    color: theme.palette.text.secondary,
  },
}));
