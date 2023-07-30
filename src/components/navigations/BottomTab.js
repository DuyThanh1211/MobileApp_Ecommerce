import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  TextInput,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NavigationContainer } from "@react-navigation/native";

const { width, height } = Dimensions.get("screen");

const BottomTab = () => {
  const navigate = useNavigation();

  const handleCartPress = () => {
    navigate.navigate("Cart");
  };

  const handleProfilePress = () => {
    navigate.navigate("Profile");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigate.navigate("Home")}>
        <AntDesign name="home" size={20} color="white" />
      </TouchableOpacity>

      <TouchableOpacity onPress={handleCartPress}>
        <AntDesign name="shoppingcart" size={20} color="white" />
      </TouchableOpacity>

      <TouchableOpacity onPress={handleProfilePress}>
        <AntDesign name="user" size={20} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default BottomTab;

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 1,
    width: width,
    height: 60,
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "black",
  },
});
