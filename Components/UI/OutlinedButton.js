import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/styles/colors";

const OutlinedButton = ({ name, children, onPress, style }) => {
  return (
    <Pressable
      style={({ pressed }) => [styles.container, pressed && styles.pressed, style]}
      onPress={onPress}
    >
      <Ionicons name={name} size={20} color={Colors.primary200}/>
      <Text style={styles.label}>{children}</Text>
    </Pressable>
  );
};

export default OutlinedButton;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderColor: Colors.primary200,
    borderWidth: 1
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: Colors.primary200
  },
  pressed: {
    opacity: 0.5,
  },
});