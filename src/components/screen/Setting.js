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
  Modal,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { getData } from "../../features/MyA";
import { apiApp, apiKey } from "../../features/ApiKey";

const { width, height } = Dimensions.get("screen");

const Setting = () => {
  const [showpassword, setshowpassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false);
  const [showLockConfirmation, setShowLockConfirmation] = useState(false);
  const [lockConfirmationPassword, setLockConfirmationPassword] = useState("");
  const navigate = useNavigation();
  const [userProfile, setUserProfile] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [newConfirmPassword, setConfrimPassWord] = useState("");
  const [id, setId] = useState("");
  const [confirmationPassword, setConfirmationPassword] = useState("");
  const [showModal, setShowModal] = useState(false);

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
              password: data.password,
              confirmpassword: data.confirmpassword,
            });
            setNewPassword(data.password);
            setConfrimPassWord(data.confirmpassword);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      })
      .catch((error) => {});
  }, []);

  const handleUpdate = () => {
    if (newPassword?.length < 6 || newPassword?.length > 16) {
      Alert.alert(
        "Lỗi",
        "Mật khẩu mới của bạn phải có ít nhất 6 ký tự và tối đa là 16 ký tự."
      );
      return;
    } else if (
      newPassword?.includes(" ") ||
      newConfirmPassword?.includes(" ")
    ) {
      Alert.alert("Lỗi", "Vui lòng không nhập space");
      return;
    } else if (!newPassword || !newConfirmPassword) {
      Alert.alert("Lỗi", "Vui lòng điền đầy đủ để cập nhật mật khẩu.");
      return;
    } else if (newPassword !== newConfirmPassword) {
      Alert.alert("Lỗi", "Vui lòng điền mật khẩu trùng khớp.");
      return;
    }

    const hasChangedInfo =
      newPassword !== userProfile.password ||
      newConfirmPassword !== userProfile.confirmpassword;

    if (hasChangedInfo) {
      setShowPasswordConfirmation(true);
    } else {
      performUpdate();
    }
  };

  const LockAcc = () => {
    const updatedUserData = {
      status: "xoa",
    };

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
        Alert.alert("Thông Báo", "Tài khoản của bạn sẽ bị khoá sau 10 ngày");
        navigate.navigate("Lockacc");
      })
      .catch((error) => {
        console.error("Lỗi:", error);
        Alert.alert("Đã xảy ra lỗi khi xoá tài khoản");
      });
  };

  const handleLockAccount = () => {
    if (lockConfirmationPassword === userProfile.confirmpassword) {
      LockAcc();
      setShowLockConfirmation(false);
    } else {
      Alert.alert("Mật khẩu xác nhận không chính xác!");
    }
  };

  const performUpdate = () => {
    const updatedUserData = {
      password: newPassword,
      confirmpassword: newConfirmPassword,
    };

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
        // Alert.alert("Đổi mật khẩu thành công!");
        navigate.navigate("Profile", {
          updatedData: {
            password: newPassword,
            confirmpassword: newConfirmPassword,
          },
        });
      })
      .catch((error) => {
        console.error("Lỗi:", error);
        Alert.alert("Đã xảy ra lỗi khi cập nhật mật khẩu");
      });
  };

  const handlePasswordConfirmation = () => {
    if (confirmationPassword === userProfile.confirmpassword) {
      performUpdate();
      setShowPasswordConfirmation(false);
    } else {
      Alert.alert("Mật khẩu xác nhận không chính xác!");
    }
  };

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
          <Text style={styles.textHeader}> Setting</Text>
        </View>
      </View>
      <View style={styles.body}>
        <View style={styles.bodyItems}>
          <View style={styles.borderText}>
            <Text style={styles.bodyTextTitlephone}> Change Password</Text>
            <TouchableOpacity onPress={() => setshowpassword(!showpassword)}>
              <AntDesign
                name={showpassword ? "up" : "down"}
                size={24}
                color="black"
              />
            </TouchableOpacity>
          </View>
        </View>
        {showpassword && (
          <View style={styles.changePasss}>
            <View style={styles.bodyText}>
              <Text style={styles.bodyTextTitle}> Password New</Text>
              <TextInput
                placeholder="Password New"
                onChangeText={setNewPassword}
                secureTextEntry
                style={styles.bodyTextInput}
              />
            </View>
            <View style={styles.bodyText}>
              <Text style={styles.bodyTextTitle}> Confirm New Password</Text>
              <TextInput
                placeholder="Confirm New Password"
                onChangeText={setConfrimPassWord}
                secureTextEntry
                style={styles.bodyTextInput}
              />
            </View>
            <TouchableOpacity onPress={handleUpdate}>
              <View style={styles.bodyButton}>
                <Text style={styles.bodyTextButton}> Change</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
        <View style={styles.bodyItems}>
          <TouchableOpacity onPress={() => setShowLockConfirmation(true)}>
            <View style={styles.borderText}>
              <Text style={styles.bodyTextDelete}> Delete Account</Text>
              <AntDesign name="right" size={24} color="red" />
            </View>
          </TouchableOpacity>
        </View>
        {showPasswordConfirmation && (
          <Modal transparent visible={showPasswordConfirmation}>
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
                    onPress={() => setShowPasswordConfirmation(false)}
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
        )}
      </View>
      {showLockConfirmation && (
        <Modal transparent visible={showLockConfirmation}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>
                Bạn có chắc muốn xoá tài khoản này?
              </Text>
              <TextInput
                secureTextEntry
                style={styles.modalInput}
                onChangeText={setLockConfirmationPassword}
                value={lockConfirmationPassword}
                placeholder="Mật Khẩu"
              />
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={() => setShowLockConfirmation(false)}
                >
                  <Text style={styles.modalButtonText}>Huỷ</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={handleLockAccount}
                >
                  <Text style={styles.modalButtonText}>Xác Nhận</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

export default Setting;

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
  backHeader: {
    marginHorizontal: 9,
  },
  textHeader: {
    marginLeft: "26.5%",
    fontSize: 18,
    fontWeight: "bold",
  },
  changePasss: {
    borderWidth: 1,
    backgroundColor: "white",
    margin: 20,
    height: 250,
    borderRadius: 5,
  },
  borderText: {
    height: 40,
    marginLeft: 15,
    marginRight: 15,
    backgroundColor: "white",
    justifyContent: "center",
    borderRadius: 3,
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
  bodyTextDelete: {
    fontSize: 15,
    fontWeight: "600",
    marginLeft: 5,
    color: "red",
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
  bodyText: {
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
    width: 320,
    marginLeft: 15,
    marginRight: 15,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
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
    borderRadius: 10,
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
    marginTop: -((height * 20) / 100) / 2,
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
  modalButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
