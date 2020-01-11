import React from "react";
import { StyleSheet, SafeAreaView, View, Platform } from "react-native";
import {
  Layout,
  Icon,
  TopNavigation,
  TopNavigationAction
} from "@ui-kitten/components";
import { topNavigationHeight, topNavigationPaddingTop } from "../utils/style";
const BackIcon = style => <Icon {...style} name="arrow-back" />;

const EditIcon = style => <Icon {...style} name="edit" />;

const MenuIcon = style => <Icon {...style} name="more-vertical" />;

const BackAction = props => <TopNavigationAction {...props} icon={BackIcon} />;

const EditAction = props => <TopNavigationAction {...props} icon={EditIcon} />;

const MenuAction = props => <TopNavigationAction {...props} icon={MenuIcon} />;

export default function(props) {
  const onBackPress = () => {
    if (props.onBackPress) {
      props.onBackPress();
    } else {
      props.navigation.goBack();
    }
  };
  const isFirstInStack =
    props.navigation.dangerouslyGetParent().state.index === 0;
  const renderLeftControl = () =>
    isFirstInStack || props.hideBack ? null : (
      <BackAction onPress={onBackPress} />
    );

  const renderRightControls = () => [];

  const hasContent = !isFirstInStack;
  const styles = StyleSheet.create({
    container: {
      paddingTop: topNavigationPaddingTop
      // paddingTop: hasContent ? topNavigationPaddingTop : 0
    },
    navStyle: {
      height: topNavigationHeight - topNavigationPaddingTop
    }
  });
  /* Not using SafeAreaView as it causes the screen to be vertically jumpy when switching tabs */
  return (
    <Layout style={styles.container}>
      <TopNavigation
        title={props.title}
        leftControl={renderLeftControl()}
        rightControls={renderRightControls()}
        style={styles.navStyle}
      />
    </Layout>
  );
}
