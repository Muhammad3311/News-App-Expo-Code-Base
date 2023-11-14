import React from "react";
import { View, Text } from "react-native";
import { useSelector } from "react-redux";

const Profile = () => {
  const reducerData = useSelector((state) => state.userData);
  console.warn("reducer Data", reducerData);

  if (!reducerData) {
    // Render a loading indicator or a placeholder here
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  // Once the data is available, render the profile information
  return (
    <View>
      <Text>Profile Screen</Text>
      {/* Render profile information here */}
    </View>
  );
};

export default Profile;
