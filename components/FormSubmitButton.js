import React from "react";
import { StyleSheet } from "react-native";
import { Button } from "@ui-kitten/components";
// import Button from "../components/Button";

export default function FormSubmitButton(props) {
  return (
    <Button
      {...props}
      size="large"
      style={[props.style, styles.button]}
      textStyle={styles.textStyle}
    />
  );
}
const styles = StyleSheet.create({
  button: {
    marginVertical: 10
  },
  textStyle: {
    fontWeight: "normal",
    textTransform: "uppercase"
  }
});
