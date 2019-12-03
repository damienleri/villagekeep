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

export default function Form(props) {
  // return <View style={styles.container}>{props.children}</View>;

  return (
    <KeyboardAvoidingView
      style={[styles.container, props.style]}
      behavior={Platform.OS === "ios" ? "padding" : null}
      enabled
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <React.Fragment>{props.children}</React.Fragment>
          <View style={{ flex: 1 }} />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
  // return (
  //   <SafeAreaView style={[styles.container, props.style]}>
  //     <KeyboardAvoidingView
  //       behavior={Platform.OS === "ios" ? "padding" : null}
  //       enabled
  //     >
  //       <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
  //         <View style={styles.inner}>
  //           <React.Fragment>{props.children}</React.Fragment>
  //           <View style={{ flex: 1 }} />
  //         </View>
  //       </TouchableWithoutFeedback>
  //     </KeyboardAvoidingView>
  //   </SafeAreaView>
  // );
}
const styles = StyleSheet.create({
  container: { paddingHorizontal: gutterWidth }
  // inner: { flex: 1, justifyContent: "flex-end" }
});
