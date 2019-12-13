import React from "react";
import { StyleSheet, View } from "react-native";
import Button from "./Button";

function AddContactButton(props) {
  return (
    <Button
      {...props}
      appearance={props.appearance}
      style={[props.style, styles.addContactButton]}
      textStyle={styles.addContactButtonText}
    >
      {props.children}
    </Button>
  );
}
export default AddContactButton;

const styles = StyleSheet.create({
  addContactButton: { marginVertical: 10 },
  addContactButtonText: { textTransform: "uppercase" }
});
