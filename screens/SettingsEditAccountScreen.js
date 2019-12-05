import React from "react";
import { StyleSheet, View } from "react-native";
import { Layout, Text } from "@ui-kitten/components";
import Form from "../components/Form";
import AccountForm from "./AccountForm";
import { gutterWidth } from "../utils/style";

export default class SettingsEditAccontScreen extends React.Component {
  handleSave = async () => {
    this.props.navigation.goBack();
  };
  render() {
    return (
      <Layout style={styles.container}>
        <View style={styles.intro}>
          <Text category="h5" style={styles.introHeader}>
            Your account
          </Text>
        </View>
        <AccountForm
          navigation={this.props.navigation}
          onSave={this.handleSave}
        />
      </Layout>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  intro: { marginHorizontal: gutterWidth },
  introHeader: {},
  introText: { marginVertical: 10 }
});
