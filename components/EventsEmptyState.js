import React from "react";
import { StyleSheet, View, ScrollView, RefreshControl } from "react-native";
import {
  Icon,
  Layout,
  Text,
  Button,
  Radio,
  Card,
  CardHeader,
  List,
  ListItem,
  Spinner
} from "react-native-ui-kitten";
import { groupBy } from "lodash";
import { Ionicons } from "@expo/vector-icons";

import { primaryColor, successColor } from "../utils/style";

import AddEventActions from "./AddEventActions";

const Step = ({ name, description, isDone, onPress }) => {
  const color = isDone ? successColor : primaryColor;
  return (
    <View style={styles.step}>
      <View style={styles.stepRow}>
        <Ionicons
          name={isDone ? "ios-checkbox-outline" : "md-square-outline"}
          size={32}
          color={color}
          style={{ marginRight: 10 }}
          onPress={onPress}
        />
        <Text style={[styles.stepName, { color }]} onPress={onPress}>
          {name} {"  "}
        </Text>
      </View>
      <Text style={styles.stepDescription} appearance="hint">
        {description}
      </Text>
    </View>
  );
};

const EventsEmptyState = ({ user, handleAddEvent, navigation }) => {
  let { isParent } = user;
  isParent = false;
  const contacts = user.contacts.items;
  const contactsByType = groupBy(contacts, "type");

  return (
    <View>
      <Text category="h5" style={styles.stepsHeader}>
        Welcome.
        <Text style={styles.stepsHeaderHint} category="h5">
          {"  "}How to use the app:
        </Text>
      </Text>

      {isParent && (
        <Step
          name="Add your teens"
          description="They will be invited via text message."
          onPress={() => navigation.navigate("EditContact", { type: "kid" })}
          isDone={contactsByType.kid}
        />
      )}
      {isParent && (
        <Step
          name="Someone add an event"
          description=""
          onPress={() => navigation.navigate("People")}
          isDone={contactsByType.kid}
        />
      )}
      {!isParent && (
        <Step
          name="Add a parent or guardian"
          description="The app helps to manage their nagging."
          onPress={() =>
            navigation.navigate("EditContact", { type: "parent", user })
          }
          isDone={contactsByType.parent}
        />
      )}
      {!isParent && (
        <Step
          name="Add some IRL friends"
          description="The app texts them an invitation."
          onPress={() =>
            navigation.navigate("EditContact", { type: "friend", user })
          }
          isDone={contactsByType.friend}
        />
      )}
      {!isParent && (
        <Step
          name="Add events"
          description="The app keeps parents in the loop."
          onPress={() => navigation.navigate("EditEvent")}
          isDone={contactsByType.friend}
        />
      )}

      {contacts.length > 0 && (
        <AddEventActions
          isParent={isParent}
          handleAddEvent={handleAddEvent}
          appearance="primary"
        />
      )}
    </View>
  );
};
export default EventsEmptyState;

const styles = StyleSheet.create({
  stepsHeader: { marginVertical: 20 },
  stepsHeaderHint: { fontWeight: "normal" },

  step: { marginVertical: 10 },
  stepRow: { flexDirection: "row", alignItems: "center" },

  stepName: { fontWeight: "bold", fontSize: 18 },
  stepDescription: { fontSize: 18, marginTop: 4 }
});
