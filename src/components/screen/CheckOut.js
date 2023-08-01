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
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { getData } from "../../features/MyA";
import { apiApp, apiKey } from "../../features/ApiKey";

const { width, height } = Dimensions.get("screen");

const CheckOut = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleHeader}>
          <View style={styles.iconContainer}>
            <TouchableOpacity>
              <AntDesign
                name="left"
                size={23}
                color="black"
                style={styles.backHeader}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.paymenHeader}>
            <Text style={styles.textTitle}> Payment Methods</Text>
          </View>
        </View>
      </View>

      <View style={styles.body}>
        <View style={styles.bodyItem}>
          <View style={styles.bodyItems}>
            <Image
              source={{
                uri: "https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/h_540,c_limit/864c2d5e-6134-486a-b964-543056d58307/nike-just-do-it.png",
              }}
              style={styles.img}
            />
            <Text style={styles.textItem}> Dress In Red</Text>
            <Text style={styles.textItem}> $100.000</Text>
          </View>
          <Text style={styles.textItems}> Size M Color: Red</Text>
        </View>
        <View style={styles.bodyItem}>
          <View style={styles.bodyItems}>
            <Text style={styles.textItem}> Shoes</Text>
            <Text style={styles.textItem}> $230.00</Text>
          </View>
          <Text style={styles.textItems}> Size 10M Color: Red</Text>
        </View>
        <View style={styles.bodyItem}>
          <View style={styles.bodyItems}>
            <Text style={styles.textItem}> Glass</Text>
            <Text style={styles.textItem}> $230.00</Text>
          </View>
          <Text style={styles.textItems}> Size 10M Color: Red</Text>
        </View>
      </View>
      <View style={styles.footer}></View>
    </View>
  );
};

export default CheckOut;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },

  header: {
    width: (width * 90) / 100,
    height: (height * 25) / 100,
    alignItems: "center",
    borderBottomWidth: 1,
  },
  titleHeader: {
    width: (width * 90) / 100,
    height: (height * 7) / 100,
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  iconContainer: {
    justifyContent: "center",
    width: 40,
  },
  paymenHeader: {
    flex: 1,
    marginLeft: -20,
    alignItems: "center",
    marginHorizontal: 20,
  },
  textTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },

  body: {
    width: (width * 90) / 100,
    height: (height * 55) / 100,
  },
  bodyItem: {
    height: 80,
  },
  textItem: {
    fontSize: 20,
    fontWeight: "bold",
  },
  textItems: {
    fontSize: 13,
    fontWeight: "200",
  },
  bodyItems: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  footer: {
    width: (width * 90) / 100,
    height: (height * 20) / 100,
    // backgroundColor: "pink",
  },
});
