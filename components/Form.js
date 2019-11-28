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

export default function Form(props) {
  return (
    <SafeAreaView style={[styles.container, props.style]}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : null}
        enabled
      >
        <TouchableWithoutFeedback
          style={styles.container}
          onPress={Keyboard.dismiss}
        >
          <View style={styles.inner}>
            <React.Fragment>{props.children}</React.Fragment>
            <View style={{ flex: 1 }} />
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 32 },
  inner: { flex: 1, justifyContent: "flex-end" },
  infoContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 200,
    bottom: 250,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
    backgroundColor: "#aa73b7"
  }
});
