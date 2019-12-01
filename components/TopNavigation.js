import React from "react";
import { StyleSheet, SafeAreaView, View, Platform } from "react-native";
import {
  Layout,
  Icon,
  TopNavigation,
  TopNavigationAction
} from "react-native-ui-kitten";

const BackIcon = style => <Icon {...style} name="arrow-back" />;

const EditIcon = style => <Icon {...style} name="edit" />;

const MenuIcon = style => <Icon {...style} name="more-vertical" />;

const BackAction = props => <TopNavigationAction {...props} icon={BackIcon} />;

const EditAction = props => <TopNavigationAction {...props} icon={EditIcon} />;

const MenuAction = props => <TopNavigationAction {...props} icon={MenuIcon} />;

export default function(props) {
  const onBackPress = () => {
    props.navigation.goBack();
  };
  const isFirstInStack =
    props.navigation.dangerouslyGetParent().state.index === 0;
  const renderLeftControl = () =>
    isFirstInStack ? null : <BackAction onPress={onBackPress} />;

  const renderRightControls = () => [];
  // const renderRightControls = () => [<EditAction />, <MenuAction />];

  /* Not using SafeAreaView as it causes the screen to be vertically jumpy when switching tabs */
  return (
    <Layout style={styles.container}>
      <TopNavigation
        title={props.title}
        leftControl={renderLeftControl()}
        rightControls={renderRightControls()}
      />
    </Layout>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "ios" ? 28 : 10
  }
});
