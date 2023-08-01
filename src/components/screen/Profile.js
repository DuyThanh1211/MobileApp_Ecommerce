import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { AntDesign, FontAwesome, Feather } from "@expo/vector-icons";
import BottomTab from "../navigations/BottomTab";
import { useNavigation } from "@react-navigation/native";
import { getData } from "../../features/MyA";
import { apiApp, apiKey } from "../../features/ApiKey";

const { width, height } = Dimensions.get("screen");

const Profile = () => {
  const navigate = useNavigation();
  const [userData, setUserData] = useState(null);

  const inUserID = async () => {
    try {
      const idUser = await getData("idUser");
      return idUser;
    } catch (error) {
      console.error("Error inUserID:", error);
      throw error;
    }
  };

  useEffect(() => {
    inUserID()
      .then((id) => {
        fetch(
          `https://api.backendless.com/${apiApp}/${apiKey}/data/Users/${id}`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        )
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            setUserData(data);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      })
      .catch((error) => {});
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTitle}>
          <Text style={styles.textHeader}>Profile</Text>
        </View>
        <Image
          style={styles.avatar}
          source={{
            uri: "https://cdn-icons-png.flaticon.com/512/6596/6596121.png",
          }}
        />
        {userData ? (
          <View style={styles.Text}>
            <Text style={styles.textname}> {userData.name}</Text>
            <Text style={styles.textmail}> {userData.phonenumber}</Text>
          </View>
        ) : (
          <Text>Loading...</Text>
        )}
      </View>
      <View style={styles.body}>
        <TouchableOpacity
          onPress={() => navigate.navigate("EditProfile")}
          style={styles.button}
        >
          <View style={styles.bodyItem}>
            <AntDesign
              name="adduser"
              size={30}
              color="white"
              style={styles.bodyIcon}
            />
            <Text style={styles.textBodyItem}>Edit Profile</Text>
            <AntDesign
              name="right"
              size={24}
              color="white"
              style={styles.backHeader}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <View style={styles.bodyItem}>
            <FontAwesome
              name="history"
              size={28}
              color="white"
              style={styles.bodyIcon}
            />
            <Text style={styles.textBodyItem}>History</Text>
            <AntDesign
              name="right"
              size={24}
              color="white"
              style={styles.backHeader}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <View style={styles.bodyItem}>
            <Feather
              name="settings"
              size={28}
              color="white"
              style={styles.bodyIcon}
            />
            <Text style={styles.textBodyItem}>Setting</Text>
            <AntDesign
              name="right"
              size={24}
              color="white"
              style={styles.backHeader}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigate.navigate("Begin")}
          style={styles.button}
        >
          <View style={styles.bodyItem}>
            <AntDesign
              name="logout"
              size={28}
              color="white"
              style={styles.bodyIcon}
            />
            <Text style={styles.textBodyItem}>Sign Out</Text>
            <AntDesign
              name="right"
              size={24}
              color="white"
              style={styles.backHeader}
            />
          </View>
        </TouchableOpacity>
      </View>
      <BottomTab />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  header: {
    width: width,
    height: (height * 40) / 100,
    backgroundColor: "grey",
    marginBottom: 50,
  },
  headerTitle: {
    marginVertical: 35,
    alignSelf: "center",
    color: "white",
  },
  Text: {
    justifyContent: "center",
    alignSelf: "center",
    marginVertical: 120,
  },
  textname: {
    fontSize: 23,
    fontWeight: "600",
    alignSelf: "center",
    color: "white",
  },
  textmail: {
    fontSize: 15,
    fontWeight: "200",
    marginLeft: 5,
    alignSelf: "center",
    color: "white",
  },
  backHeader: {
    marginHorizontal: 9,
  },
  textHeader: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 63,
    borderWidth: 6,
    alignSelf: "center",
    position: "absolute",
    marginTop: 100,
  },

  body: {
    width: width,
    height: (height * 50) / 100,
  },
  button: {
    borderWidth: 1,
    borderColor: "white",
    margin: 10,
    borderRadius: 10,
  },
  bodyItem: {
    width: width,
    height: (height * 7) / 100,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  textBodyItem: {
    fontSize: 18,
    fontWeight: "600",
    color: "white",
  },
});
