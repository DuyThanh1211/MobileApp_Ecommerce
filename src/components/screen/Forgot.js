import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
} from "react-native";
import React, { useRef, useState } from "react";

const Forgot = () => {
  const [phonenumber, setphonenumber] = useState("");
  const [code, setcode] = useState("");
  const [verificationId, setverificationId] = useState(null);

  const sendVedrification = () => {
    const phoneProvider = new firebase.auth.PhoneAuthProvider();
    phoneProvider.verifyPhoneNumber(phonenumber).then(setverificationId);
    setphonenumber("");
  };

  const confirmcode = () => {
    const cedential = firebase.auth.PhoneAuthProvider.credential(
      verificationId,
      code
    );
    firebase
      .auth()
      .signInWithCredential(credential)
      .then(() => {
        setcode("");
      })
      .catch((error) => {
        Alert.alert(error);
      });
    Alert.alert("Login Succes");
  };
  return (
    <View style={styles.container}>
      <Text style={styles.otpText}>Loging using OTP</Text>
      <TextInput
        placeholder="Code"
        onChangeText={setphonenumber}
        keyboardType="phone-pad"
        autoCompleteType="tel"
        style={styles.textinput}
      />
      <TouchableOpacity
        style={styles.sendVerifiation}
        onPress={sendVedrification}
      >
        <Text style={styles.buttonText}>Send verification</Text>
      </TouchableOpacity>
      <TextInput
        placeholder="Confirm code"
        onChangeText={setcode}
        keyboardType="number-pad"
        autoCompleteType="tel"
        style={styles.textinput}
      />
      <TouchableOpacity style={styles.sendVerifiation} onPress={confirmcode}>
        <Text style={styles.buttonText}>Confirm verification</Text>
      </TouchableOpacity>
    </View>
  );
};
export default Forgot;

const styles = StyleSheet.create({});
