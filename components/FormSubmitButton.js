import React from "react";
import { StyleSheet } from "react-native";
// import { Button } from "@ui-kitten/components";
import Button from "./Button";

export default function FormSubmitButton(props) {
  return (
    <Button
      {...props}
      appearance="outline"
      size="large"
      style={[props.style, styles.button]}
      textStyle={styles.textStyle}
    />
  );
}
const styles = StyleSheet.create({});
