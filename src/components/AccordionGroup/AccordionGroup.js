import PropTypes from "prop-types";
import React from "react";
import Box from "components/_Box";

export default function AccordionGroup(props) {
  const { children, numbered = false, ...otherProps } = props;

  const [openAccordion, setOpenAccordion] = React.useState(0);
  const childrenCount = React.Children.count(children);

  return (
    <Box {...otherProps}>
      {React.Children.map(children, (child, index) => {
        const titlePrefix = `${numbered ? "" + (index + 1) + ". " : ""}`;
        return React.cloneElement(child, {
          expanded: openAccordion === index,
          index: index + 1,
          onChange: () => {
            const nextAccordion = (index + 1) % childrenCount;
            setOpenAccordion(openAccordion === index ? nextAccordion : index);
          },
          title: `${titlePrefix}${child.props.title}`,
        });
      })}
    </Box>
  );
}

AccordionGroup.propTypes = {
  children: PropTypes.node,
  numbered: PropTypes.bool,
};
