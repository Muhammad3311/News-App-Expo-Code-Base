import AsyncStorage from "@react-native-async-storage/async-storage";
import client from "./client";
export const signIn = async (email, password) => {
  try {
    const signInRes = await client.post("/sign-in", {
      email,
      password,
    });
    if (signInRes.data.success) {
      const token = signInRes.data.token;
      await AsyncStorage.setItem("key", token); // as token is already in string format that's why we can directly store it
    }
    return signInRes;
  } catch (error) {
    console.log("error inside sign in method", error.message);
  }
};

export const signOut = async () => {
  try {
    const tokens = await AsyncStorage.getItem("key", tokens);
    if (tokens !== null) {
      console.log("tokens", tokens);
      const res = await client.get("/sign-out", {
        headers: {
          Authorization: `JWT ${tokens}`,
        },
      });
      if (res.data.success) {
        await AsyncStorage.clear();
        return true;
      }
    }
    if (tokens === null) {
      console.warn("No token exist");
    }
    return false;
  } catch (error) {
    console.log("error inside sign out method", error.message);
    return false;
  }
};

export const deleteUser = async (newUser) => {
  try {
    const res = await client.delete("/users", { data: newUser });
    return res.data.success;
  } catch (error) {
    console.log("error inside delete user method", error.message);
    return false;
  }
};

export const updateUser = async (userData) => {
  try {
    const res = await client.put("/update-user", { data: userData });
    return res.data.success;
  } catch (error) {
    console.log("error inside update user method", error.message);
    return false;
  }
};
