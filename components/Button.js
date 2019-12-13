import React from "react";
import { connect } from "react-redux";
import { StyleSheet } from "react-native";
import { Button as KittenButton } from "@ui-kitten/components";
import { defaults } from "lodash";
import { colors } from "../utils/style";

const Button = props => {
  const { settings, appearance } = props;
  const { theme } = settings;
  // const buttonProps = defaults({}, props, {
  //   appearance: "ghost",
  //   size: "small"
  // });

  // if (!buttonProps.status || buttonProps.status === "primary") {
  //   buttonTextStyle.color = colors.brandColor;
  // }

  const styles = themeStyles[theme];
  let buttonStyles = [];
  let textStyles = [];

  if (!props.status || props.status === "primary") {
    buttonStyles.push(styles[`${appearance}Button`]);
    textStyles.push(styles[`${appearance}ButtonText`]);
  }

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

// const styles = StyleSheet.create({
//   ghostButton: { marginVertical: 10 },
//   ghostButtonText: { color: colors.brandColor, textTransform: "uppercase" },
//   outlineButton: { borderColor: colors.darkAccentColor, marginVertical: 10 },
//   outlineButtonText: {
//     color: colors.darkAccentColor,
//     textTransform: "uppercase"
//   }
// });
const themeStyles = {
  dark: StyleSheet.create({
    ghostButton: { marginVertical: 10 },
    ghostButtonText: {
      color: colors.brandColor,
      textTransform: "uppercase"
    },
    outlineButton: { borderColor: colors.brandColor, marginVertical: 10 },
    outlineButtonText: {
      color: colors.brandColor,
      textTransform: "uppercase"
    }
    // primaryButton: { borderColor: colors.brandColor, marginVertical: 10 },
    // primaryButtonText: {
    //   backgroundColor: colors.brandColor,
    //   color: colors.lightAccentColor,
    //   textTransform: "uppercase"
    // }
  }),
  light: StyleSheet.create({
    ghostButton: { marginVertical: 10 },
    ghostButtonText: {
      color: colors.darkAccentColor,
      textTransform: "uppercase"
    },
    outlineButton: { borderColor: colors.darkAccentColor, marginVertical: 10 },
    outlineButtonText: {
      color: colors.darkAccentColor,
      textTransform: "uppercase"
    }
  })
};
