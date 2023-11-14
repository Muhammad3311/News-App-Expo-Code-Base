import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import FormContainer from "./FormContainer";
import FormInput from "./FormInput";
import FormSubmitBtn from "./FormSubmitBtn";
import { isValidObjField, updateError, isValidEmail } from "./utils/methods";
import { Formik } from "formik";
import * as Yup from "yup";
import client from "../api/client";
import { StackActions } from "@react-navigation/native";
import { useLogin } from "../context/LoginProvider";
import { signIn } from "../api/User";
import { getToken } from "../redux/actions";
import { useDispatch } from "react-redux";

const validationSchema = Yup.object({
  fullname: Yup.string()
    .trim()
    .min(3, "Invalid name")
    .required("Name is required!"),
  email: Yup.string().email("Invalid email").required("Email is required!"),
  password: Yup.string()
    .trim()
    .min(8, "Password is too short")
    .required("Password is required!"),
  confirmPassword: Yup.string().equals(
    [Yup.ref("password"), null],
    "Password does not match!"
  ),
});

const SignupForm = ({ navigation }) => {
  const userInfo = {
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const { loginPending, setLoginPending } = useLogin();

  const { fullname, email, password, confirmPassword } = userInfo;
  const handleOnChangeText = (value, fieldName) => {
    setUserInfo({ ...userInfo, [fieldName]: value });
  };
  const isValidForm = () => {
    if (!isValidObjField(userInfo))
      return updateError("Required all fields!", setError);
    if (!fullname.trim() || fullname.length < 3)
      return updateError("Invalid name!", setError);
    if (!isValidEmail(email)) return updateError("Invalid email!", setError);
    if (!password.trim() || password.length < 8)
      return updateError("Password is less than 8 characters!", setError);
    if (password !== confirmPassword)
      return updateError("Password does not match!", setError);

    return true;
  };
  const submitForm = () => {
    if (isValidForm()) {
    }
  };

  const signUp = async (values, formikActions) => {
    setLoginPending(true);
    const res = await client.post("/create-user", {
      ...values,
    });
    if (res.data.success) {
      // const signInRes = await client.post("/sign-in", {
      //   email: values.email,
      //   password: values.password,
      // }); // we use values bcz of Formik
      // above code is for direct user and below is to save token in device
      const signInRes = await signIn(values.email, values.password);

      if (signInRes.data.success) {
        // if true
        navigation.dispatch(
          StackActions.replace("ImageUpload", {
            token: signInRes.data.token,
          })
        );
      }
      const tk = signInRes.data.token;
      dispatch(getToken(tk));
    }
    // console.log("$$$", res.data);
    formikActions.resetForm();
    formikActions.setSubmitting(false);
    setLoginPending(false);
  };
  return (
    <FormContainer>
      <Formik
        initialValues={userInfo}
        validationSchema={validationSchema}
        onSubmit={signUp}
      >
        {({
          values,
          errors,
          touched,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => {
          const { fullname, email, password, confirmPassword } = values;
          return (
            <>
              <FormInput
                value={fullname}
                error={touched.fullname && errors.fullname}
                onBlur={handleBlur("fullname")}
                onChangeText={handleChange("fullname")}
                label="Full Name"
                placeholder="John Smith"
              />
              <FormInput
                value={email}
                error={touched.email && errors.email}
                onBlur={handleBlur("email")}
                onChangeText={handleChange("email")}
                autoCapitalize="none"
                label="Email"
                placeholder="example@email.com"
              />
              <FormInput
                value={password}
                error={touched.password && errors.password}
                onBlur={handleBlur("password")}
                onChangeText={handleChange("password")}
                secureTextEntry
                autoCapitalize="none"
                label="Password"
                placeholder="*******"
              />
              <FormInput
                value={confirmPassword}
                error={touched.confirmPassword && errors.confirmPassword}
                onBlur={handleBlur("confirmPassword")}
                onChangeText={handleChange("confirmPassword")}
                secureTextEntry
                autoCapitalize="none"
                label="Confirm Password"
                placeholder="*******"
              />
              <FormSubmitBtn
                submitting={isSubmitting}
                onPress={handleSubmit}
                title="Sign up"
              />
            </>
          );
        }}
      </Formik>
    </FormContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: Dimensions.get("window").width,
  },
});

export default SignupForm;
