import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getAllProductList } from "../../../Services/manageProduct";
import { BsFilter, BsUiRadios } from "react-icons/bs";
import { MdAttachFile } from "react-icons/md";
import { TbFileExport } from "react-icons/tb";
import { NavLink } from "react-router-dom";
import "../Home.css";
import "../OrderManage/OrderManage.css";
import "./AddProduct.css";
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
    console.log(products);
  }, []);

  let navigate = useNavigate("/admin/product/add");

  const handleAddProduct = (e) => {
    e.preventDefault();
    navigate("/admin/product/add");
  };
  return (
    <div className="container_body">
      <div className="order_container">
        <div className="order_body">
          <h5 class="card_title">Danh sách sản phẩm </h5>
          <div className="order_body_func">
            <div className="order_body_func_search">
              <input type="text" placeholder="Tìm kiếm sản phẩm" />
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
                  {products &&
                    products.map((product) => {
                      return (
                        <tr key={product.ID_PRODUCT}>
                          <td>{product.ID_PRODUCT}</td>
                          <td>{product.PRODUCT_NAME}</td>
                          <td>{product.BRAND}</td>
                          <td>{product.NAME_PRODUCT_TYPE}</td>
                          <td>
                            <img
                              src={product.IMAGE_SIG}
                              className="img_product"
                            />
                          </td>
                          <td>
                            {
                              (product.is_valid = 1 ? (
                                <button className="btn_status_1">
                                  Còn hàng
                                </button>
                              ) : (
                                <button className="btn_status_2">
                                  Hết hàng
                                </button>
                              ))
                            }{" "}
                          </td>
                        </tr>
                      );
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
