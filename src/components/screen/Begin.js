import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/core";

const Begin = () => {
  const navigate = useNavigation();

  const navigateToLogin = () => {
    navigate.navigate("Login");
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.background}
        source={{
          uri: "https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/h_540,c_limit/864c2d5e-6134-486a-b964-543056d58307/nike-just-do-it.png",
        }}
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
    resizeMode: "cover",
    justifyContent: "center",
  },
  buttonContainer: {
    borderRadius: 5,
    width: 300,
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "black",
    borderRadius: 25,
  },
  Text: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "white",
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
    marginVertical: 10, // Khoảng cách từ texthello tới các thành phần khác
    alignItems: "center", // Căn giữa theo chiều ngang
  },
});
