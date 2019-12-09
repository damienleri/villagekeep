import { Platform, Dimensions } from "react-native";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export const window = {
  width,
  height,
  isSmallDevice: width < 375
};

export const gutterWidth = 32;
export const colors = {
  textLinkColor: "#3366FF",
  primaryColor: "#3366FF",
  successColor: "#18E3A0",
  dangerColor: "red",
  brandColor: "#72C89E",
  darkAccentColor: "#005B7B",
  lightAccentColor: "#A9CDDF",
  veryLightAccentColor: "#EBF1F0",
  darkAccentColor2: "#92AAAA",
  darkAccentColor3: "#9562B6",
  lightAccentColor2: "#C4DFDD",
  lightAccentColor3: "#BBDAE7",
  backgrounds: { dark: "#222B45", light: "#ffffff" }
};

export const topNavigationHeight = 80;
export const topNavigationPaddingTop = Platform.OS === "ios" ? 28 : 10;
