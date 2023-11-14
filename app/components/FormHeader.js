import React from "react";
import { View, StyleSheet, Text, Animated } from "react-native";

const FormHeader = ({
  leftHeading,
  rightHeading,
  subHeading,
  leftHeaderTranslateX = 40,
  rightHeaderTranslateY = -20,
  rightHeaderOpacity = 0,
}) => {
  return (
    <View style={{ paddingTop: 30 }}>
      <View style={{ height: 100 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Animated.Text
            style={[
              styles.heading,
              { transform: [{ translateX: leftHeaderTranslateX }] },
            ]}
          >
            {leftHeading}{" "}
          </Animated.Text>
          <Animated.Text
            style={[
              styles.heading,
              {
                opacity: rightHeaderOpacity,
                transform: [{ translateY: rightHeaderTranslateY }],
              },
            ]}
          >
            {rightHeading}
          </Animated.Text>
        </View>
        <Text style={styles.subHeading}>{subHeading}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
    color: "rgba(132,105,207,1)",
  },
  subHeading: {
    fontSize: 28,
    color: "#1b1b33",
    textAlign: "center",
  },
});

export default FormHeader;
