import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "@ui-kitten/components";
import buildInfo from "../build"; // updated by tasks/publishExpo.js as referenced in package.json

import { gutterWidth } from "../utils/style";

export default function BuildInfo(props) {
  return (
    <View
      style={[
        { flex: 1, justifyContent: "flex-end", paddingVertical: gutterWidth },
        props.style
      ]}
    >
      <Text
        style={[{ textAlign: "right", fontStyle: "italic" }, props.textStyle]}
        appearance="hint"
      >
        Version {buildInfo.jsBuildNumber}
      </Text>
    </View>
  );
}
