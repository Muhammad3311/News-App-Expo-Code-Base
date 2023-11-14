import React, { useContext } from "react";
import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import AppForm from "./app/components/AppForm";
import ImageUpload from "./app/components/ImageUpload";
import Profile from "./app/components/Profile";
import { View, Text, TouchableOpacity } from "react-native";
import { useLogin } from "./app/components/LoginForm";
import LoginProvider from "./app/context/LoginProvider";
import { Provider } from "react-redux";
import store from "./app/redux/store";
import SignupForm from "./app/components/SignupForm";

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen component={AppForm} name="AppForm" />
      <Stack.Screen component={ImageUpload} name="ImageUpload" />
      <Stack.Screen component={Profile} name="Profile" />
    </Stack.Navigator>
  );
};

export default function App() {
  // const { isLoggedIn } = useLogin();
  return (
    <>
      <Provider store={store}>
        <NavigationContainer>
          <LoginProvider>
            {/* {isLoggedIn ? <ImageUpload /> : <Profile />} */}
            <StackNavigator />
          </LoginProvider>
        </NavigationContainer>
      </Provider>
    </>
  );
}
