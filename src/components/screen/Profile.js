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
        fetch(`https://api.backendless.com/${apiApp}/${apiKey}/data/Users/${id}`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            setUserData(data); 
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      })
      .catch((error) => {
      });
  }, []);
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTitle}>
          <Text style={styles.textHeader}> Profile</Text>
        </View>
        <Image
          style={styles.avatar}
          source={{ uri: "https://bootdey.com/img/Content/avatar/avatar6.png" }}
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
        <TouchableOpacity onPress={() => navigate.navigate("EditProfile")}>
          <View style={styles.bodyItem}>
            <AntDesign
              name="adduser"
              size={30}
              color="black"
              style={styles.bodyIcon}
            />
            <Text style={styles.textBodyItem}> Edit Profile</Text>
            <AntDesign
              name="right"
              size={24}
              color="black"
              style={styles.backHeader}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity>
          <View style={styles.bodyItem}>
            <FontAwesome
              name="history"
              size={28}
              color="black"
              style={styles.bodyIcon}
            />
            <Text style={styles.textBodyItem2}> History</Text>
            <AntDesign
              name="right"
              size={24}
              color="black"
              style={styles.backHeader}
            />
          </View>
        </TouchableOpacity>
        <View style={styles.bodyborder}></View>
        <TouchableOpacity onPress={() => navigate.navigate("Setting")}>
          <View style={styles.bodyItem2}>
            <Feather
              name="settings"
              size={28}
              color="black"
              style={styles.bodyIcon}
            />
            <Text style={styles.textBodyItem3}> Setting</Text>
            <AntDesign
              name="right"
              size={24}
              color="black"
              style={styles.backHeader}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigate.navigate("Begin")}>
          <View style={styles.bodyItem2}>
            <AntDesign
              name="logout"
              size={28}
              color="black"
              style={styles.bodyIcon}
            />
            <Text style={styles.textBodyItem4}> Sign Out</Text>
            <AntDesign
              name="right"
              size={24}
              color="black"
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
    backgroundColor: "#f2f2f2",
  },
  header: {
    width: width,
    height: (height * 40) / 100,
  },
  headerTitle: {
    marginVertical: 35,
    alignSelf: "center",
  },
  Text: {
    justifyContent: "center",
    alignSelf: "center",
    marginVertical: 120,
  },
  textname: {
    fontSize: 23,
    fontWeight: "600",
    alignSelf: 'center'
  },
  textmail: {
    fontSize: 15,
    fontWeight: "200",
    marginLeft: 5,
    alignSelf: 'center'
  },
  backHeader: {
    marginHorizontal: 9,
  },
  textHeader: {
    fontSize: 20,
    fontWeight: "bold",
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 63,
    borderColor: "#25CBF5",
    borderWidth: 6,
    alignSelf: "center",
    position: "absolute",
    marginTop: 100,
  },

  body: {
    width: width,
    height: (height * 50) / 100,
    borderTopWidth: 1,
    borderColor: "#ACB7BF",
  },
  bodyItem: {
    width: width,
    height: (height * 7) / 100,
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  bodyborder: {
    borderTopWidth: 1,
    borderColor: "#ACB7BF",
    marginTop: 10,
  },
  bodyItem2: {
    width: width,
    height: (height * 7) / 100,
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textBodyItem2: {
    fontSize: 18,
    fontWeight: "600",
    marginLeft: -175,
  },
  textBodyItem3: {
    fontSize: 18,
    fontWeight: "600",
    marginLeft: -180,
  },
  textBodyItem4: {
    fontSize: 18,
    fontWeight: "600",
    marginLeft: -170,
  },
  textBodyItem: {
    fontSize: 18,
    fontWeight: "600",
    marginLeft: -150,
  },
  bodyIcon: {
    marginLeft: 10,
  },
});
