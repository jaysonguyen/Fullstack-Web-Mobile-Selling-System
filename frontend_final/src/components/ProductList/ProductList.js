import React, { useEffect, useState } from "react";
import Nav from "../Nav/Nav";
import "./ProductList.css";
import { getTypeProduct } from "../../Services/typeServices";
import { useParams } from "react-router-dom";
import { getAllMobilePhone } from "../../Services/mobileService";

const ProductList = (props) => {
  const [type, setType] = useState([]);
  const [product, setProduct] = useState([]);

  let urlpage = window.location.pathname;
  const fetchProduct = async () => {
    try {
      let dataProduct = await getAllMobilePhone();
      console.log(dataProduct.DT);
      setProduct(dataProduct.DT);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchType = async () => {
    try {
      let dataType = await getTypeProduct();
      setType(dataType.DT);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchType();
    fetchProduct();
    console.log(window.location.pathname);
  }, []);

  return <>
      {
        
      }
  </>;
};
export default ProductList;
