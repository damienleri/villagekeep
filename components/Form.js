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
import { gutterWidth, topNavigationHeight } from "../utils/style";

export default function Form(props) {
  return (
    <KeyboardAvoidingView
      style={[styles.container, props.style]}
      behavior={Platform.OS === "ios" ? "height" : "height"}
      keyboardVerticalOffset={topNavigationHeight}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <React.Fragment>{props.children}</React.Fragment>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: { paddingHorizontal: gutterWidth },
  inner: { flex: 1 }
});
