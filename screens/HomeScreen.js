import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Modal,
} from "react-native";
import React from "react";
import { useState, useEffect } from "react";
import Moment from "react-moment";
import moment from "moment";

import FontAwesome from "react-native-vector-icons/FontAwesome";
import Register from "../components/Register";
import Connect from "../components/Connect";
import { useSelector } from "react-redux";
export default function HomeScreen({ navigation }) {
  const User = useSelector((state) => state.user.value);
  const [date, setDate] = useState();

  const [isModalVisible, setIsModalVisible] = useState(false);

  //
  const [isRegister, setIsRegister] = useState(true);
  //direct connect
  useEffect(() => {
    if (User.token) {
      navigation.navigate("TabNavigator");
      setDate(new Date());
    }
  }, []);

  const showModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const userSection = (
    <FontAwesome
      style={styles.connectIcon}
      name="user"
      onPress={() => showModal()}
    />
  );

  return (
    <ImageBackground
      style={styles.containerHome}
      source={require("../assets/background.png")}
      resizeMode="cover"
    >
      <View>
        <View>
          <Moment style={styles.date} element={Text} format="Do MMM YYYY">
            {moment(date)}
          </Moment>
        </View>
        <View>
          <Text style={styles.titleHome}>Discover</Text>
          <Text>Latest tech Articles, Last cinema movies,</Text>
          <Text>Instant Weather!</Text>
        </View>

        {isModalVisible ? (
          <Modal closable={false} footer={null} visible={isModalVisible}>
            <View>
              <FontAwesome
                style={styles.backIcon}
                name="arrow-left"
                onPress={() => setIsModalVisible()}
              />
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
              }}
            >
              <TouchableOpacity
                style={isRegister ? { borderBottomWidth: 3 } : null}
                onPress={() => setIsRegister(true)}
              >
                <Text
                  style={{
                    ...styles.btn_navigation,
                    paddingBottom: 4,
                  }}
                >
                  Register
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={isRegister ? null : { borderBottomWidth: 3 }}
                onPress={() => setIsRegister(false)}
              >
                <Text style={styles.btn_navigation}>Connect</Text>
              </TouchableOpacity>
            </View>
            {isRegister ? <Register /> : <Connect />}
          </Modal>
        ) : (
          <TouchableOpacity
            onPress={() => showModal()}
            style={styles.learnMore}
          >
            <Text
              style={{
                fontSize: 20,
                color: "black",
                textShadowColor: "black",
                textShadowOffset: { width: 0, height: 1 },
                textShadowRadius: 5,
                left: 85,
              }}
            >
              "Learn More"
            </Text>
            <FontAwesome
              style={styles.connectIcon}
              name="hand-pointer-o"
              onPress={() => showModal()}
            />
          </TouchableOpacity>
        )}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  containerHome: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  date: {
    color: "white",
    textShadowColor: "black",
    textShadowOffset: { width: 2, height: 3 },
    textShadowRadius: 5,
    bottom: 150,
    right: 10,
  },

  titleHome: {
    color: "white",
    fontSize: 45,
    textShadowColor: "black",
    textShadowOffset: { width: 2, height: 3 },
    textShadowRadius: 5,
    left: 28,
  },
  learnMore: {
    top: 140,
  },

  connectIcon: {
    fontSize: 45,
    left: 120,
    top: 20,

    color: "black",
    elevation: 10,
  },
  backIcon: {
    fontSize: 30,
  },

  btn_navigation: {
    fontSize: 22,
    fontWeight: "700",
  },
});
