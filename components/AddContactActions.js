import React from "react";
import { StyleSheet, View } from "react-native";
import AddContactButton from "./AddContactButton";

function AddContactActions({ isParent, appearance, handleAddContact }) {
  return (
    <View style={styles.addContactActions}>
      {isParent ? (
        <AddContactButton
          appearance={appearance}
          onPress={() => handleAddContact({ type: "kid" })}
        >
          Add a kid
        </AddContactButton>
      ) : (
        <React.Fragment>
          <AddContactButton
            appearance={appearance}
            onPress={() => handleAddContact({ type: "parent" })}
          >
            Add parent
          </AddContactButton>
          <AddContactButton
            appearance={appearance}
            onPress={() => handleAddContact({ type: "friend" })}
          >
            Add friend
          </AddContactButton>
        </React.Fragment>
      )}
    </View>
  );
}
export default AddContactActions;

const styles = StyleSheet.create({
  addContactActions: {
    marginVertical: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly"
  }
});
