import {
  StyleSheet,
  Text,
  Alert,
  View,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { apiApp, apiKey } from "../../features/ApiKey";
import { useNavigation } from "@react-navigation/core";

const { width, height } = Dimensions.get("screen");
const Register = () => {
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [getpassword, setpasswordvi] = useState(false);
  const [getconfirmpassword, setconfirmpasswordvi] = useState(false);

  const navigate = useNavigation();
  const navigateToLogin = () => {
    navigate.navigate("Login");
  };

  const handleRegister = () => {
    if (!fullname || !username || !password || !confirmPassword) {
      Alert.alert("Lỗi", "Vui lòng không để trống thông tin.");
      return;
    } else if (
      username.includes(" ") ||
      password.includes(" ") ||
      confirmPassword.includes(" ")
    ) {
      Alert.alert("Lỗi", "Vui lòng không nhập space");
      return;
    } else if (fullname.length > 30) {
      Alert.alert("Lỗi", "Tối đa tên của bạn được 30 ký tự.");
      return;
    } else if (fullname.trim().length === 0) {
      Alert.alert("Lỗi", "Vui lòng nhập tên đầy đủ");
      return;
    } else if (!/^[a-zA-Z0-9\s]+$/.test(fullname)) {
      Alert.alert("Lỗi", "Tên của bạn không được chứa ký tự đặc biệt.");
      return;
    } else if (/\d/.test(fullname)) {
      Alert.alert(
        "Lỗi",
        "Bạn hãy nhập tên hợp lệ( Không được có số và ký tự đặc biệt)."
      );
      return;
    } else if (!username > 10) {
      Alert.alert(
        "Lỗi",
        "Vui lòng nhập số điện thoại hợp lệ (gồm 10: chữ số)."
      );
      return;
    } else if (username.toString()[0] !== "0") {
      Alert.alert("Lỗi", "Vui lòng nhập số điện thoại hợp lệ .");
      return;
    } else if (!/^[0-9\s]+$/.test(username)) {
      Alert.alert(
        "Lỗi",
        "Số điện thoại của bạn không hợp lệ(Không được chứa ký tự đặc biệt và chữ cái )."
      );
      return;
    } else if (!/^[0-9\s]+$/.test(username)) {
      Alert.alert(
        "Lỗi",
        "Số điện thoại của bạn không hợp lệ(Không được chứa ký tự đặc biệt và chữ cái )."
      );
      return;
    } else if (password?.length < 6 || password?.length > 16) {
      Alert.alert(
        "Lỗi",
        "Mật khẩu mới của bạn phải có ít nhất 6 ký tự và tối đa là 16 ký tự."
      );
      return;
    } else if (password != confirmPassword) {
      Alert.alert("Lỗi", "Vui lòng điền mật khẩu trùng khớp.");
      return;
    }

    fetch(
      `https://api.backendless.com/${apiApp}/${apiKey}/data/Users?where=phonenumber%3D'${username}'`,
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
        if (data.length > 0) {
          console.log("Tài Khoảng đã Tồn Tại");
          Alert.alert("Lỗi", "Tài khoảng đã tồn tại");
          return;
        } else {
          fetch(
            `https://api.backendless.com/${apiApp}/${apiKey}/users/register`,
            {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                phonenumber: username,
                password: password,
                confirmPassword: confirmPassword,
                name: fullname,
              }),
            }
          )
            .then((response) => response.json())
            .then((data) => {
              console.log(data);
              if (data.objectId) {
                console.log("objectId:", data.objectId);

                // Alert.alert("Thông báo:", "Đăng Ký Thành Công");
                navigate.navigate("Login");
              } else {
                Alert.alert("Lỗi", "Đăng Ký Không Thành Công.");
              }
            })
            .catch((error) => {
              console.error("Error:", error);
            });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}></View>

      <View style={styles.headerTitle}>
        <Text style={styles.headerText}>Hello! Register to get started</Text>
      </View>

      <View style={styles.body}>
        <View style={styles.bodyUser}>
          <TextInput
            style={styles.textinput}
            placeholder=" Full Name"
            value={fullname}
            onChangeText={(text) => setFullname(text)}
          />
        </View>
        <View style={styles.bodyUser}>
          <TextInput
            style={styles.textinput}
            placeholder="Phone Number"
            keyboardType="phone-pad"
            value={username}
            onChangeText={(text) => setUsername(text)}
          />
        </View>
        <View style={styles.bodyUser}>
          <TextInput
            style={styles.textinput}
            placeholder=" Password"
            autoCapitalize="none"
            secureTextEntry={getpassword ? false : true}
            value={password}
            onChangeText={(text) => setPassword(text)}
          />

          <TouchableOpacity
            style={{ position: "absolute", left: 300, top: 18 }}
            onPress={() => {
              setpasswordvi(!getpassword);
            }}
          >
            {getpassword ? (
              <Entypo
                name="eye-with-line"
                size={26}
                color="black"
                style={styles.noiconeye}
              />
            ) : (
              <Entypo
                name="eye"
                size={26}
                color="black"
                style={styles.iconeye}
              />
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.bodyPassword}>
          <TextInput
            style={styles.textinput}
            placeholder=" Confirm password"
            autoCapitalize="none"
            secureTextEntry={getconfirmpassword ? false : true}
            value={confirmPassword}
            onChangeText={(text) => setconfirmPassword(text)}
          />
          <TouchableOpacity
            style={{ position: "absolute", left: 300, top: 18 }}
            onPress={() => {
              setconfirmpasswordvi(!getconfirmpassword);
            }}
          >
            {getconfirmpassword ? (
              <Entypo
                name="eye-with-line"
                size={26}
                color="black"
                style={styles.noiconeye}
              />
            ) : (
              <Entypo
                name="eye"
                size={26}
                color="black"
                style={styles.iconeye}
              />
            )}
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={handleRegister}>
          <View style={styles.bodyButton}>
            <Text style={styles.bodyLogin}> Signin</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <View style={styles.footerText}>
          <View style={styles.footerLine}></View>
          <Text style={styles.footerOr}>Or Registers with</Text>
          <View style={styles.footerLine}></View>
        </View>
        <View style={styles.footerImage}>
          <View style={styles.footerImg}>
            <TouchableOpacity>
              <View style={styles.borderimg}>
                <View style={styles.footerAnh1}>
                  <Image source={require("../../../assets/fb.png")} />
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.borderimg}>
                <View style={styles.footerAnh1}>
                  <Image source={require("../../../assets/google_ic.png")} />
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.borderimg}>
                <View style={styles.footerAnh1}>
                  <Image source={require("../../../assets/Ios.png")} />
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.footerTextBot}>
            <Text style={styles.Textbot}> Dont't have an account?</Text>
            <TouchableOpacity onPress={navigateToLogin}>
              <Text style={[styles.Textbot, { color: "#35C2C1" }]}>
                {" "}
                Login Now
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: -50,
  },
  header: {
    width: width,
    height: (height * 10) / 100,
    justifyContent: "center",
  },
  IconLeft: {
    marginTop: 30,
    marginLeft: 20,
    borderWidth: 1,
    borderRadius: 15,
    height: 45,
    width: 45,
    borderColor: "gray",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    width: 300,
    height: (height * 10) / 100,
    marginLeft: 20,
    marginTop: 15,
    marginRight: 10,
  },
  headerText: {
    fontSize: 30,
    fontWeight: "600",
  },

  body: {
    width: width,
    height: (height * 30) / 100,
    marginTop: 20,
    alignItems: "center",
  },
  bodyUser: {
    witdh: width,
    height: (height * 10) / 100,
  },
  textinput: {
    borderWidth: 1,
    borderRadius: 10,
    width: (width * 90) / 100,
    height: 60,
    padding: 20,
    backgroundColor: "#F7F8F9",
    borderColor: "#E8ECF4",
  },
  bodyButton: {
    marginTop: 25,
    backgroundColor: "black",
    width: (width * 90) / 100,
    height: (height * 7) / 100,
    borderWidth: 1,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  bodyLogin: {
    color: "white",
    fontSize: 15,
    fontWeight: "600",
  },

  footer: {
    marginTop: 160,
    height: (height * 40) / 100,
  },
  footerText: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  footerLine: {
    borderColor: "#E8ECF4",
    borderWidth: 1,
    width: 100,
  },
  footerOr: {
    fontSize: 15,
    fontWeight: "400",
  },
  footerImg: {
    marginTop: 20,
    justifyContent: "space-around",
    flexDirection: "row",
  },
  footerAnh1: {
    width: (width * 25) / 100,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  borderimg: {
    borderWidth: 1,
    borderColor: "#5F9EA0",
    borderRadius: 10,
  },
  footerTextBot: {
    marginTop: 40,
    flexDirection: "row",
    alignSelf: "center",
  },
  Textbot: {
    fontSize: 17,
    fontWeight: "500",
  },
});
