import React, { useEffect, useState } from "react";
import "./OrderCustomer.css";
import { getOrderUser } from "../../../Services/orderServices";

function OrderCustomer(props) {
  const [order, setorder] = useState();

  const dataEmail = sessionStorage.getItem("account");
  const emailJson = JSON.parse(dataEmail).email;

  const fetchOrderUser = async () => {
    let data = await getOrderUser(emailJson);
    if (data && +data.EC == 1) {
      setorder(data.DT);
      console.log(data);
    }
  };

  useEffect(() => {
    fetchOrderUser();
  }, []);

  return (
    <div className="orderCustomer_container">
      <h1>Đơn hàng của bạn</h1>
      <div className="order_customer_container row">
        <div className="orderCustomer_table col col-12">
          <div className="order_list_customer row">
            <div className="label_order_customer col col-2">Mã đơn hàng</div>
            <div className="label_order_customer col col-3">
              Thông tin đơn hàng
            </div>
            <div className="label_order_customer col col-2">Thanh toán</div>
            <div className="label_order_customer col col-2">Giao hàng</div>
            <div className="label_order_customer col col-2">Địa chỉ</div>
            <div className="label_order_customer col col-1">Tổng</div>
          </div>
          <div className="separate"></div>
          {order &&
            order.map((item) => {
              return (
                <div className="order_list_customer order_item_render row">
                  <div className="label_order_customer addressOrder_infor col col-2">
                    <p>{item.ID_BILL}</p>
                  </div>
                  <div className="label_order_customer col col-3 order_item_infor">
                    <div className="label_order_customer order_infor_order_image">
                      <img src={item.imagePro} />
                    </div>
                    <div>
                      <div className="label_order_customer order_infor_color">
                        Sản phẩm: {item.namePro}
                      </div>
                      <div className="label_order_customer order_infor_color">
                        Màu:{" "}
                        <span
                          className="color_order_product"
                          style={{ background: `${item.color}` }}
                        ></span>
                      </div>
                      <div className="label_order_customer order_infor_hard">
                        Cấu hình: {item.hw}
                      </div>
                    </div>
                  </div>
                  <div
                    className={
                      item.billStatus == "Chờ"
                        ? "label_order_customer col col-2 statusWaitting"
                        : "label_order_customer col col-2 statusSuccess"
                    }
                  >
                    <p>{item.billStatus}</p>
                  </div>
                  <div className="label_order_customer col col-2 statusWaitting">
                    <p>{item.orderStatus}</p>
                  </div>
                  <div className="label_order_customer addressOrder_infor col col-2">
                    <p>{item.cusAddress}</p>
                  </div>
                  <div className="label_order_customer addressOrder_infor col col-1">
                    <p>{item.TOTAL}</p>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default OrderCustomer;
