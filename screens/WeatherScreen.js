import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Pressable,
} from "react-native";
import React from "react";
import Header from "../components/Header";
import { useState } from "react";
import { addWeatherToStore, removeWeatherToStore } from "../reducers/user";
import { useDispatch, useSelector } from "react-redux";

export default function WeatherScreen() {
  const dispatch = useDispatch();
  const User = useSelector((state) => state.user.value);

  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  /*const infoWeather = {
    cityName: city,
  };*/
  const fetchWeatherData = () => {
    if (city === "") {
      alert("write city");
    }
    //1
    fetch(`http:192.168.1.188:3000/weather`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cityName: city }),
    })
      .then((response) => response.json())
      .then((data) => {
        //console.log(data);
        if (data.result) {
          setWeatherData(data.weather);
          dispatch(addWeatherToStore(data.weather));
          console.log(data.weather);
          setCity("");
          setError(null);
        } else {
          setWeatherData(null);
          setError(data.error);
        }
      })
      .catch((error) => {
        console.error(
          "Une erreur s'est produite lors de la récupération des données météorologiques :",
          error
        );
        setWeatherData(null);
        setError("Erreur de réseau");
      });
  };

  const deleteCity = (cityName) => {
    fetch(`http:192.168.1.188:3000/weather/${cityName}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      //body: JSON.stringify(infoWeather),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete city");
        }
        return response.json();
      })
      .then((data) => {
        setCity("");
        setWeatherData("");
        setError(null);
      })
      .catch((error) => {
        console.error("Error deleting city:", error);
      });
  };
  //image icon
  const renderWeatherIcon = () => {
    if (!weatherData) return null;
    // Map weather description to corresponding image/icon
    const weatherIcons = {
      "clear sky": require("../assets/Clear.png"),
      "overcast clouds": require("../assets/Clouds.png"),
      "light rain": require("../assets/Rain.png"),
      "few clouds": require("../assets/Clouds.png"),
      "scattered clouds": require("../assets/Clouds.png"),
      "moderate rain": require("../assets/Rain.png"),
      snow: require("../assets/snow.jpg"),
      "broken clouds": require("../assets/brokenClouds.png"),
      "light snow": require("../assets/lightSnow.png"),

      // Add more mappings as needed
    };
    const weatherDescription = weatherData.description.toLowerCase();
    const iconSource = weatherIcons[weatherDescription];
    return <Image style={styles.icon} source={iconSource} alt="" />;
  };
  /*const handleRemoveweather = () => {
    dispatch(removeWeatherToStore());
  };*/
  //color temp
  const getTemperatureColor = () => {
    // Supposons que vous définissez une plage de température pour "chaud" et "froid"
    const temperature = parseInt(weatherData.temp); // Assurez-vous de convertir en entier
    if (temperature > 25) {
      return styles.hotTemperature; // Classe CSS pour la température chaude
    } else if (temperature < 10) {
      return styles.coldTemperature; // Classe CSS pour la température froide
    } else {
      return styles.normalTemperature; // Classe CSS pour la température normale
    }
  };
  return (
    <View>
      <View>
        <Header />
      </View>
      <ScrollView style={styles.containerProfil}>
        <View style={styles.meteo}>
          <Text
            style={{
              color: "white",
              textShadowColor: "black",
              textShadowOffset: { width: 2, height: 2 },
              textShadowRadius: 5,
              fontSize: 20,
              top: 5,
              padding: 5,
            }}
          >
            Give me the meteo
          </Text>
          <TextInput
            placeholder="Nom de la ville"
            onChangeText={(value) => setCity(value)}
            value={city}
            onPressIn={() => deleteCity()}
          />
          <Pressable
            style={{
              color: "white",
              backgroundColor: "#16a085",
            }}
            onPress={fetchWeatherData}
          >
            <Text>Obtenir Météo</Text>
          </Pressable>

          <View>
            {weatherData && (
              <View style={styles.result}>
                <Text style={styles.textMeteo}>
                  Ville: {weatherData.cityName.toUpperCase()}
                </Text>
                <Text style={styles.textMeteo}>
                  Description : {weatherData.description}
                </Text>
                {renderWeatherIcon()}
                <Text style={getTemperatureColor()}>
                  Température : {weatherData.temp}
                </Text>

                <Text style={getTemperatureColor()}>
                  Température minimale : {weatherData.tempMin}
                </Text>
                <Text style={getTemperatureColor()}>
                  Température maximale : {weatherData.tempMax}
                </Text>
              </View>
            )}
          </View>

          {error && <Text style={{ color: "red" }}>{error}</Text>}
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  textMeteo: {
    color: "orange",
  },
  coldTemperature: {
    color: "rgb(12, 92, 177)",
  },
  hotTemperature: {
    color: "rgb(176, 18, 4)",
  },
  normalTemperature: {
    color: "rgb(123, 116, 6)",
  },
  icon: {
    width: "90%",
    height: "60%",
    resizeMode: "center",
  },
  meteo: {
    height: 600,
    margin: 15,
    flex: 1,
    //justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightgrey",
    borderRadius: 20,
    marginBottom: 10,
    elevation: 10, // add shadow for Android
    shadowColor: "black", // add shadow for ios
    shadowOffset: { width: 0, height: 4 }, // add shadow for ios
    shadowOpacity: 0.25, // Add shadow for iOS
    shadowRadius: 3.84, // add shadow for ios
  },
});
