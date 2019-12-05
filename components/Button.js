import React from "react";
import { StyleSheet } from "react-native";
import { Button as KittenButton } from "@ui-kitten/components";
import { defaults } from "lodash";
import { colors } from "../utils/style";

const MyButton = props => {
  const buttonProps = defaults({}, props, {
    appearance: "ghost",
    size: "small"
  });

  let buttonTextStyle = { textTransform: "uppercase" };
  if (!buttonProps.status || buttonProps.status === "primary")
    buttonTextStyle.color = colors.brandColor;
  if (props.appearance === "ghost")
    return (
      <KittenButton
        {...buttonProps}
        style={[styles.button, props.style]}
        textStyle={[buttonTextStyle, props.textStyle]}
      />
    );

  return <KittenButton {...props} />;
};
export default MyButton;

const styles = StyleSheet.create({
  button: { marginVertical: 10 }
});
