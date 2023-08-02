import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Alert,
  ActivityIndicator,
  Modal,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { getData, storeData } from "../../features/MyA";
import { apiApp, apiKey } from "../../features/ApiKey";

const { width, height } = Dimensions.get("screen");

const EditProfile = () => {
  const navigate = useNavigation();
  const [userProfile, setUserProfile] = useState(null);
  const [newfullname, setNewfullname] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [id, setId] = useState("");
  const [confirmationPassword, setConfirmationPassword] = useState("");
  const [Loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

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
    setLoading(true);
    inUserID()
      .then((id) => {
        setId(id);
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
            setUserProfile({
              name: data.name,
              address: data.address,
              password: data.password,
              confirmpassword: data.confirmpassword,
            });
            setNewfullname(data.name);
            setNewAddress(data.address);
            setLoading(false);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      })
      .catch((error) => {});
  }, []);

  const handleUpdate = () => {
    if (!newfullname) {
      Alert.alert("Lỗi", "Vui lòng không để trống tên của bạn");
      return;
    } else if (!newAddress) {
      Alert.alert("Lỗi", "Vui lòng không để trống địa chỉ ");
      return;
    } else if (newAddress.length > 50) {
      Alert.alert("Lỗi", "Địa chỉ của bạn chỉ được tối đa 50 ký tự.");
      return;
    } else if (newAddress.trim().length === 0) {
      Alert.alert("Lỗi", "Vui lòng nhập địa chỉ đầy đủ");
      return;
    } else if (newfullname.length > 30) {
      Alert.alert("Lỗi", "Tên của bạn chỉ được tối đa 30 ký tự.");
      return;
    } else if (newfullname.trim().length === 0) {
      Alert.alert("Lỗi", "Vui lòng nhập tên đầy đủ");
      return;
    } else if (!/^[a-zA-Z0-9\s]+$/.test(newfullname)) {
      Alert.alert("Lỗi", "Tên của bạn không được chứa ký tự đặc biệt.");
      return;
    } else if (/\d/.test(newfullname)) {
      Alert.alert(
        "Lỗi",
        "Bạn hãy nhập tên hợp lệ( Không được có số và ký tự đặc biệt)."
      );
      return;
    } else if (!/^[\w\s/]*$/.test(newAddress)) {
      Alert.alert(
        "Lỗi",
        "Địa chỉ của bạn không hợp lệ. Vui lòng chỉ nhập số, chữ cái hoặc dấu '/'"
      );
      return;
    }

    const hasChangedInfo =
      newfullname !== userProfile.name || newAddress !== userProfile.address;

    if (hasChangedInfo) {
      setIsModalVisible(true);
    } else {
      performUpdate();
    }
  };

  const performUpdate = async () => {
    const updatedUserData = {
      name: newfullname,
      address: newAddress,
    };

    try {
      await storeData("address", newAddress);
    } catch (error) {
      console.error("Error saving address to AsyncStorage:", error);
    }

    fetch(`https://api.backendless.com/${apiApp}/${apiKey}/data/Users/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUserData),
    })
      .then((response) => response.json())
      .then((data) => {
        Alert.alert("Cập nhật thông tin thành công!");

        navigate.navigate("Profile");
      })
      .catch((error) => {
        console.error("Lỗi:", error);
        Alert.alert("Đã xảy ra lỗi khi cập nhật thông tin");
      });
  };

  const handlePasswordConfirmation = () => {
    if (confirmationPassword === userProfile.confirmpassword) {
      performUpdate();
      setIsModalVisible(false);
    } else {
      Alert.alert("Mật khẩu xác nhận không chính xác!");
    }
  };

  if (Loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "black",
        }}
      >
        <ActivityIndicator size={"large"} color="white"></ActivityIndicator>
      </View>
    );
  }
  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text> Lỗi Tải Dữ Liệu, Hãy Kiểm Tra Lại Đuờng Truyền</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTitle}>
          <TouchableOpacity onPress={navigate.goBack}>
            <AntDesign
              name="left"
              size={24}
              color="black"
              style={styles.backHeader}
            />
          </TouchableOpacity>
          <Text style={styles.textHeader}> Edit Profile</Text>
        </View>
        {userProfile ? (
          <View style={styles.headerTitles}>
            <Text style={styles.headerText}> ✌️ Hello {userProfile.name} </Text>
          </View>
        ) : (
          <Text>Loading...</Text>
        )}
      </View>
      <View style={styles.body}>
        <View style={styles.bodyItem}>
          <View style={styles.bodyText}>
            <Text style={styles.bodyTextTitle}> Full Name</Text>
            <TextInput
              placeholder="Full Name"
              style={styles.bodyTextInput}
              value={newfullname}
              onChangeText={setNewfullname}
            />
          </View>
        </View>
        <View style={styles.bodyItem}>
          <View style={styles.bodyText}>
            <Text style={styles.bodyTextTitle}> Address</Text>
            <TextInput
              placeholder="Address"
              style={styles.bodyTextInput}
              value={newAddress}
              onChangeText={setNewAddress}
            />
          </View>
        </View>
        <TouchableOpacity onPress={handleUpdate}>
          <View style={styles.bodyButton}>
            <Text style={styles.bodyTextButton}> Update</Text>
          </View>
        </TouchableOpacity>

        <Modal
          visible={isModalVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setIsModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>
                Vui lòng nhập mật khẩu của bạn để cập nhật thông tin
              </Text>
              <TextInput
                secureTextEntry
                style={styles.modalInput}
                onChangeText={setConfirmationPassword}
                placeholder="Mật khẩu"
              />
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={() => setIsModalVisible(false)}
                >
                  <Text style={styles.modalButtonText}>Hủy</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={handlePasswordConfirmation}
                >
                  <Text style={styles.modalButtonText}>Xác nhận</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
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
    height: (height * 20) / 100,
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
  backHeader: {
    marginHorizontal: 9,
  },
  textHeader: {
    marginLeft: "26.5%",
    fontSize: 18,
    fontWeight: "bold",
  },
  borderText: {
    height: 40,
    marginLeft: 15,
    marginRight: 15,
    backgroundColor: "white",
    justifyContent: "center",
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "gray",
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  bodyTextTitlephone: {
    fontSize: 15,
    fontWeight: "600",
    marginLeft: 5,
  },
  headerTitles: {
    height: (height * 10) / 100,
    marginLeft: 20,
    marginRight: 10,
    alignItems: "center",
  },
  headerText: {
    fontSize: 30,
    fontWeight: "900",
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
  bodyItems: {
    width: width,
    height: (height * 7) / 100,
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
    backgroundColor: "white",
    padding: 10,
    borderRadius: 20,
    borderColor: "black",
    borderWidth: 1,
  },
  bodyButton: {
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "#CCD2E8",
    width: 170,
    height: 35,
    borderRadius: 20,
    backgroundColor: "black",
  },
  bodyTextButton: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  modalContainer: {
    width: (width * 90) / 100,
    height: (height * 30) / 100,
    position: "absolute",
    top: "40%",
    alignSelf: "center",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#DCDCDC",
    marginTop: -((height * 30) / 100) / 2,
  },
  modalContent: {
    width: (width * 80) / 100,
    height: (height * 20) / 100,
  },
  modalText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  modalInput: {
    marginTop: 15,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  modalButtons: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 5,
    marginRight: 5,
  },
  modalButton: {
    borderRadius: 10,
    borderWidth: 1,
    height: 30,
    width: 90,
    alignItems: "center",
    justifyContent: "center",
  },
});
