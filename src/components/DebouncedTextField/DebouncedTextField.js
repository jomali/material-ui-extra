import React from "react";
import InputAdornment from "@material-ui/core/InputAdornment";
import PropTypes from "prop-types";
import UneditableTextField from "components/UneditableTextField";
import useDebounce from "components/useDebounce";

const DebouncedTextField = React.forwardRef((props, ref) => {
  const {
    currency = "€",
    delay = 0,
    error,
    helperText,
    inputErrorText,
    InputProps,
    onBlur,
    onChange,
    onSubmitEditing,
    type,
    value,
    ...otherProps
  } = props;

  const [inputError, setInputError] = React.useState(false);
  const [lastChar, setLastChar] = React.useState(null);
  const [textValue, setTextValue] = React.useState(value);
  const debouncedTextValue = useDebounce(textValue, delay);

  // Ante cambios del valor 'props.value' del componente, actualiza el estado
  // del campo de texto al nuevo valor:
  React.useEffect(() => {
    if (value !== textValue) {
      setTextValue(value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  // Tras agotarse el 'delay' después de una modificación del campo de texto
  // por parte del usuario, lanza el callback 'onChange' con el nuevo estado:
  React.useEffect(() => {
    if (value !== debouncedTextValue) {
      onChange(debouncedTextValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedTextValue]);

  const checkInputChar = (event) => {
    if (type === "number" || type === "currency") {
      const commaRegex = /\.|,/;
      const isDecimal = /[^.,]*(\.|,)[^.,]*/.test(textValue);
      const keyCode = event.keyCode || event.which;
      const keyValue = String.fromCharCode(keyCode);
      const error = !/[0-9]|\.|,/.test(keyValue);

      setInputError(error);
      if (
        error ||
        (commaRegex.test(keyValue) && commaRegex.test(lastChar)) ||
        (commaRegex.test(keyValue) && isDecimal)
      ) {
        event.preventDefault();
      } else {
        setLastChar(keyValue);
      }
    }
  };

  const getEndAdornment = () => {
    if (type === "currency") {
      return <InputAdornment>{currency}</InputAdornment>;
    }
  };

  const getHelperText = () => {
    let temp = inputErrorText ? inputErrorText : helperText;
    return inputError ? temp : helperText;
  };

  const onBlurFunction = () => {
    if (InputProps && InputProps.onBlur) {
      InputProps.onBlur();
    }
    if (onBlur) {
      onBlur();
    }
    setInputError(false);
  };

  const onKeyPressFunction = (event) => {
    if (InputProps && InputProps.onKeyPress) {
      InputProps.onKeyPress(event);
    }
    if (!!onSubmitEditing && event.key === "Enter") {
      event.preventDefault();
      onSubmitEditing(event);
    }
    checkInputChar(event);
  };

  return (
    <UneditableTextField
      {...otherProps}
      error={error || inputError}
      helperText={getHelperText()}
      InputProps={{
        ...InputProps,
        endAdornment:
          InputProps && InputProps.endAdornment
            ? InputProps.endAdornment
            : getEndAdornment(),
        onBlur: onBlurFunction,
        onKeyPress: onKeyPressFunction,
      }}
      inputRef={ref}
      onChange={(event) => setTextValue(event.target.value)}
      type={type === "currency" ? "text" : type}
      value={textValue}
    />
  );
});

DebouncedTextField.propTypes = {
  currency: PropTypes.string,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  inputErrorText: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onSubmitEditing: PropTypes.func,
  delay: PropTypes.number,
  type: PropTypes.oneOf([
    // Valid HTML5 input types:
    "button",
    "checkbox",
    "color",
    "date",
    "datetime-local",
    "email",
    "file",
    "hidden",
    "image",
    "month",
    "number",
    "password",
    "radio",
    "range",
    "reset",
    "search",
    "submit",
    "tel",
    "text",
    "time",
    "url",
    "week",
    // Additional types:
    "currency",
  ]),
  value: PropTypes.any,
};

export default DebouncedTextField;
