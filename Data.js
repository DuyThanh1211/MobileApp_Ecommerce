import { Text, View, ScrollView, Image } from "react-native";
import React, { useEffect, useState } from "react";

const Data = () => {
  const [data, setData] = useState([]);

  const apiUrl = "https://classyschool.backendless.app/api/data/SanPham";
  const getDataAPI = () => {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        // Log dữ liệu vào console
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
    console.log(data);
    // console.log(apiUrl);
  };

  useEffect(() => {
    getDataAPI();
  }, []);

  return (
    <View>
      {data.length ? data.map((item) => <Text>{item.MoTa}</Text>) : null}
    </View>
  );
};

export default Data;
