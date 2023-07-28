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
import { AntDesign, FontAwesome, Feather } from "@expo/vector-icons";

const { width, height } = Dimensions.get("screen");

const EditProfile = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTitle}>
          <TouchableOpacity>
            <AntDesign
              name="left"
              size={24}
              color="black"
              style={styles.backHeader}
            />
          </TouchableOpacity>
          <Text style={styles.textHeader}> Edit Profile</Text>
        </View>
        <Image
          style={styles.avatar}
          source={{ uri: "https://bootdey.com/img/Content/avatar/avatar6.png" }}
        />
      </View>

      <View style={styles.body}>
        <View style={styles.bodyItem}>
          <View style={styles.bodyText}>
            <Text style={styles.bodyTextTitle}> Full Name</Text>
            <TextInput placeholder="Full Name" style={styles.bodyTextInput} />
          </View>
        </View>
        <View style={styles.bodyItem}>
          <View style={styles.bodyText}>
            <Text style={styles.bodyTextTitle}> Address</Text>
            <TextInput placeholder="Address" style={styles.bodyTextInput} />
          </View>
        </View>
        <View style={styles.bodyItem}>
          <View style={styles.bodyText}>
            <Text style={styles.bodyTextTitle}> Phone Number</Text>
            <TextInput
              placeholder="Phone Number"
              style={styles.bodyTextInput}
            />
          </View>
        </View>
        <View style={styles.bodyItem}>
          <View style={styles.bodyText}>
            <Text style={styles.bodyTextTitle}> Password</Text>
            <TextInput placeholder="Password" style={styles.bodyTextInput} />
          </View>
        </View>
        <View style={styles.bodyItem}>
          <View style={styles.bodyText}>
            <Text style={styles.bodyTextTitle}> Confirm Password</Text>
            <TextInput
              placeholder="Confirm Password"
              style={styles.bodyTextInput}
            />
          </View>
        </View>
        <TouchableOpacity>
          <View style={styles.bodyButton}>
            <Text style={styles.bodyTextButton}> Update</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  header: {
    width: width,
    height: (height * 28) / 100,
  },
  headerTitle: {
    flexDirection: "row",
    marginVertical: 35,
    alignItems: "center",
  },
  Text: {
    justifyContent: "center",
    alignSelf: "center",
    marginVertical: 110,
  },
  textname: {
    fontSize: 23,
    fontWeight: "600",
  },
  textmail: {
    fontSize: 15,
    fontWeight: "200",
    marginLeft: 5,
  },
  backHeader: {
    marginHorizontal: 9,
  },
  textHeader: {
    marginLeft: "26.5%",
    fontSize: 18,
    fontWeight: "bold",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 63,
    borderColor: "#25CBF5",
    borderWidth: 6,
    alignSelf: "center",
    position: "absolute",
    marginTop: 90,
  },

  body: {
    width: width,
    height: (height * 60) / 100,
  },
  bodyItem: {
    width: width,
    height: (height * 9) / 100,
    marginTop: 10,
  },
  bodyTextTitle: {
    fontSize: 17,
    fontWeight: "600",
    marginBottom: 5,
    marginLeft: 15,
    marginRight: 15,
  },
  bodyTextInput: {
    height: 40,
    marginLeft: 15,
    marginRight: 15,
    backgroundColor: "#CCD2E8",
    padding: 10,
    borderRadius: 20,
  },
  bodyButton: {
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    borderWidth: 1,
    borderColor: '#CCD2E8',
    width: 170,
    height: 35,
    borderRadius: 20,
  },
  bodyTextButton:{
      fontSize: 20,
      fontWeight: 'bold',
      color: '#A9ACEB'
  },
});
