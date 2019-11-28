import React from "react";
import { StyleSheet } from "react-native";
import { Input, Icon } from "react-native-ui-kitten";

export default function FormInput(props) {
  return (
    <Input
      {...props}
      style={[props.style, styles.input]}
      labelStyle={styles.inputLabelStyle}
    />
  );
}
const styles = StyleSheet.create({
  input: {
    marginVertical: 10
  },
  inputLabelStyle: {
    textTransform: "uppercase"
  }
});
