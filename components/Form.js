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
  // console.log("topNavHeight", topNavigationHeight);
  // return (
  //   <KeyboardAvoidingView
  //     style={[styles.container, props.style]}
  //     behavior={Platform.OS === "ios" ? "height" : null}
  //     keyboardVerticalOffset={topNavigationHeight}
  //   >
  //     <React.Fragment>{props.children}</React.Fragment>
  //   </KeyboardAvoidingView>
  // );

  return (
    <KeyboardAvoidingView
      style={[styles.container, props.style]}
      behavior={Platform.OS === "ios" ? "height" : null}
      keyboardVerticalOffset={topNavigationHeight}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <React.Fragment>{props.children}</React.Fragment>
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
  container: { paddingHorizontal: gutterWidth },
  inner: { flex: 1 }
  // inner: { flex: 1, justifyContent: "flex-end" }
});
