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
} from "@ui-kitten/components";
import { groupBy } from "lodash";
import { Ionicons } from "@expo/vector-icons";

import { colors } from "../utils/style";

import AddEventActions from "./AddEventActions";

const Step = ({ name, description, isDone, onPress }) => {
  return (
    <View style={styles.step}>
      <View style={styles.stepRow}>
        {isDone ? (
          <Text style={styles.stepName} status="success" onPress={onPress}>
            {name}
          </Text>
        ) : (
          <Text
            style={[styles.stepName, { paddingVertical: 8 }]}
            onPress={onPress}
          >
            {name}
          </Text>
        )}
        {isDone && (
          <Ionicons
            name={isDone ? "md-checkmark" : "md-square-outline"}
            size={28}
            color={colors.successColor}
            style={{ marginHorizontal: 10 }}
            onPress={onPress}
          />
        )}
      </View>
      <Text style={styles.stepDescription} appearance="hint">
        {description}
      </Text>
    </View>
  );
};

const EventsEmptyState = ({ user, handleAddEvent, navigation }) => {
  let { isParent } = user;
  const contacts = user.contacts.items;
  const contactsByType = groupBy(contacts, "type");

  return (
    <ScrollView>
      {isParent && (
        <Step
          name="1. Add your teens"
          description="They are invited via text message."
          onPress={() =>
            navigation.navigate("EditContact", { type: "kid", user })
          }
          isDone={contactsByType.kid}
        />
      )}
      {isParent && (
        <Step
          name="2. Your teens add their friends"
          description="Who in turn can invite their parents."
          onPress={() =>
            navigation.navigate("EditContact", { type: "friend", user })
          }
          isDone={contactsByType.friend}
        />
      )}
      {isParent && (
        <Step
          name="3. Teens start threads with specific friends"
          description="The app keeps all the parents in the loop."
          onPress={() => navigation.navigate("People")}
          isDone={false}
        />
      )}
      {!isParent && (
        <Step
          name="1. Add a parent or guardian"
          description="The app helps to manage their nagging."
          onPress={() =>
            navigation.navigate("EditContact", { type: "parent", user })
          }
          isDone={contactsByType.parent}
        />
      )}
      {!isParent && (
        <Step
          name="2. Add some IRL friends"
          description="The app texts them invitations."
          onPress={() =>
            navigation.navigate("EditContact", { type: "friend", user })
          }
          isDone={contactsByType.friend}
        />
      )}
      {!isParent && (
        <Step
          name="3. Start threads"
          description="The app keeps parents in the loop."
          onPress={() => navigation.navigate("EditEvent")}
          isDone={false}
        />
      )}

      {contacts.length > 0 && (
        <View style={{ marginTop: 10 }}>
          <AddEventActions user={user} handleAddEvent={handleAddEvent} />
        </View>
      )}
    </ScrollView>
  );
};
export default EventsEmptyState;

const styles = StyleSheet.create({
  stepsHeader: { marginVertical: 20 },
  stepsHeaderHint: { fontWeight: "normal" },

  step: { marginVertical: 20 },
  stepRow: { flexDirection: "row", alignItems: "center" },

  stepName: { fontWeight: "bold", fontSize: 18 },
  stepDescription: { fontSize: 18, marginTop: 5 }
});
