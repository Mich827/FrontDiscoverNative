import { StatusBar } from "expo-status-bar";
//import { AsyncStorage } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import HomeScreen from "./screens/HomeScreen";
import BookmarkScreen from "./screens/BookmarkScreen";
import MediaScreen from "./screens/MediaScreen";
import MovieScreen from "./screens/MovieScreen";
import WeatherScreen from "./screens/WeatherScreen";
import user from "./reducers/user";
import likedMovies from "./reducers/likedMovies";
import bookmarks from "./reducers/bookmarks";
import storage from "redux-persist/lib/storage";
import { Provider } from "react-redux";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import AsyncStorage from "@react-native-async-storage/async-storage";
const persistConfig = { key: "discover", version: 1, storage: AsyncStorage };
const reducers = combineReducers({ user, bookmarks, likedMovies });

const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
const persistor = persistStore(store);
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = "";
          if (route.name === "Media") {
            iconName = "info";
          } else if (route.name === "Movie") {
            iconName = "film";
          } else if (route.name === "Weather") {
            iconName = "cloud";
          } else if (route.name === "Bookmark") {
            iconName = "book";
          }
          return <FontAwesome name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "rgb(27, 158, 114)",
        tabBarInactiveTintColor: "#335561",
        headerShown: false,
      })}
    >
      <Tab.Screen name="Media" component={MediaScreen} />
      <Tab.Screen name="Movie" component={MovieScreen} />
      <Tab.Screen name="Weather" component={WeatherScreen} />
      <Tab.Screen name="Bookmark" component={BookmarkScreen} />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="TabNavigator" component={TabNavigator} />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
