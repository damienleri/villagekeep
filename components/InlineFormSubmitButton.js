import React from "react";
import { StyleSheet } from "react-native";
import { defaults } from "lodash";
import Button from "../components/Button";

export default function InlineFormSubmitButton(props) {
  const buttonProps = defaults({}, props, {
    appearance: "ghost",
    size: "small"
  });
  return (
    <Button
      {...buttonProps}
      style={[props.style, styles.button]}
      textStyle={styles.textStyle}
    />
  );
}
const styles = StyleSheet.create({
  button: {
    height: 35
  },
  textStyle: {
    fontWeight: "normal"
  }
});
