import React from "react";
import {
  StyleSheet,
  View,
  Alert,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  TextInput
} from "react-native";
import {
  Icon,
  Layout,
  Text,
  Spinner,
  Input,
  OverflowMenu,
  withStyles
} from "@ui-kitten/components";
import { useColorScheme } from "react-native-appearance";

import { gutterWidth, colors, topNavigationHeight } from "../utils/style";

export default MessageComposer = React.forwardRef((props, ref) => {
  const theme = useColorScheme();
  return (
    <View
      style={[
        styles.messageInputRow,
        props.networkIsOffline ? styles.messageInputRowOffline : {}
      ]}
    >
      <TextInput
        blurOnSubmit={false}
        // multiline={true}
        style={[
          styles.messageInput,
          themeStyles[theme].messageInput,
          props.networkIsOffline ? styles.messageInputOffline : {}
        ]}
        value={props.inputText}
        onChangeText={props.handleChangeInputText}
        onSubmitEditing={props.handleMessageSubmit}
        ref={ref}
        returnKeyType="send"
        placeholder={
          props.networkIsOffline
            ? "You are offline. Waiting..."
            : "Type a thing"
        }
        placeholderTextColor={
          props.networkIsOffline ? colors.dangerColor : colors.brandColor
        }
        editable={!props.networkIsOffline}
      />
      <TouchableOpacity
        onPress={props.handleMessageSubmit}
        style={styles.messageSubmitContainer}
      >
        <View style={styles.messageSubmitButton}>
          <Icon
            name="arrow-upward"
            fill={colors.brandColor}
            height={40}
            width={40}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
});

// export default ThemedMessageComposer = withStyles(MessageComposer, theme => {
//   console.log(theme);
//   return { hello: "wold" };
// });
// export default ThemedMessageComposer = withStyles(MessageComposer, theme => ({
//   backgroundColor: theme["color-primary-default"]
// }));

const styles = StyleSheet.create({
  messageInputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopColor: colors.brandColor,
    borderTopWidth: StyleSheet.hairlineWidth
    // backgroundColor: "white"
  },
  messageInputRowOffline: { borderTopColor: colors.dangerColor },
  messageInput: {
    borderWidth: 0,
    flex: 2,
    height: 50,
    paddingHorizontal: 12,
    paddingVertical: 2,
    fontSize: 16
  },
  // themedMessageInput: { dark: { color: "white" }, light: { color: "black" } },

  messageSubmitContainer: { paddingHorizontal: 10 }, //TouchableOpacity
  messageSubmitButton: {
    justifyContent: "center",
    alignItems: "center"
  },
  messageSubmitButtonIcon: {}
});
const themeStyles = {
  dark: StyleSheet.create({
    messageInput: { color: "white" }
  }),
  light: StyleSheet.create({
    messageInput: { color: "black" }
  })
};
