import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { removeUserToStore } from "../reducers/user";
import { removeAllMovies } from "../reducers/likedMovies";
import { removeAllBookmark } from "../reducers/bookmarks";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
export default function Header() {
  const User = useSelector((state) => state.user.value);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const handleLogout = () => {
    dispatch(removeUserToStore());
    dispatch(removeAllMovies());
    dispatch(removeAllBookmark());
    navigation.navigate("Home");
  };
  return (
    <View style={styles.containerHeader}>
      <View style={{ right: 200, top: 25 }}>
        <Text style={styles.titleHeader}>Discover</Text>
      </View>
      <View>
        <Text style={styles.welcomeHeader}>Welcome: "{User.username}"</Text>
      </View>

      <TouchableOpacity onPress={() => handleLogout()}>
        <Text style={styles.btnLogout}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  containerHeader: {
    justifyContent: "center",
    alignItems: "flex-end",
    backgroundColor: "#52AB6E",
    //height: "10%",
    padding: 20,
    borderWidth: 1,
    borderColor: "grey",
  },
  titleHeader: {
    color: "white",
    fontSize: 25,
    textShadowColor: "black",
    textShadowOffset: { width: 2, height: 3 },
    textShadowRadius: 5,
  },
  welcomeHeader: {
    color: "white",
    fontSize: 20,
    textShadowColor: "black",
    textShadowOffset: { width: 2, height: 3 },
    textShadowRadius: 5,
  },
  btnLogout: {
    backgroundColor: "#086b57",
    borderRadius: 10,
    elevation: 10,
    color: "white",
    padding: 3,
    margin: 1,
  },
});
