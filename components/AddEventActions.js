import React from "react";
import { StyleSheet, View, ScrollView, RefreshControl } from "react-native";
import {
  Icon,
  Layout,
  Text,
  Radio,
  Card,
  CardHeader,
  List,
  ListItem,
  Spinner
} from "@ui-kitten/components";
import Button from "./Button";
import { colors } from "../utils/style";

// const AddIcon = style => <Icon {...style} name="star" />;

const AddEventActions = ({ user, appearance = "outline", handleAddEvent }) => {
  const { isParent } = user;

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.sectionHeaderText}>Start a thread:</Text>
      </View>
      <View style={styles.buttonRow}>
        {isParent ? (
          <React.Fragment>
            <Button
              appearance={appearance}
              onPress={() => handleAddEvent({ type: "both" })}
            >
              Kids and parents
            </Button>
            <Button
              appearance={appearance}
              onPress={() => handleAddEvent({ type: "parents" })}
            >
              Parents only
            </Button>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Button
              appearance={appearance}
              onPress={() => handleAddEvent({ type: "both" })}
            >
              Kids and parents
            </Button>
            <Button
              appearance={appearance}
              onPress={() => handleAddEvent({ type: "kids" })}
            >
              Kids only
            </Button>
          </React.Fragment>
        )}
      </View>
    </View>
  );
};
export default AddEventActions;

const styles = StyleSheet.create({
  container: {},
  headerRow: {
    marginTop: 10
  },
  sectionHeaderText: {
    fontSize: 16,
    color: colors.brandColor,
    textTransform: "uppercase"
  },
  buttonRow: {
    marginBottom: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    alignItems: "center"
  }
});
