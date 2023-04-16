import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getAllProductList } from "../../../Services/manageProduct";
import { BsFilter, BsUiRadios } from "react-icons/bs";
import { MdAttachFile } from "react-icons/md";
import { TbFileExport } from "react-icons/tb";
import {  NavLink } from "react-router-dom";
import "../Home.css"
import "../OrderManage/OrderManage.css"
import"./AddProduct.css"
const Production = (props) => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      let data = await getAllProductList();
      console.log(data.DT);
      setProducts(data.DT);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  let navigate = useNavigate("/admin/product/add");

  const handleAddProduct = (e) => {
    e.preventDefault();
    navigate("/admin/product/add");
  };
  return (
    <div className="container_body">
      <button onClick={(e) => handleAddProduct(e)} className="btn_add_product--production">ADD PRODUCT</button>
      <div className="order_container">
      <div className="order_body">
        <h5 class="card_title">Danh sách sản phẩm </h5>
        <div className="order_body_func">
          <div className="order_body_func_search">
           
            <input
              type="text"
              placeholder="Search for customer, order status or something "
            />
          </div>
          <div className="order_body_func_buttons">
            <button className="btn btn_filters">
              <i>
                <BsFilter />
              </i>

              <NavLink to="/filters">Filters</NavLink>
            </button>
            <button className="btn btn_attachment">
              <i>
                <MdAttachFile />
              </i>

              <NavLink to="/attachment">Attachment</NavLink>
            </button>
            <button className=" btn btn_export">
              <i>
                <TbFileExport />
              </i>

              <NavLink to="/export">Exports</NavLink>
            </button>
          </div>
        </div>
        <div class="main_wrapper">
          <div class="card-body">
            <table id="zero-conf" class="display">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Tên sản phẩm </th>
                  <th>Thương hiệu </th>
                  <th>Loại sản phẩm </th>
                  <th>Hình ảnh </th>
                  <th>Trạng thái </th>
                 
                </tr>
              </thead>
              <tbody>
                {products && products.map((product) => {
                  return(
                    <tr key={product.ID_PRODUCT}>
                    <td>{product.ID_PRODUCT}</td>
                    <td>{product.PRODUCT_NAME}</td>
                    <td>{product.BRAND}</td>
                    <td>{product.NAME_PRODUCT_TYPE}</td>
                    <td><img src={product.IMAGE_SIG} className="img_product"/></td>
                    <td>{product.is_valid = 1 ? <button className="btn_status_1">Còn hàng</button> : <button className="btn_status_2">Hết hàng</button>} </td>
                   
                  </tr>
                  )
                })}
               
              </tbody>
            </table>
          </div>
        </div>
      </div>
      </div>
      
    </div>
  );
};

export default Production;
