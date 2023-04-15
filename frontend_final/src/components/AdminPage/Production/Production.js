import React from "react";
import { useNavigate } from "react-router";

const Production = (props) => {
  let navigate = useNavigate("/admin/product/add");

  const handleAddProduct = (e) => {
    e.preventDefault();
    navigate("/admin/product/add");
  };
  return (
    <div>
      <button onClick={(e) => handleAddProduct(e)}>ADD PRODUCT</button>
    </div>
  );
};

export default Production;
