import React from "react";
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
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigate.navigate("Home")}>
        <AntDesign name="home" size={28} color="black" />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigate.navigate("Cart")}>
        <AntDesign name="shoppingcart" size={28} color="black" />
      </TouchableOpacity>

      <TouchableOpacity onPress={() =>navigate.navigate("Profile")}>
        <AntDesign name="user" size={28} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const BottomTabItem = () => {
  return <View></View>;
};

export default BottomTab;

const styles = StyleSheet.create({
  container: {
    width: width,
    height: 60,
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "red",
    alignItems: "center",
  },
});
