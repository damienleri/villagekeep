import React from "react";
import { StyleSheet } from "react-native";
import { Button as KittenButton } from "react-native-ui-kitten";
import { colors } from "../utils/style";

const MyButton = props => {
  if (props.appearance === "ghost")
    return (
      <KittenButton
        {...props}
        size="small"
        style={[props.style, styles.button]}
        textStyle={styles.buttonText}
      />
    );

  return <KittenButton {...props} />;
};
export default MyButton;

const styles = StyleSheet.create({
  button: { marginVertical: 10 },
  buttonText: { color: colors.brandColor, textTransform: "uppercase" }
});
