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
import { Input, Icon } from "react-native-ui-kitten";
import { gutterWidth } from "../utils/style";

export default class InlineForm extends React.Component {
  state = {};

  render() {
    return <View style={styles.inlineForm}>{props.children}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    marginHorizontal: gutterWidth
  }
  // header: { marginTop: 20, marginBottom: 10, fontWeight: "normal" },
});
