import React from "react";
import { StyleSheet, View } from "react-native";
import { Icon, Layout, Text, Button, Radio } from "react-native-ui-kitten";
import Form from "../components/Form";
import FormInput from "../components/FormInput";
import FormSubmitButton from "../components/FormSubmitButton";
import TopNavigation from "../components/TopNavigation";
import { getCurrentUser, updateUser } from "../utils/api";
import AccountForm from "./AccountForm";
import { gutterWidth } from "../utils/style";

export default class AuthEditAccountScreen extends React.Component {
  // static navigationOptions = props => {
  //   return {
  //     header: props.navigation.getParam("isSignupWorkflow") ? null : (
  //       <TopNavigation {...props} />
  //     )
  //   };
  // };

  render() {
    handleSave = async () => {
      this.props.navigation.navigate("Main");
    };
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
