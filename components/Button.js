import React from "react";
import { connect } from "react-redux";
import { StyleSheet } from "react-native";
import { Button as KittenButton } from "@ui-kitten/components";
import { defaults } from "lodash";
import { colors } from "../utils/style";

const Button = props => {
  const { settings, appearance = "primary" } = props;
  const { theme } = settings;

  const styles = themeStyles[theme];
  let buttonStyles = [];
  let textStyles = [];

  buttonStyles.push(styles.button, styles[`${appearance}Button`]);
  textStyles.push(styles.buttonText, styles[`${appearance}ButtonText`]);

  if (props.inline) {
    buttonStyles.push({
      marginHorizontal: 0,
      paddingHorizontal: 0,
      marginVertical: 0,
      paddingVertical: 0
    });
    textStyles.push({
      marginHorizontal: 0,
      paddingHorizontal: 0,
      marginVertical: 0,
      paddingVertical: 0
    });
  }

  buttonStyles.push(props.style);
  textStyles.push(props.textStyle);
  return (
    <KittenButton {...props} style={buttonStyles} textStyle={textStyles} />
  );
};
export default connect(({ settings }) => ({ settings }))(Button);

const themeStyles = {
  dark: StyleSheet.create({
    button: { marginVertical: 10 },
    buttonText: { textTransform: "uppercase" },
    primaryButtonText: {
      color: colors.darkAccentColor
    }
  }),
  light: StyleSheet.create({
    button: { marginVertical: 10 },
    buttonText: { textTransform: "uppercase" },
    primaryButtonText: { color: "white" }
  })
};
