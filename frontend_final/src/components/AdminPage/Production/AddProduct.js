import React, { useState } from "react";
import "./AddProduct.css";
import ModalHW from "./ModalHW";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { toast } from "react-toastify";
import { createMobilePhone } from "../../../Services/mobileService";

const AddProduct = (props) => {
  const [name, setname] = useState("");
  const [desc, setdesc] = useState("");
  const [type, settype] = useState(1);
  const [modalNum, setmodalNumber] = useState("");
  const [brand, setbrand] = useState("");
  const [hw, sethw] = useState("");
  const [price, setprice] = useState("");
  const [color, setcolor] = useState("");
  const [colorHex, setcolorHex] = useState("");
  const [imageSig, setImageSig] = useState("");
  const [dateImport, setdateImport] = useState("");
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");

  const [cpu, setcpu] = useState("");
  const [storage, setstorage] = useState("");

  const [showHWModal, setShowHWModal] = useState(false);
  const [showColorModal, setShowColorModal] = useState(false);

  if (image1 != "" && image2 != "" && image3 != "") {
    const array = [image1, image2, image3];
    console.log(array);
  }

  const handleShowHwModal = () => {
    let flag = !showHWModal;
    setShowHWModal(flag);
  };

  const handleShowColor = () => {
    let flag = !showColorModal;
    setShowColorModal(flag);
  };

  const handleAddHW = (e) => {
    e.preventDefault();
    if (storage == "") {
      toast.error("Thêm bộ nhớ sản phẩm");
    }
    if (cpu == "") {
      toast.error("Thêm cpu sản phẩm");
    } else {
      handleShowHwModal();
      sethw(storage);
      toast.success("Thêm cấu hình thành công");
    }
  };

  const handleAddColor = (e) => {
    e.preventDefault();
    if (color != "" && colorHex != "") {
      handleShowColor();
      toast.success("Thêm màu thành công");
    } else {
      toast.error("Điền thông tin màu");
    }
  };

  // proName, proDesc, idType, productModel, brand, imgSig, imageLink, colorName, coLorHexa, cpu, storage, price

  const handleInsertProduct = async (e) => {
    e.preventDefault();
    if (name == "") {
      toast.error("Điền tên sản phẩm");
    } else if (type == "") {
      toast.error("Điền loại sản phẩm");
    } else if (brand == "") {
      toast.error("Điền thương hiệu sản phẩm");
    } else if (hw == "") {
      toast.error("Điền cấu hình sản phẩm");
    } else if (price == "") {
      toast.error("Điền giá sản phẩm");
    } else if (imageSig == "") {
      toast.error("Điền ảnh sản phẩm");
    } else if (color == "") {
      toast.error("Điền màu sản phẩm");
    } else {
      const data = await createMobilePhone(
        name,
        desc,
        type,
        imageSig,
        color,
        colorHex,
        cpu,
        storage,
        price
      );
      if (data && +data.EC === 1) {
        toast.success("Thêm sản phẩm thành công");
      }
    }
  };

  return (
    <div>
      <div className="container">
        <div className="noidung-contain">
          <div className="noidung">
            <div>
              <form action="">
                <div className="title"></div>
                <div className="nd-2">
                  <div className="nd-2_container">
                    <span className="Adproduct">+ Thêm sản phẩm</span>
                  </div>
                  <div className="height_flex">
                    <div className="height1"></div>
                    <div className="height2"></div>
                    <div className="height3"></div>
                  </div>
                  <div className="search">
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
                <div className="nd-3">
                  <div className="productname">
                    <div className="inp">
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
                        </select>
                        <a className="add_item_btn">
                          <AiOutlinePlusCircle
                            className="add_item_btn--icon"
                            onClick={() => handleShowModal()}
                          />
                        </a>
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
                        <option value="1">{hw}</option>
                      </select>
                      <a
                        className="add_item_btn"
                        onClick={() => handleShowHwModal()}
                      >
                        <AiOutlinePlusCircle className="add_item_btn--icon" />
                      </a>
                      {showHWModal && (
                        <div className="add_hw_container">
                          <div className="fil">
                            Bộ nhớ <br />
                            <input
                              className="des"
                              type="text"
                              name=""
                              id=""
                              value={storage}
                              onChange={(e) => setstorage(e.target.value)}
                            />
                          </div>
                          <div className="fil">
                            CPU <br />
                            <input
                              className="des"
                              type="text"
                              name=""
                              id=""
                              value={cpu}
                              onChange={(e) => setcpu(e.target.value)}
                            />
                          </div>
                          <div className="button_save_container btn_save_container_item">
                            <button
                              className="btnadd add_item-detail btn_add_hw"
                              onClick={(e) => handleAddHW(e)}
                            >
                              Lưu
                            </button>
                          </div>
                        </div>
                      )}
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
                            className="addSize_selected add_color_selected"
                            name=""
                            id=""
                            style={{
                              background: colorHex,
                            }}
                          >
                            <option value="#0000">{color}</option>
                          </select>
                          <span
                            className="add_item_btn"
                            onClick={() => handleShowColor()}
                          >
                            <AiOutlinePlusCircle className="add_item_btn--icon" />
                          </span>
                          {showColorModal && (
                            <div className="insert_color_container--item">
                              <div className="fil">
                                Tên màu <br />
                                <input
                                  className="des"
                                  type="text"
                                  name=""
                                  id=""
                                  value={color}
                                  onChange={(e) => setcolor(e.target.value)}
                                />
                              </div>
                              <div className="fil">
                                Mã màu <br />
                                <input
                                  className="des"
                                  type="text"
                                  name=""
                                  id=""
                                  value={colorHex}
                                  onChange={(e) => setcolorHex(e.target.value)}
                                />
                              </div>
                              <div className="button_save_container btn_save_container_item">
                                <button
                                  className="btnadd add_item-detail btnadd_color"
                                  onClick={(e) => handleAddColor(e)}
                                >
                                  Lưu
                                </button>
                              </div>
                            </div>
                          )}
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
                    <div className="imgInfo">
                      <div className="addsize">
                        <div className="addSize_heading">
                          Mã sản phẩm <br />
                          <input
                            className="model_number des"
                            type="text"
                            name=""
                            id=""
                            value={modalNum}
                            onChange={(e) => setmodalNumber(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="save_container">
                      <div className="set_width"></div>
                      <div>
                        <div className="button_save_container">
                          <button className="btn_cancel">Hủy</button>
                          <button
                            className="btnadd"
                            onClick={(e) => handleInsertProduct(e)}
                          >
                            Thêm sản phẩm
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
