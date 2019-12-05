import React from "react";
import { StyleSheet, TextInput } from "react-native";
import { Input, Icon } from "@ui-kitten/components";

export default React.forwardRef((props, ref) => {
  // return <TextInput {...props} ref={ref} style={[props.style, styles.input]} />;
  return (
    <Input
      {...props}
      ref={ref}
      style={[props.style, styles.input]}
      labelStyle={styles.inputLabelStyle}
    />
  );
});
const styles = StyleSheet.create({
  input: {
    marginVertical: 10
  }
});
