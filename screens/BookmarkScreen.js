import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Header from "../components/Header";
import { removeBookmark } from "../reducers/bookmarks";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";

export default function BookmarkScreen() {
  const dispatch = useDispatch();
  const bookmarks = useSelector((state) => state.bookmarks.value);

  const handleRemoveMedia = (bookmark) => {
    dispatch(removeBookmark(bookmark));
  };
  const handleReadMore = (url) => {
    Linking.openURL(url);
  };
  return (
    <View style={{ height: "100%" }}>
      <View style={{ height: "22%" }}>
        <Header />
      </View>

      <ScrollView>
        {bookmarks.map((bookmark, i) => (
          <View style={styles.card} key={i}>
            <Image
              source={{ uri: bookmark.urlToImage }}
              style={styles.images}
            />
            <TouchableOpacity onPress={() => handleRemoveMedia(bookmark)}>
              <FontAwesome name="trash" style={styles.bookmarkIcon} />
              <Text style={styles.titleArticle}>{bookmark.title}</Text>
            </TouchableOpacity>

            <Text style={styles.descriptionArticle}>
              {bookmark.description}
            </Text>
            <TouchableOpacity onPress={() => handleReadMore(bookmark.url)}>
              <Text style={styles.customLink}>En savoir plus...</Text>
            </TouchableOpacity>
            <Text style={{ fontSize: 20 }}>{bookmark.author}</Text>
            <Text>
              Published le : {moment(bookmark.publishedAt).format("DD/MM/YYYY")}
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
    width: "95%",
    //flex: 1,
    alignItems: "center",
    marginBottom: 8,
    padding: 10,
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
