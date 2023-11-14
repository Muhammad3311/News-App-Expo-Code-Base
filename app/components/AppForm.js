import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Animated,
  Dimensions,
} from "react-native";
import FormHeader from "./FormHeader";
import FormSelectorBtn from "./FormSelectorBtn";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import axios from "axios";
import AppLoader from "../loader/AppLoader";
import { useLogin } from "../context/LoginProvider";

const { width } = Dimensions.get("window");

export default function AppForm({ navigation }) {
  const animation = useRef(new Animated.Value(0)).current;
  const scrollView = useRef();
  const { loginPending, setLoginPending } = useLogin();

  const fetchApi = async () => {
    try {
      // const res = await axios.get("http://localhost:8000/");// react-native doesn't allow us from local host therefore we should use our ip address
      const res = await axios.get("http://192.168.77.142:8000/");
      console.log(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchApi();
  }, []);

  const rightHeaderOpacity = animation.interpolate({
    inputRange: [0, width],
    outputRange: [1, 0],
  });
  const leftHeaderTranslateX = animation.interpolate({
    inputRange: [0, width],
    outputRange: [0, 40],
  });
  const rightHeaderTranslateY = animation.interpolate({
    inputRange: [0, width],
    outputRange: [0, -20],
  });
  const loginColorInterpolate = animation.interpolate({
    inputRange: [0, width],
    outputRange: ["rgba(132,105,207,1)", "rgba(132,105,207,0.5)"],
  });
  const SignUpColorInterpolate = animation.interpolate({
    inputRange: [0, width],
    outputRange: ["rgba(132,105,207,0.5)", "rgba(132,105,207,1)"],
  });
  return (
    <>
      <View style={{ flex: 1, paddingTop: 120 }}>
        <View style={{ height: 200 }}>
          <FormHeader
            leftHeading="Welcome"
            rightHeading="To"
            subHeading="MD Smart Corporation"
            rightHeaderOpacity={rightHeaderOpacity}
            leftHeaderTranslateX={leftHeaderTranslateX}
            rightHeaderTranslateY={rightHeaderTranslateY}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 20,
            marginBottom: 20,
          }}
        >
          <FormSelectorBtn
            style={styles.borderLeft}
            backgroundColor={loginColorInterpolate}
            title="Login"
            onPress={() => scrollView.current.scrollTo({ x: 0 })}
          />
          <FormSelectorBtn
            style={styles.borderRight}
            backgroundColor={SignUpColorInterpolate}
            title="Sign Up"
            onPress={() => scrollView.current.scrollTo({ x: width })}
          />
        </View>
        <ScrollView
          ref={scrollView}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16} // making the below animation smooth
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: animation } } }],
            { useNativeDriver: false }
          )}
        >
          <LoginForm navigation={navigation} />
          {/* AS in sign up form when we click on confirm password and hence keyboard
      hides the textinput it is because our scrollview is horizontal so to avoid this
      type of bugs we wrap Signup form in  */}
          <ScrollView>
            <SignupForm navigation={navigation} />
          </ScrollView>
        </ScrollView>
      </View>
      {loginPending ? <AppLoader /> : null}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  borderLeft: {
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  borderRight: {
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
});
