import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const FormSubmitBtn = ({ title, submitting, onPress }) => {
  const backgroundColor = submitting
    ? "rgba(132,105,207,1)"
    : "rgba(132,105,207,1)";
  return (
    <TouchableOpacity
      onPress={!submitting ? onPress : null}
      style={[styles.container, { backgroundColor }]}
    >
      <Text style={{ fontSize: 18, color: "#fff" }}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 45,
    backgroundColor: "rgba(27,27,51,1)",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default FormSubmitBtn;
