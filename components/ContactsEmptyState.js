import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "@ui-kitten/components";
import AddContactActions from "./AddContactActions";
function ContactsEmptyState({ isParent, handleAddContact }) {
  return (
    <View>
      <Text style={styles.emptyStateIntroText}>
        You are ready to add{" "}
        {isParent ? "a teeny bopper" : "parents and friends"}. Let's do this!
      </Text>
      <AddContactActions
        isParent={isParent}
        handleAddContact={handleAddContact}
        appearance="primary"
      />
    </View>
  );
}
export default ContactsEmptyState;

const styles = StyleSheet.create({
  emptyStateIntroText: {
    marginTop: 20,
    fontWeight: "normal",
    fontSize: 18,
    lineHeight: 22
  }
});
