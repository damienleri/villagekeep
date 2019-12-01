import React from "react";
import { StyleSheet, View } from "react-native";
import { Layout, Text } from "react-native-ui-kitten";
import Form from "../components/Form";
import AccountForm from "./AccountForm";
import { gutterWidth } from "../utils/style";

export default class AuthEditAccountScreen extends React.Component {
  handleSave = async () => {
    this.props.navigation.navigate("Main");
  };
  render() {
    return (
      <Layout style={styles.container}>
        <View style={styles.intro}>
          <Text category="h5" style={styles.introHeader}>
            Last step
          </Text>
          <Text style={styles.introText}>
            This identifes you to friends and family.
          </Text>
        </View>
        <AccountForm
          isNewUser={true}
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
