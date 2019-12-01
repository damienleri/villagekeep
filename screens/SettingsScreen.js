import React from "react";
import { Platform, SafeAreaView, StyleSheet, View } from "react-native";
import {} from "react-navigation";
import {
  Layout,
  Button,
  List,
  ListItem,
  Card,
  Text
} from "react-native-ui-kitten";
import { gutterWidth } from "../utils/style";

export default class SettingsScreen extends React.Component {
  render() {
    const isDeveloper = true;
    return (
      <Layout style={styles.container}>
        <Text category="h4">Settings</Text>
        <View style={styles.row}>
          <Button
            appearance="outline"
            onPress={() => this.props.navigation.navigate("SettingsEditAccont")}
          >
            Edit account
          </Button>
        </View>

        {isDeveloper && (
          <View style={styles.row}>
            <Button
              appearance="outline"
              status="danger"
              onPress={() => this.props.navigation.navigate("TestApi")}
            >
              Test the API
            </Button>
          </View>
        )}
      </Layout>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: gutterWidth
  },
  row: { marginVertical: 20 },
  devItem: {}
});
