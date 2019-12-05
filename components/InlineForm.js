import React from "react";
import {
  View,
  Container,
  StyleSheet,
  SafeAreaView,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Text,
  Platform
} from "react-native";
import { Input, Icon } from "@ui-kitten/components";
import { defaults } from "lodash";
import { gutterWidth } from "../utils/style";

export default class InlineForm extends React.Component {
  state = {};

  render() {
    return <View style={styles.container}>{this.props.children}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: gutterWidth,
    flexWrap: "wrap"
  }
  // header: { marginTop: 20, marginBottom: 10, fontWeight: "normal" },
});
