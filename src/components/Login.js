import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";

const { width, height } = Dimensions.get("screen");
const Login = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <View style={styles.IconLeft}>
            <AntDesign name="left" size={25} color="black" />
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.headerTitle}>
        <Text style={styles.headerText}>
          Welcome back! Glad to see you, Again!
        </Text>
      </View>

      <View style={styles.body}>
        <View style={styles.bodyUser}>
          <TextInput style={styles.textinput} placeholder=" Enter your email" />
        </View>
        <View style={styles.bodyPassword}>
          <TextInput
            style={styles.textinput}
            placeholder=" Enter your password"
          ></TextInput>
        </View>
        <View style={styles.bodyForgot}>
          <TouchableOpacity>
            <Text style={styles.bodyTextFor}> Forgot Password?</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <View style={styles.bodyButton}>
            <Text style={styles.bodyLogin}> Login</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <View style={styles.footerText}>
          <View style={styles.footerLine}></View>
          <Text style={styles.footerOr}>Or Login with</Text>
          <View style={styles.footerLine}></View>
        </View>
        <View style={styles.footerImage}>
          <View style={styles.footerImg}>
            <TouchableOpacity>
              <View style={styles.borderimg}>
                <View style={styles.footerAnh1}>
                  <Image source={require("../../assets/fb.png")} />
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.borderimg}>
                <View style={styles.footerAnh1}>
                  <Image source={require("../../assets/google_ic.png")} />
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.borderimg}>
                <View style={styles.footerAnh1}>
                  <Image source={require("../../assets/Ios.png")} />
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.footerTextBot}>
            <Text style={styles.Textbot}> Dont't have an account?</Text>
            <TouchableOpacity>
              <Text style={[styles.Textbot, {color: '#35C2C1'}]}> Register Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: width,
    height: (height * 15) / 100,
    justifyContent: "center",
  },
  IconLeft: {
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
    marginRight: 10,
  },
  headerText: {
    fontSize: 30,
    fontWeight: "600",
  },

  body: {
    width: width,
    height: (height * 30) / 100,
    marginTop: 30,
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
  bodyForgot: {
    width: (width * 90) / 100,
    height: (height * 5) / 100,
    alignItems: "flex-end",
  },
  bodyTextFor: {
    marginTop: 5,
    fontSize: 15,
    fontWeight: "400",
    color: "#6A707C",
  },
  bodyButton: {
    marginTop: 15,
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
    marginTop: 50,
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
    borderColor: "#E8ECF4",
    borderRadius: 10,
  },
  footerTextBot: {
    marginTop: 100,
    flexDirection: "row",
    alignSelf: "center",
  },
  Textbot: {
    fontSize: 17,
    fontWeight: "500",
  },
});
