import React, { useState, useEffect } from "react";
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
const { width, height } = Dimensions.get("screen");
const BottomTab = () => {
  const navigation = useNavigation();

  const handleHomePress = () => {
    navigation.navigate("Home");
  };

  const handleCartPress = () => {
    navigation.navigate("Cart");
  };

  const handleProfilePress = () => {
    navigation.navigate("Profile");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleHomePress}>
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
