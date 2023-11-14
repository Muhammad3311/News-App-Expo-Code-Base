import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";

const FormContainer = ({ children }) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width,
    paddingHorizontal: 20,
  },
});

export default FormContainer;
