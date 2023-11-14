import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import client from "../api/client";
import { StackActions } from "@react-navigation/native";
import UploadProgress from "../loader/UploadProgress";
import { signIn, signOut, deleteUser, updateUser } from "../api/User";
import { useLogin } from "../context/LoginProvider";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";

const ImageUpload = (props) => {
  // const userData = useSelector((state) => state.userData);
  // const userToken = useSelector((state) => state.userToken);
  const [user, setUser] = useState("");
  const tt = useSelector((state) => state.userData);
  const dispatch = useDispatch();
  const { setIsLoggedIn, setLoginPending } = useLogin();
  const [profileImage, setProfileImage] = useState("");
  const [progress, setProgress] = useState(0);
  const { token } = props.route.params;
  const openImageLibrary = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry we need camera roll permissions to make this work!");
    }
    if (status === "granted") {
      const response = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
      });
      if (!response.canceled) {
        setProfileImage(response.uri);
      }
    }
  };
  const uploadProfileImage = async () => {
    // console.log("profile image", profileImage);
    const formData = new FormData();
    formData.append("profile", {
      name: new Date() + "_profile",
      uri: profileImage,
      type: "image/jpg",
    });

    try {
      const res = await client.post("/upload-profile", formData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
          Authorization: `JWT ${token}`,
        },
        onUploadProgress: ({ loaded, progress }) =>
          setProgress(loaded / progress),
      });
      if (res.data.success) {
        // if true
        props.navigation.dispatch(StackActions.replace("Profile"));
      }
      console.log("data new", res.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (tt) {
      setUser(tt);
    }
  }, [tt]);

  // const handleDeleteUser = async () => {
  //   const tk = userData[0].token;
  //   console.log("tk", tk);
  //   if (user !== null) {
  //     const data = user[0].user;
  //     const userEmail = _.get(data, "email");
  //     // const userEmailToDelete = user.email; // Assuming each user object has an 'email' property
  //     deleteUser({ email: userEmail });
  //     props.navigation.dispatch(StackActions.replace("AppForm"));
  //   }
  // };
  const handleDeleteUser = async () => {
    const tokenObject = user;
    const currentToken = _.get(tokenObject, "[0].token");
    if (currentToken !== null) {
      deleteUser({ token: currentToken });
      props.navigation.dispatch(StackActions.replace("AppForm"));
    }

    // if (user !== null) {
    //   const data = user[0].user; // Assuming 'user' property exists within 'userData'
    // const userEmail = _.get(data, "email"); // No longer needed

    // Assuming the deleteUser function takes an object with 'token' property
    // deleteUser({ token: tk });

    // props.navigation.dispatch(StackActions.replace("AppForm"));
    // }
  };

  const handleUpdateUser = async () => {
    const tokenObject = user;
    const currentToken = _.get(tokenObject, "[0].token");
    if (currentToken !== null) {
      const data = {
        fullname: "Rashid",
        email: "rr@gmail.com",
        password: "asdfghjk",
      };
      updateUser({ token: currentToken, data: data });
      // props.navigation.dispatch(StackActions.replace("AppForm"));
    }
  };

  return (
    <>
      <View style={styles.container}>
        <View>
          <TouchableOpacity
            onPress={openImageLibrary}
            style={styles.uploadBtnContainer}
          >
            {profileImage ? (
              <Image
                source={{ uri: profileImage }}
                style={{ width: "100%", height: "100%" }}
              />
            ) : (
              <Text style={styles.uploadBtn}>Upload Profile Image</Text>
            )}
          </TouchableOpacity>
          {/* {progress ? <Text>{progress}</Text> : null} */}
          <Text style={styles.skip}>Skip</Text>
          {profileImage ? (
            <Text
              onPress={uploadProfileImage}
              style={[
                styles.skip,
                { backgroundColor: "green", color: "white", borderRadius: 8 },
              ]}
            >
              Upload
            </Text>
          ) : null}
        </View>
      </View>
      {progress ? <UploadProgress process={progress} /> : null}
      <TouchableOpacity onPress={() => props.navigation.navigate("Profile")}>
        <Text>Go to Profile Screen</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => props.navigation.navigate("AppForm")}
        style={{
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "powderblue",
          width: "100%",
          height: 40,
          // position: "absolute",
          marginTop: 100,
        }}
      >
        <Text style={{ fontSize: 20, color: "white" }}>Login Screen</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleDeleteUser}
        style={{
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "orange",
          width: "100%",
          height: 40,
          // position: "absolute",
          marginTop: 100,
        }}
      >
        <Text style={{ fontSize: 20, color: "white" }}>Delete User</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleUpdateUser}
        style={{
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "orange",
          width: "100%",
          height: 40,
          // position: "absolute",
          marginTop: 100,
        }}
      >
        <Text style={{ fontSize: 20, color: "white" }}>Update User</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={async () => {
          setLoginPending(true);
          const isLoggedOut = await signOut();
          if (isLoggedOut) {
            setIsLoggedIn(false);
            console.log("logout successfully");
          }
          setLoginPending(false);
        }}
        style={{
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "green",
          width: "100%",
          height: 40,
          // position: "absolute",
          marginTop: 100,
        }}
      >
        <Text style={{ fontSize: 20, color: "white" }}>Log Out</Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  uploadBtnContainer: {
    height: 125,
    width: 125,
    borderRadius: 125 / 2,
    alignItems: "center",
    justifyContent: "center",
    borderStyle: "dashed",
    borderWidth: 1,
    overflow: "hidden",
  },
  uploadBtn: {
    textAlign: "center",
    fontSize: 16,
    opacity: 0.3,
    fontWeight: "bold",
  },
  skip: {
    textAlign: "center",
    padding: 10,
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 2,
    opacity: 0.5,
  },
});

export default ImageUpload;
