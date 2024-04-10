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

export default function Register() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [emailRegister, setEmailRegister] = useState("");
  const [usernameRegister, setUsernameRegister] = useState("");
  const [pwRegister, setPwRegister] = useState("");

  //fetch for register user
  const handleRegister = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!usernameRegister || !emailRegister || !pwRegister) {
      return alert("empty field");
    }
    if (!emailRegex.test(emailRegister)) {
      return alert("not an email format");
    }
    console.log(usernameRegister, emailRegister, pwRegister);
    fetch("http:192.168.1.188:3000/users/register", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        username: usernameRegister,
        email: emailRegister,
        password: pwRegister,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch(
          addUserToStore({
            username: usernameRegister,
            email: emailRegister,
            token: data.token,
          })
        );
        setUsernameRegister("");
        setEmailRegister("");
        setPwRegister("");
        //setIsModalVisible(false);
        navigation.navigate("TabNavigator");
      });
  };
  return (
    <View style={styles.registerSection}>
      <TextInput
        style={styles.input}
        type="text"
        placeholder="Write your username"
        id="signUpUsername"
        onChangeText={(value) => setUsernameRegister(value)}
        value={usernameRegister}
      />
      <TextInput
        style={styles.input}
        type="text"
        placeholder="Write your email"
        onChangeText={(value) => setEmailRegister(value)}
        value={emailRegister}
      />
      <TextInput
        style={styles.input}
        type="password"
        placeholder="Write your Password"
        id="signUpPassword"
        onChangeText={(value) => setPwRegister(value)}
        value={pwRegister}
      />
      <TouchableOpacity onPress={() => handleRegister()}>
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
