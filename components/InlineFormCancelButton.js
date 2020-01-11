import React from "react";
import { StyleSheet } from "react-native";
import { defaults } from "lodash";
import Button from "../components/Button";

export default function InlineFormCancelButton(props) {
  const buttonProps = defaults({}, props, {
    status: "basic",
    appearance: "ghost",
    size: "small"
  });
  return (
    <Button
      {...buttonProps}
      style={[styles.button, props.style]}
      textStyle={[styles.textStyle, props.style]}
    />
  );
}
const styles = StyleSheet.create({
  button: {
    height: 35
  },
  textStyle: {
    fontWeight: "normal",
    color: "#aaa"
  }
});
