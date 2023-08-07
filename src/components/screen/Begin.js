import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { useNavigation } from "@react-navigation/core";

const Begin = () => {
  const navigate = useNavigation();

  const navigateToLogin = () => {
    navigate.navigate("Login");
  };
  return (
    <View style={styles.container}>
      <StatusBar />
      <ImageBackground
        style={styles.background}
        source={{
          uri: "https://e0.pxfuel.com/wallpapers/378/705/desktop-wallpaper-liverpool-players-model-new-2021-22-nike-home-kit-liverpool-fc-liverpool-squad-2021-2022-thumbnail.jpg",
        }}
        blurRadius={1.5}
      >
        <View style={styles.texthello}>
          <Text style={styles.Texts}>Hello!</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.Text1}>Login to purchase your item</Text>
        </View>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={navigateToLogin}
        >
          <Text style={styles.Text}>Login Now</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

export default Begin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    justifyContent: "center",
  },
  buttonContainer: {
    borderRadius: 5,
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "black",
    borderRadius: 15,
    padding: 10,
    paddingHorizontal: 100,
  },
  Text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  Texts: {
    fontSize: 50,
    fontWeight: "bold",
    marginBottom: 10,
    color: "white",
  },
  Text1: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "white",
  },
  textContainer: {
    alignItems: "center",
    marginVertical: 5,
  },
  texthello: {
    marginVertical: 10,
    alignItems: "center",
  },
});
