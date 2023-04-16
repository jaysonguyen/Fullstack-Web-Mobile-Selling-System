import React, { useState } from "react";
import "./AddProduct.css";
import phonerep from "./img/image_phone.jpg";
import { useNavigate } from "react-router-dom";

const AddProduct = (props) => {
  const [name, setname] = useState("");
  const [type, settype] = useState("");
  const [brand, setbrand] = useState("");
  const [hw, sethw] = useState("");
  const [desc, setdesc] = useState("");
  const [price, setprice] = useState("");
  const [color, setcolor] = useState("");
  const [imageSig, setImageSig] = useState("");
  const [dateImport, setdateImport] = useState("");
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [listImage, setListImage] = useState([]);

  const handleInsertProduct = (e) => {
    e.preventDefault();
    console.log(
      name,
      type,
      brand,
      hw,
      desc,
      price,
      color,
      imageSig,
      dateImport
    );
  };

  let navigate = useNavigate("/admin/production");
  const handleProductList = (e) => {
    e.preventDefault();
    navigate("/admin/production");
  };

  return (
    <div>
      <div class="container">
        <div class="noidung-contain">
          <div class="noidung">
            <div>
              <form action="">
                <div class="title"></div>
                <div class="nd-2">
                  <div className="nd-2_container">
                    <span class="Adproduct">+ Add Product</span>
                  </div>
                  <div className="height_flex">
                    <div className="height1"></div>
                    <div className="height2"></div>
                    <div className="height3"></div>
                  </div>
                  <div class="search">
                    <input
                      className="input_search"
                      type="text"
                      name=""
                      id=""
                      placeholder="Nhập sản phẩm cần tìm"
                    />
                    <div className="button_container">
                      <button className="search_btn">Tìm kiếm</button>
                    </div>
                  </div>
                </div>
                <div class="nd-3">
                  <div class="productname">
                    <div class="inp">
                      Tên sản phẩm <br />
                      <input
                        value={name}
                        onChange={(e) => setname(e.target.value)}
                        className="input_productName"
                        type="text"
                        name=""
                        id=""
                      />{" "}
                      <br />
                      <p className="input_desc">
                        Tên sản phẩm không dài quá 200 ký tự
                      </p>
                    </div>

                    <div className="inp">
                      <div className="sel">
                        Loại <br />
                        <select
                          className="select_category"
                          name=""
                          id=""
                          value={type}
                          onChange={(e) => settype(e.target.value)}
                        >
                          <option value="1">Loại 1</option>
                          <option value="">+Thêm mới</option>
                        </select>
                      </div>

                      <div className="fil">
                        Hãng <br />
                        <input
                          value={brand}
                          onChange={(e) => setbrand(e.target.value)}
                          className="select_gender"
                          name=""
                          id=""
                          placeholder="Apple"
                        />
                      </div>
                    </div>
                    <div className="fil">
                      Cấu hình <br />
                      <select
                        className="select_brad"
                        name=""
                        id=""
                        value={hw}
                        onChange={(e) => sethw(e.target.value)}
                      >
                        <option value="1">1</option>
                        <option value="">+Thêm mới</option>
                      </select>
                    </div>

                    <div className="fil">
                      Mô tả <br />
                      <input
                        className="des"
                        type="text"
                        name=""
                        id=""
                        value={desc}
                        onChange={(e) => setdesc(e.target.value)}
                      />
                    </div>
                    <div className="fil">
                      Giá bán <br />
                      <input
                        className="des"
                        type="text"
                        name=""
                        id=""
                        value={price}
                        onChange={(e) => setprice(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="productIMG">
                    Hình ảnh sản phẩm
                    <div className="imgcontain img_sig">
                      <div className="imgDetail">
                        <label
                          className={`image_label_with_image ${
                            imageSig == "" ? "" : "image_label_with_image"
                          }`}
                          htmlFor="imageSig"
                        >
                          Chọn ảnh
                        </label>
                        <input
                          onChange={(e) => {
                            const file = e.target.files[0];
                            const reader = new FileReader();
                            reader.onload = () => {
                              setImageSig(reader.result);
                            };
                            reader.readAsDataURL(file);
                          }}
                          name="imageSig"
                          type="file"
                          hidden
                          id="imageSig"
                        />

                        {imageSig && (
                          <img
                            className="image_product image_sig"
                            src={imageSig}
                          />
                        )}
                      </div>
                      <div className="imgDetail">
                        <label
                          className={`image_label_with_image ${
                            imageSig == "" ? "" : "image_label_with_image"
                          }`}
                          htmlFor="image1"
                        >
                          Chọn ảnh
                        </label>
                        <input
                          name="image1"
                          type="file"
                          hidden
                          id="image1"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            const reader = new FileReader();
                            reader.onload = () => {
                              setImage1(reader.result);
                            };
                            reader.readAsDataURL(file);
                          }}
                        />

                        {image1 && (
                          <img
                            className="image_product image_sig"
                            src={image1}
                          />
                        )}
                      </div>
                      <div className="imgDouble">
                        <div className="db1">
                          <label
                            className={
                              !image2
                                ? "image_label label_mini_image"
                                : "image_label label_mini_image label_mini_image_active_image "
                            }
                            htmlFor="image2"
                          >
                            Chọn ảnh
                          </label>
                          <input
                            name="image2"
                            type="file"
                            hidden
                            id="image2"
                            onChange={(e) => {
                              const file = e.target.files[0];
                              const reader = new FileReader();
                              reader.onload = () => {
                                setImage2(reader.result);
                              };
                              reader.readAsDataURL(file);
                            }}
                          />

                          {image2 && (
                            <img
                              className="image_product image_sig"
                              src={image2}
                            />
                          )}
                        </div>
                        <div className="db2">
                          <label
                            className={
                              !image3
                                ? "image_label label_mini_image"
                                : "image_label label_mini_image label_mini_image_active_image "
                            }
                            htmlFor="image3"
                          >
                            Chọn ảnh
                          </label>
                          <input
                            name="image3"
                            type="file"
                            hidden
                            id="image3"
                            onChange={(e) => {
                              const file = e.target.files[0];
                              const reader = new FileReader();
                              reader.onload = () => {
                                setImage3(reader.result);
                              };
                              reader.readAsDataURL(file);
                            }}
                          />
                          {image3 && (
                            <img
                              className="image_product image_sig"
                              src={image3}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="imgInfo">
                      <div className="addsize">
                        <div className="addSize_heading">
                          Màu <br />
                          <select
                            className="addSize_selected"
                            name=""
                            id=""
                            value={color}
                            onChange={(e) => setcolor(e.target.value)}
                          >
                            <option value="#0000">#0000</option>
                            <option value="">+Thêm mới</option>
                          </select>
                        </div>
                      </div>
                      <div className="product_date_container prodate">
                        Ngày nhập <br />
                        <input
                          value={dateImport}
                          onChange={(e) => setdateImport(e.target.value)}
                          className="input_date"
                          type="date"
                          name=""
                          id=""
                        />
                      </div>
                    </div>
                    <div className="save_container">
                      <div className="set_width"></div>
                      <div>
                        <div className="button_save_container">
                          <button
                            className="btn_cancel"
                            onClick={(e) => handleProductList(e)}
                          >
                            Cancel
                          </button>
                          <button
                            className="btnadd"
                            onClick={(e) => handleInsertProduct(e)}
                          >
                            Add Product
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
