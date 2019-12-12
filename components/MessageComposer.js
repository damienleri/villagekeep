import React from "react";
import { connect } from "react-redux";
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
  OverflowMenu
} from "@ui-kitten/components";
import { useColorScheme } from "react-native-appearance";

import { gutterWidth, colors, topNavigationHeight } from "../utils/style";

const MessageComposer = React.forwardRef((props, ref) => {
  const { settings = {} } = props;
  const { theme } = settings;
  return (
    <View
      style={[
        styles.messageInputRow,
        props.networkIsOffline ? styles.messageInputRowOffline : {}
      ]}
    >
      <TextInput
        multiline={true}
        blurOnSubmit={true}
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

const mapStateToProps = ({ settings }) => {
  return { settings };
};
export default connect(
  mapStateToProps,
  null,
  null,
  { forwardRef: true }
)(MessageComposer);

const styles = StyleSheet.create({
  messageInputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopColor: colors.brandColor,
    borderTopWidth: StyleSheet.hairlineWidth
    // backgroundColor: "white"
  },
  messageInputRowOffline: { borderTopColor: colors.dangerColor },
  // inputContainer: {
  //   // marginTop: 100,
  //   flexDirection: "row",
  //   alignSelf: "center",
  //   width: "96%",
  //   marginLeft: 2,
  //   marginRight: 2,
  //   marginBottom: 10,
  //   minHeight: 50, //... For dynamic height
  //   // borderRadius: 50,
  //   backgroundColor: "transparent",
  //   borderWidth: 1,
  //   borderColor: "gray",
  //   paddingLeft: 10, //... With respect to the min height, so that it doesn't cut
  //   paddingTop: 10, //... With respect to the min height, so that it doesn't cut
  //   paddingBottom: 10 //... With respect to the min height, so that it doesn't cut
  // },
  messageInput: {
    borderWidth: 0,
    flex: 2,
    minHeight: 70,
    paddingHorizontal: 12,
    paddingVertical: 5,
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
