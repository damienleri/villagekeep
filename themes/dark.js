// extends https://github.com/eva-design/eva/blob/master/packages/eva/themes/light.json
// const tinycolor = require("tinycolor2");
import tinycolor from "tinycolor2";
import { colors } from "../utils/style";
import { dark } from "@eva-design/eva";

const overrides = {
  "color-primary-100": tinycolor(colors.brandColor).lighten(40),
  "color-primary-200": tinycolor(colors.brandColor).lighten(30),
  "color-primary-300": tinycolor(colors.brandColor).lighten(20),
  "color-primary-400": tinycolor(colors.brandColor).lighten(10),
  "color-primary-500": colors.brandColor,
  "color-primary-600": tinycolor(colors.brandColor).darken(10),
  "color-primary-700": tinycolor(colors.brandColor).darken(20),
  "color-primary-800": tinycolor(colors.brandColor).darken(30),
  "color-primary-900": tinycolor(colors.brandColor).darken(40)
};
export default { ...dark, ...overrides };
