import React, { useEffect, useState } from "react";
import Nav from "../Nav/Nav";
import "./ProductList.css";
import { getTypeProduct } from "../../Services/typeServices";
import { useParams } from "react-router-dom";

const ProductList = (props) => {
    
   

  let idProduct = useParams();
  console.log(idProduct.id);

  const [type, setType] = useState([]);

  let urlpage = window.location.pathname ;
  const fetchType = async () => {
    try {
      let dataType = await getTypeProduct();
      console.log(dataType.DT);
      setType(dataType.DT);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchType();
    console.log(window.location.pathname);
    console.log(idProduct.id);
  }, []);

  return (
    <>
      {type.map((typepro, key) => {
        switch (urlpage) {
            case '/mobile':
                
                return (<h2 key={key}>{typepro.name_product_type}</h2>);
                break;
            default:
                break;
        }
        
      })}
    </>
  );
};
export default ProductList;
