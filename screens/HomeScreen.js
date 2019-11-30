import React from "react";
import { StyleSheet } from "react-native";
import { Icon, Layout, Text, Button, Radio } from "react-native-ui-kitten";
import Form from "../components/Form";
import FormInput from "../components/FormInput";
import FormSubmitButton from "../components/FormSubmitButton";
import TopNavigation from "../components/TopNavigation";
import { getCurrentUser } from "../utils/api";
import { gutterWidth } from "../utils/style";

export default class HomeScreen extends React.Component {
  static navigationOptions = props => ({
    header: <TopNavigation {...props} />
  });
  state = {};
  componentDidMount = async () => {
    await this.loadUserData();
  };
  loadUserData = async () => {
    const { user, error: currentUserError } = await getCurrentUser();
    if (currentUserError)
      return this.setState({
        generalErrorMessage: `Error: ${currentUserError}`
      });
  };

  render() {
    const { generalErrorMessage } = this.state;
    return (
      <Layout style={styles.container}>
        {generalErrorMessage && (
          <Text status="danger" style={styles.generalErrorMessage}>
            {generalErrorMessage}
          </Text>
        )}
        <Text>Main</Text>
      </Layout>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 50,
    paddingHorizontal: gutterWidth
  },
  generalErrorMessage: {
    marginVertical: 20
  },

  contentContainer: {
    paddingTop: 30
  },
  welcomeContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: "contain",
    marginTop: 3,
    marginLeft: -10
  }
});
