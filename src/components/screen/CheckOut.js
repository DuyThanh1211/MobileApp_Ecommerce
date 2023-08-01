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
  ScrollView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { getData } from "../../features/MyA";
import { apiApp, apiKey } from "../../features/ApiKey";

const { width, height } = Dimensions.get("screen");

const CheckOut = () => {
  const [isTienMat, setIsTienMat] = useState(false);
  const [isThe, setIsThe] = useState(false);

  const toggleTienMat = () => {
    setIsTienMat(true);
    setIsThe(false);
  };

  const toggleThe = () => {
    setIsThe(true);
    setIsTienMat(false);
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTitle}>
          <TouchableOpacity>
            <AntDesign
              name="left"
              size={25}
              color="black"
              style={styles.backHeader}
            />
          </TouchableOpacity>
          <Text style={styles.textp}> Payment Methods</Text>
        </View>

        <View style={styles.headerItem}>
          <TouchableOpacity onPress={toggleTienMat}>
            {isTienMat ? (
              <AntDesign name="checksquare" size={24} color="black" />
            ) : (
              <AntDesign name="checksquareo" size={24} color="black" />
            )}
          </TouchableOpacity>
          <Text style={styles.TextTT}>Thanh Toán Tiền Mặt</Text>

          <TouchableOpacity onPress={toggleThe}>
            {isThe ? (
              <AntDesign name="checksquare" size={24} color="black" />
            ) : (
              <AntDesign name="checksquareo" size={24} color="black" />
            )}
          </TouchableOpacity>
          <Text style={styles.TextTT}> Thanh Toán Thẻ</Text>
        </View>
      </View>

      <ScrollView style={styles.body}>
        <View style={styles.bodyItem}>
          <View style={styles.bodyItems}>
            <Image
              source={{
                uri: "https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/h_540,c_limit/864c2d5e-6134-486a-b964-543056d58307/nike-just-do-it.png",
              }}
              style={styles.img}
            />
            <View style={styles.item}>
              <View style={styles.details}>
                <Text style={styles.textItem}> Dress In Red</Text>
                <View style={styles.tien}>
                  <Text style={styles.textItemgiatien}> $100.000</Text>
                  <Text style={styles.textItemsize}> Size M</Text>
                </View>
              </View>
              <View style={styles.items}>
                <Text style={styles.textItems}> Số Lượng: 1</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.bodyItem}>
          <View style={styles.bodyItems}>
            <Image
              source={{
                uri: "https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/h_540,c_limit/864c2d5e-6134-486a-b964-543056d58307/nike-just-do-it.png",
              }}
              style={styles.img}
            />
            <View style={styles.item}>
              <View style={styles.details}>
                <Text style={styles.textItem}> Dress In Red</Text>
                <View style={styles.tien}>
                  <Text style={styles.textItemgiatien}> $100.000</Text>
                  <Text style={styles.textItemsize}> Size M</Text>
                </View>
              </View>
              <View style={styles.items}>
                <Text style={styles.textItems}> Số Lượng: 1</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.bodyItem}>
          <View style={styles.bodyItems}>
            <Image
              source={{
                uri: "https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/h_540,c_limit/864c2d5e-6134-486a-b964-543056d58307/nike-just-do-it.png",
              }}
              style={styles.img}
            />
            <View style={styles.item}>
              <View style={styles.details}>
                <Text style={styles.textItem}> Dress In Red</Text>
                <View style={styles.tien}>
                  <Text style={styles.textItemgiatien}> $100.000</Text>
                  <Text style={styles.textItemsize}> Size M</Text>
                </View>
              </View>
              <View style={styles.items}>
                <Text style={styles.textItems}> Số Lượng: 1</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.bodyItem}>
          <View style={styles.bodyItems}>
            <Image
              source={{
                uri: "https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/h_540,c_limit/864c2d5e-6134-486a-b964-543056d58307/nike-just-do-it.png",
              }}
              style={styles.img}
            />
            <View style={styles.item}>
              <View style={styles.details}>
                <Text style={styles.textItem}> Dress In Red</Text>
                <View style={styles.tien}>
                  <Text style={styles.textItemgiatien}> $100.000</Text>
                  <Text style={styles.textItemsize}> Size M</Text>
                </View>
              </View>
              <View style={styles.items}>
                <Text style={styles.textItems}> Số Lượng: 1</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.bodyItem}>
          <View style={styles.bodyItems}>
            <Image
              source={{
                uri: "https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/h_540,c_limit/864c2d5e-6134-486a-b964-543056d58307/nike-just-do-it.png",
              }}
              style={styles.img}
            />
            <View style={styles.item}>
              <View style={styles.details}>
                <Text style={styles.textItem}> Dress In Red</Text>
                <View style={styles.tien}>
                  <Text style={styles.textItemgiatien}> $100.000</Text>
                  <Text style={styles.textItemsize}> Size M</Text>
                </View>
              </View>
              <View style={styles.items}>
                <Text style={styles.textItems}> Số Lượng: 1</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.textto}>
          <Text style={styles.TextTotal}> Total: $2000</Text>
        </View>
        <View style={styles.Buttons}>
          <TouchableOpacity>
            <View style={styles.footerButton}>
              <Text style={styles.TextButton}> Check Out</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
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
    width: (width * 95) / 100,
    height: (height * 25) / 100,
    alignItems: "center",
    borderBottomWidth: 1,
    backgroundColor: "blue",
  },
  headerTitle: {
    justifyContent: "center",
    marginTop: 20,
    width: 350,
  },
  iconheader: {
    alignItems: "center",
  },
  textp: {
    marginHorizontal: 80,
    fontSize: 20,
    fontWeight: "bold",
    marginTop: -25,
  },
  backHeader: {
    marginHorizontal: 10,
  },
  headerItem: {
    backgroundColor: "red",
    flex: 1,
    flexDirection: "row",
  },
  check: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  TextTT: {
    fontSize: 15,
    fontWeight: "500",
  },

  body: {
    width: (width * 95) / 100,
    height: height,
    marginBottom: 60,
  },
  bodyItem: {
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 5,
  },
  tien: {
    marginTop: 5,
  },
  details: {
    flex: 1,
  },
  bodyItems: {
    flexDirection: "row",
    padding: 5,
  },
  textItem: {
    fontSize: 18,
    fontWeight: "bold",
  },
  textItemgiatien: {
    fontSize: 13,
    fontWeight: "bold",
  },
  textItemsize: {
    fontSize: 11,
    fontWeight: "200",
  },
  textItems: {
    fontSize: 15,
    fontWeight: "bold",
  },
  items: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  item: {
    flex: 1,
    padding: 10,
  },
  img: {
    width: 90,
    height: 120,
  },

  footer: {
    position: "absolute",
    width: width,
    bottom: 0,
    flexDirection: "row",
  },
  footerButton: {
    width: 150,
    height: 50,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  TextButton: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  Buttons: {
    flex: 1,
    alignItems: "flex-end",
  },
  TextTotal: {
    color: "black",
    fontSize: 20,
    fontWeight: "600",
  },
  textto: {
    justifyContent: "center",
    paddingLeft: 10,
  },
  containerHeader: {
    backgroundColor: "red",
    flex: 1,
    flexDirection: "row",
  },
});
