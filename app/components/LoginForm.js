import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
} from "react-native";
import FormContainer from "./FormContainer";
import FormInput from "./FormInput";
import FormSubmitBtn from "./FormSubmitBtn";
import { isValidEmail, isValidObjField, updateError } from "./utils/methods";
import client from "../api/client";
import { useLogin } from "../context/LoginProvider";
import { StackActions } from "@react-navigation/native";
import { signIn, signOut } from "../api/User";

import { addToCart, getToken } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";

const LoginForm = ({ navigation }) => {
  const dispatch = useDispatch();
  const { setIsLoggedIn } = useLogin();
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const { email, password } = userInfo;
  const { setLoginPending } = useLogin();

  const t = useSelector((state) => state.userToken);

  const handleOnChangeText = (value, fieldName) => {
    setUserInfo({ ...userInfo, [fieldName]: value });
  };
  const isValidForm = () => {
    if (!isValidObjField(userInfo))
      return updateError("Required all fields!", setError);
    if (!isValidEmail(email)) return updateError("Invalid email!", setError);
    if (!password.trim() || password.length < 8)
      return updateError("Password is less than 8 characters!", setError);

    return true;
  };
  const submitForm = async () => {
    setLoginPending(true);
    if (isValidForm()) {
      try {
        // const res = await client.post("/sign-in", { ...userInfo });
        const res = await signIn(userInfo.email, userInfo.password);
        if (res.data.success) {
          setUserInfo({ email: "", password: "" });
          setIsLoggedIn(true);
        }
        // console.log("res", res.data);
        if (res.data.success) {
          // if true
          navigation.dispatch(
            StackActions.replace("ImageUpload", {
              token: res.data.token,
            })
          );
        }
        dispatch(addToCart(res.data));
      } catch (error) {
        console.log("Error", error.message);
      }
    }
    setLoginPending(false);
  };
  function addToken() {
    setToken(t);
    console.warn("token in login", token);
  }
  return (
    <FormContainer>
      {error ? (
        <Text style={{ color: "red", fontSize: 18, textAlign: "center" }}>
          {error}
        </Text>
      ) : null}
      <FormInput
        value={email}
        onChangeText={(value) => handleOnChangeText(value, "email")}
        autoCapitalize="none"
        label="Email"
        placeholder="example@email.com"
      />
      <FormInput
        value={password}
        onChangeText={(value) => handleOnChangeText(value, "password")}
        secureTextEntry
        autoCapitalize="none"
        label="Password"
        placeholder="*******"
      />
      <FormSubmitBtn onPress={submitForm} title="Login" />
    </FormContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    width: Dimensions.get("window").width,
  },
});

export default LoginForm;
