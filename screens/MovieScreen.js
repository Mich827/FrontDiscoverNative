import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Modal,
  Image,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React from "react";
import Header from "../components/Header";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMovies, removeMovies } from "../reducers/likedMovies";

export default function MovieScreen() {
  const dispatch = useDispatch();
  const likedMovie = useSelector((state) => state.likedMovies.value);
  console.log(likedMovie);
  const [moviesData, setMoviesData] = useState([]);
  const [likedMovies, setLikedMovies] = useState([]);
  //
  const [isModal, setIsModal] = useState(false);
  useEffect(() => {
    fetch("http:192.168.1.188:3000/movies")
      .then((response) => response.json())
      .then((data) => {
        //console.log(data);
        setMoviesData(data.movies);
      });
  }, []);

  //function for limit number of caractères
  function limitCaracteres(texte, limite) {
    if (texte.length > limite) {
      return texte.substring(0, limite) + "...";
    } else {
      return texte;
    }
  }
  //vrified if a movie is like
  const isMovieLiked = (movie) => {
    return likedMovie.includes(movie.title);
  };
  //liked movies
  const handleLikeMovie = (movieTitle) => {
    if (likedMovies.find((movie) => movie === movieTitle)) {
      setLikedMovies(likedMovies.filter((movie) => movie !== movieTitle));
      dispatch(removeMovies(movieTitle));
      console.log(movieTitle);
    } else {
      setLikedMovies([...likedMovies, movieTitle]);
      dispatch(addMovies(movieTitle));
      console.log(movieTitle);
    }
  };
  const showModal = () => {
    setIsModal(!isModal);
  };

  return (
    <View style={{ height: "100%", position: "relative" }}>
      <View style={{ height: "18%" }}>
        <Header />
      </View>
      <TouchableOpacity style={{ top: -0 }} onPress={() => showModal()}>
        <FontAwesome
          style={{
            fontSize: 20,
            color: likedMovie.length > 0 ? "red" : "black",
          }}
          name="heart"
        />
        <Text>{likedMovie.length} movie(s)</Text>
      </TouchableOpacity>
      <View
        style={{
          flex: 1,
          alignItems: "center",
        }}
      >
        {isModal && (
          <Modal animationType="slide" transparent={true} visible={isModal}>
            <View
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.8)",

                height: "40%",
                width: "60%",
                borderRadius: 20,
                padding: 10,

                left: 10,
                top: 65,
              }}
            >
              <ScrollView>
                {likedMovie.map((move, i) => (
                  <View
                    key={i}
                    style={{
                      backgroundColor: "rgb(27, 158, 114)",
                      width: "90%",
                      borderRadius: 10,

                      padding: 10,
                      margin: 10,
                      left: 10,
                      elevation: 15,
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        textAlign: "center",
                        textShadowColor: "black",
                        textShadowOffset: { width: 2, height: 2 },
                        textShadowRadius: 5,
                        fontSize: 15,
                      }}
                    >
                      {move}
                    </Text>
                  </View>
                ))}
              </ScrollView>
              <FontAwesome
                style={styles.backIcon}
                name="arrow-left"
                onPress={() => setIsModal()}
              />
            </View>
          </Modal>
        )}
      </View>
      <ScrollView>
        {moviesData.map((movie, i) => (
          <View style={styles.card} key={i}>
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/w500//${movie.poster_path}`,
              }}
              alt={movie.poster_path}
              style={styles.images}
            />
            <Text style={styles.titleMovie}>{movie.title}</Text>
            <Text style={styles.descMovie}>
              {limitCaracteres(movie.overview, 250)}
            </Text>
            <Text style={""}>{movie.release_date}</Text>
            <FontAwesome
              name="heart"
              onPress={() => handleLikeMovie(movie.title)}
              style={
                isMovieLiked(movie)
                  ? { color: "red", fontSize: 30 }
                  : { color: "black", fontSize: 30 }
              }
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  images: {
    width: "96%",
    height: 200,
    resizeMode: "cover",
    borderRadius: 10,
  },
  card: {
    width: "96%",

    alignItems: "center",
    padding: 17,
    backgroundColor: "white",
    borderRadius: 20,
    marginBottom: 10,
    elevation: 10, // add shadow for Android
    shadowColor: "black", // add shadow for ios
    shadowOffset: { width: 0, height: 4 }, // add shadow for ios
    shadowOpacity: 0.25, // Add shadow for iOS
    shadowRadius: 3.84, // add shadow for ios
  },
  titleMovie: {
    fontWeight: "800",
    fontSize: 20,
  },
  descMovie: {
    fontWeight: "300",
    fontSize: 14,
  },
  bookmarkIcon: {
    color: "rgb(27, 158, 114)",
    fontSize: 30,
    left: 220,
  },

  backIcon: {
    fontSize: 20,
    margin: 10,

    color: "rgb(27, 158, 114)",
  },
});
