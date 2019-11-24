import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions
} from "react-native";
import { Card, ListItem, Button } from "react-native-elements";
import { WebBrowser, DangerZone, Constants } from "expo";
import LottieView from "lottie-react-native";
import { Col, Grid, Row } from "react-native-easy-grid";

import { MonoText } from "../components/StyledText";

const events = [
  {
    userId: "janet",
    username: "Dale Cooper",
    comment: "Checked in 1 hour ago",
    venue: { name: "test" }
  },
  {
    userId: "jody",
    username: "Audrey Horne",
    comment: "Plans to go tonight",
    venue: { name: "test" }
  }
];

const venueImageWidth = 90;
export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
    // title: "Checkins"
  };
  state = {
    animation: null
  };
  componentWillMount() {
    // this._playAnimation();
  }
  render() {
    return (
      <ScrollView style={styles.container}>
        <Grid style={styles.banner}>
          <Col style={{ justifyContent: "center" }}>
            <MonoText style={styles.bannerText}>Welcome</MonoText>
          </Col>
          <Col style={{ width: 100 }}>
            {this.state.animation && (
              <LottieView
                ref={animation => {
                  this.animation = animation;
                }}
                style={styles.animation}
                source={this.state.animation}
              />
            )}
          </Col>
        </Grid>
        <Grid>
          <Col style={{ justifyContent: "center" }} />
          <Col style={{ justifyContent: "center" }}>
            <Button
              style={styles.checkinButton}
              title="Check In Now"
              onPress={() => this._handleCheckinPress()}
            />
          </Col>
        </Grid>
        {events.map((event, index) => (
          <Grid key={index}>
            <Col style={styles.rowLeftCol}>
              {false && (
                <Image
                  source={require("../assets/images/robot-prod.png")}
                  style={{ height: venueImageWidth, width: venueImageWidth }}
                />
              )}
            </Col>
            <Col style={styles.rowRightCol}>
              <Row>
                <TouchableOpacity
                  style={styles.userButton}
                  onPress={() => this._handleUserPress(event.username)}
                >
                  <Text style={styles.userButtonText}>{event.username}</Text>
                </TouchableOpacity>
                <Text> @ </Text>
                <TouchableOpacity
                  style={styles.venueButton}
                  onPress={() => this._handleVenuePress(event.venue)}
                >
                  <Text style={styles.venueButtonText}>{event.venue.name}</Text>
                </TouchableOpacity>
              </Row>
              <Row>
                <Text style={styles.checkedInComment}>{event.comment}</Text>
              </Row>
              <Row>
                <Button
                  outline
                  title="test"
                  onPress={() => this._handleBuy({ username: event.username })}
                />
              </Row>
            </Col>
          </Grid>
        ))}
      </ScrollView>
    );
  }

  _handleCheckinPress() {
    this.props.navigation.navigate("NewCheckin");
  }

  _handleUserPress(username) {
    this.props.navigation.navigate("HomeUser", { username, tab: "Home" });
  }
  _handleVenuePress(username) {
    this.props.navigation.navigate("HomeVenue", { username, tab: "Home" });
  }

  _playAnimation = () => {
    if (!this.state.animation) {
      this._loadAnimationAsync();
    } else {
      this.animation.reset();
      this.animation.play();
    }
  };

  _loadAnimationAsync = async () => {
    let result = await fetch(
      "https://assets.lottiefiles.com/datafiles/AembVTvov5PkTSJ/data.json"
    )
      .then(data => {
        return data.json();
      })
      .catch(error => {
        console.error(error);
      });
    this.setState({ animation: result }, this._playAnimation);
  };

  _handleBuy = ({ username }) => {
    this.props.navigation.navigate("HomePurchase", { username, tab: "Home" });
  };
  // _handleLearnMorePress = () => {
  //   WebBrowser.openBrowserAsync(
  //     "https://docs.expo.io/versions/latest/guides/development-mode"
  //   );
  // };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
    // paddingTop: Constants.statusBarHeight
  },
  animation: {
    width: 100,
    height: 100
  },
  banner: {
    backgroundColor: "#463268"
  },
  bannerText: {
    fontSize: 20,
    textAlign: "center",
    color: "white",
    fontFamily: "space-mono"
  },
  checkinButton: {
    marginTop: 10,
    marginBottom: 50
  },
  checkedInComment: {
    fontSize: 16
  },
  userButtonText: {
    color: "steelblue",
    fontSize: 18
  },
  venueButtonText: {
    color: "steelblue",
    fontSize: 18
  },
  rowLeftCol: {
    width: venueImageWidth
  },
  rowRightCol: {
    paddingVertical: 5,
    paddingHorizontal: 10
  }
});
