import React from "react";
import { connect } from "react-redux";
import { StyleSheet } from "react-native";
import { Button as KittenButton } from "@ui-kitten/components";
import { defaults } from "lodash";
import { colors } from "../utils/style";

const Button = props => {
  const { settings } = props;
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

  if (props.appearance === "outline") {
    buttonStyles.push(styles.outlineButton);
    textStyles.push(styles.outlineButtonText);
  } else {
    buttonStyles.push(styles.ghostButton);
    textStyles.push(styles.ghostButtonText);
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
    // buttonStyle.marginTop = 0;
    // buttonStyle.paddingTop = 0;
    // buttonStyle.marginBottom = 0;
    // buttonStyle.paddingBottom = 0;
    // buttonStyle.marginRight = 0;
    // buttonStyle.paddingRight = 0;
    // buttonStyle.marginLeft = 0;
    // buttonStyle.paddingLeft = 0;
    // textStyle.marginTop = 0;
    // textStyle.paddingTop = 0;
    // textStyle.marginBottom = 0;
    // textStyle.paddingBottom = 0;
    // textStyle.marginRight = 0;
    // textStyle.paddingRight = 0;
    // textStyle.marginLeft = 0;
    // textStyle.paddingLeft = 0;
  }
  // console.log(props.inline, buttonStyle);
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
