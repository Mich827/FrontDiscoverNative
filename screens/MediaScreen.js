import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
  RefreshControl,
} from "react-native";
import React from "react";
import { useEffect, useState } from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import moment from "moment";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { addBookmark } from "../reducers/bookmarks";
export default function MediaScreen() {
  const dispatch = useDispatch();
  const [articlesData, setArticlesData] = useState([]);
  //for refresh
  const [refresh, setRefresh] = useState(false);
  //fetch backend
  useEffect(() => {
    fetch("http:192.168.1.188:3000/articles")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setArticlesData(data.articles);
      });
  }, []);
  //add bookmark to favorite and in the store redux
  const handleBookmarkClick = (article) => {
    dispatch(addBookmark(article));
  };
  //lien
  const handleReadMore = (url) => {
    Linking.openURL(url);
  };
  //for refresh
  const onRefresh = () => {
    setRefresh(true);
    setTimeout(() => {
      setRefresh(false);
    }, 2000);
  };
  return (
    <View style={{ height: "100%" }}>
      <View style={{ height: "20%" }}>
        <Header />
      </View>

      <ScrollView
        style={{
          height: "80%",
        }}
        refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
        }
      >
        {articlesData.map((article, i) => (
          <View key={i} style={styles.card}>
            <Image source={{ uri: article.urlToImage }} style={styles.images} />

            <TouchableOpacity onPress={() => handleBookmarkClick(article)}>
              <FontAwesome name="bookmark" style={styles.bookmarkIcon} />
              <Text style={styles.titleArticle}>{article.title}</Text>
            </TouchableOpacity>

            <Text style={styles.descriptionArticle}>{article.description}</Text>
            <TouchableOpacity onPress={() => handleReadMore(article.url)}>
              <Text style={styles.customLink}>En savoir plus...</Text>
            </TouchableOpacity>
            <Text style={{ fontSize: 20 }}>{article.author}</Text>
            <Text>
              Published le : {moment(article.publishedAt).format("DD/MM/YYYY")}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  images: {
    width: "95%",
    height: 200,
    resizeMode: "cover",
    borderRadius: 10,
  },
  card: {
    width: "98%",
    //flex: 1,
    alignItems: "center",

    padding: 15,
    backgroundColor: "white",
    borderRadius: 20,
    marginBottom: 10,
    elevation: 10, // add shadow for Android
    shadowColor: "black", // add shadow for ios
    shadowOffset: { width: 0, height: 4 }, // add shadow for ios
    shadowOpacity: 0.25, // Add shadow for iOS
    shadowRadius: 3.84, // add shadow for ios
  },
  titleArticle: {
    fontWeight: "800",
    fontSize: 20,
  },
  descriptionArticle: {
    fontWeight: "300",
    fontSize: 15,
  },
  bookmarkIcon: {
    color: "rgb(27, 158, 114)",
    fontSize: 30,
    left: 220,
  },
  customLink: {
    color: "#0a7962",
    fontSize: 18,
  },
});
