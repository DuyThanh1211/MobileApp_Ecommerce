import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import Product from "../Product"; // Import the new component

const app = "AB89E3DF-3D05-C109-FFB9-BE1C04C5A900";
const api = "07A6E400-E19B-4D34-ACE6-422033446351";
const apiUrl = `https://api.backendless.com/${app}/${api}/data/SanPham`;

const ProductList = () => {
  const [data, setData] = useState([]);

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

  useEffect(() => {
    getDataAPI();
  }, []);

  const getProduct = () => {
    return data.length
      ? data.map((item) => (
          <Product
            key={item.objectId}
            tenSanPham={item.TenSanPham}
            image={item.Image}
            moTa={item.MoTa}
            giaTien={item.GiaTien}
          />
        ))
      : null;
  };

  return <>{getProduct()}</>;
};

export default ProductList;
