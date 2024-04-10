import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUserToStore } from "../reducers/user";
import { useNavigation } from "@react-navigation/native";

export default function Connect() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [usernameConnect, setUsernameConnect] = useState("");
  const [pwConnect, setPwConnect] = useState("");

  //fetch for connect existant user
  const handleConnect = async () => {
    if (!usernameConnect || !pwConnect) {
      return alert("empty field");
    }

    console.log(usernameConnect, pwConnect);

    try {
      const response = await fetch("http://192.168.1.188:3000/users/connect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: usernameConnect,
          password: pwConnect,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      dispatch(
        addUserToStore({
          username: usernameConnect,
          token: data.token,
        })
      );

      setUsernameConnect("");
      setPwConnect("");
      //setIsModalVisible("false");
      navigation.navigate("TabNavigator");
    } catch (error) {
      console.error("An unexpected error occurred:", error);
      // Gérer l'erreur ici (par exemple, afficher un message d'erreur à l'utilisateur)
    }
  };

  return (
    <View style={styles.registerSection}>
      <TextInput
        style={styles.input}
        type="text"
        placeholder="write your username"
        onChangeText={(value) => setUsernameConnect(value)}
        value={usernameConnect}
      />
      <TextInput
        style={styles.input}
        type="password"
        placeholder="write your password"
        onChangeText={(value) => setPwConnect(value)}
        value={pwConnect}
      />
      <TouchableOpacity onPress={() => handleConnect()}>
        <Text
          style={{
            fontSize: 25,
            backgroundColor: "#52AB6E",
            color: "white",
            width: "40%",
            textAlign: "center",
          }}
        >
          Send
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  registerSection: {
    width: "70%",
    margin: 50,
    flex: 1,
    justifyContent: "center",
  },
  input: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderBottomColor: "gray",
    borderBottomWidth: 2,
    marginBottom: 20,
  },
});
