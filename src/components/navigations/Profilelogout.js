import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

const Profile = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}></View>
      <Image 
        style={styles.avatar}
        source={{ uri: "https://bootdey.com/img/Content/avatar/avatar6.png" }}
      />
      <View style={styles.body}>
        <View style={styles.bodyContent}>
          <TouchableOpacity style={styles.buttonContainer}>
            <Text>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Profile;

