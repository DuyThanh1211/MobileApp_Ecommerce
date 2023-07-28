import {
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
  //   SafeAreaView,
} from "react-native";
import React, { useState, useEffect } from "react";
// import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, images, SIZES, FONTS } from "../constants";
import { Feather } from "@expo/vector-icons";
import { latestList, shoesList1, shoesList2 } from "../constants/data";
import { apiKey, apiApp } from "../../features/ApiKey";
import { useNavigation } from "@react-navigation/native";

const Home = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [women, setWomen] = useState();
  const [men, setMen] = useState();

  const limitValue = 6;
  //   const limitedDataArray = data.slice(0, limitValue);
  //   const limitedWomenArray = women.slice(0, limitValue);
  //   const limitedMenArray = men.slice(0, limitValue);

  const apiUrl = `https://api.backendless.com/${apiApp}/${apiKey}/data/SanPham?pageSize=40`;
  const getDataAPI = () => {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  };
  const fetchData = async () => {
    try {
      const respone = await fetch(apiUrl);
      const json = await respone.json();
      setData(json);

      const womenItems = json.filter((item) => item.GioiTinh === "Women");
      setWomen(womenItems);

      const menItems = json.filter((item) => item.GioiTinh === "Men");
      setMen(menItems);
    } catch (error) {
      setError(error);
      console.log(setError);
    }
  };

  useEffect(() => {
    getDataAPI();
    fetchData();
  }, []);

  const navigateToProductDetails = (item) => {
    navigation.navigate("Details", { item: item });
  };

  //   const navigateToProductPage = () => {
  //     navigations.navigate("List Product", { data: data });
  //   };

  const renderProductItem = ({ item }) => {
    return (
      <>
        <View style={{ marginRight: SIZES.padding }}>
          <TouchableOpacity
            key={item.objectId}
            onPress={() => navigateToProductDetails(item)}
          >
            <Image
              source={{ uri: item.Image }}
              style={{
                height: 200,
                width: 180,
              }}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigateToProductDetails(item)}>
            <Text
              style={{
                fontSize: 15,
                color: COLORS.black,
                fontWeight: "bold",
              }}
            >
              {item.TenSanPham}
            </Text>
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 13,
              color: COLORS.black,
            }}
          >
            Clothing
          </Text>

          <View
            style={{
              flexDirection: "row",
            }}
          >
            <Text
              style={{
                fontSize: 13,
                marginVertical: 4,
              }}
            >
              ${item.GiaTien}
            </Text>
          </View>
        </View>
      </>
    );
  };
  return (
    // <SafeAreaView
    //   style={{
    //     flex: 1,
    //     backgroundColor: COLORS.white,
    //   }}
    // >
    <View
      style={{
        marginHorizontal: 22,
        marginTop: 12,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Image
          source={images.logo}
          resizeMode="contain"
          style={{
            width: 58,
            height: 22,
          }}
        />
      </View>
      
      <ScrollView>
        <View
          style={{
            backgroundColor: COLORS.gray,
            borderRadius: 20,
            marginTop: SIZES.padding,
            width: SIZES.width - 44,
            height: SIZES.height - 200,
          }}
        >
          <FlatList
            horizontal={true}
            data={shoesList1}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }) => (
              <Image
                source={item.shoes}
                resizeMode="contain"
                style={{
                  width: SIZES.width - 44,
                  height: SIZES.height - 200,
                }}
              />
            )}
          />

          <View
            style={{
              marginHorizontal: 12,
              marginVertical: SIZES.padding,
            }}
          >
            <Text style={{ ...FONTS.h3 }}>Made for Miles</Text>
            <Text style={{ ...FONTS.body4, marginVertical: 10 }}>
              The perfect place to find your new favourite running shoes
            </Text>
          </View>
        </View>


        <View
          style={{
            marginBottom: 50,
          }}
        >
          
          <Text
            style={{
              ...FONTS.h3,
            }}
          >
            Our Product
          </Text>
          <TouchableOpacity onPress={() => navigateToProductDetails()}>
            <Text
              style={{
                color: COLORS.black,
                fontWeight: "bold",
                alignSelf: 'flex-end', // Để nút nằm bên trái (trên cùng)
                paddingHorizontal: 10,
                borderRadius: 5,
                marginVertical: 12, // Khoảng cách từ texthello tới các thành phần khác
              }}
            >
              View all
            </Text>
            </TouchableOpacity>
          <FlatList
            horizontal={true}
            data={data}
            renderItem={renderProductItem}
            keyExtractor={(item) => item.objectId}
          />
        </View>

        <View
          style={{
            marginBottom: 50,
          }}
        >
          <Text
            style={{
              ...FONTS.h3,
            }}
          >
            For Men
          </Text>
          <TouchableOpacity onPress={() => navigateToProductDetails()}>
            <Text
              style={{
                color: COLORS.black,
                fontWeight: "bold",
                alignSelf: 'flex-end', // Để nút nằm bên trái (trên cùng)
                paddingHorizontal: 10,
                borderRadius: 5,
                marginVertical: 12, // Khoảng cách từ texthello tới các thành phần khác
              }}
            >
              View all
            </Text>
            </TouchableOpacity>

          <FlatList
            horizontal={true}
            data={men}
            renderItem={renderProductItem}
            keyExtractor={(item) => item.objectId}
          />
        </View>
        <View
          style={{
            marginBottom: 50,
          }}
        >
          <Text
            style={{
              ...FONTS.h3,
            }}
          >
            For Women
          </Text>
          <TouchableOpacity onPress={() => navigateToProductDetails()}>
            <Text
              style={{
                color: COLORS.black,
                fontWeight: "bold",
                alignSelf: 'flex-end', // Để nút nằm bên trái (trên cùng)
                paddingHorizontal: 10,
                borderRadius: 5,
                marginVertical: 12, // Khoảng cách từ texthello tới các thành phần khác
              }}
            >
              View all
            </Text>
            </TouchableOpacity>

          <FlatList
            horizontal={true}
            data={women}
            renderItem={renderProductItem}
            keyExtractor={(item) => item.objectId}
          />
        </View>
        <View
          style={{
            marginBottom: 50,
          }}
        ></View>
      </ScrollView>
    </View>
    // </SafeAreaView>
  );
};

export default Home;
