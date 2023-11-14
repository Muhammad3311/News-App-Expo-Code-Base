import React from "react";
import { View, Text, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";

const AppLoader = () => {
  return (
    <View style={[StyleSheet.absoluteFillObject, styles.container]}>
      <LottieView
        source={require("../../assets/lottie_json.json")}
        autoPlay
        loop
        // speed={80}
        // resizeMode="contain"
        // style={{
        //   width: 200,
        //   height: 200,
        // }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
    zIndex: 1,
  },
});

export default AppLoader;
