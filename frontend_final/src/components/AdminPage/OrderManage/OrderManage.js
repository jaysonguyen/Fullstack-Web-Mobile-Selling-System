import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { getAllOrder } from "../../../Services/orderDetail";
import "../Home.css";
import { BsFilter } from "react-icons/bs";
import { MdAttachFile } from "react-icons/md";
import { TbFileExport } from "react-icons/tb";
import "./OrderManage.css";

const OrderManage = (props) => {
  const [order, setOrder] = useState([]);

  const fetchOrder = async () => {
    try {
      let data = await getAllOrder();
      console.log(data.DT);
      setOrder(data.DT);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchOrder();
  }, []);

  function renderStatus(status) {
    switch (status) {
      case "1":
        return <button className="btn_order_1">Đã giao</button>;
      case "2":
        return <button className="btn_order_2">Đang giao </button>;
      case "3":
        return <button className="btn_order_3">Chuẩn bị hàng </button>;
      case "4":
        return <button className="btn_order_4">Chờ xác nhận </button>;

      default:
        return null;
    }
  }

  return (
    <div className="order_container">
      <div className="order_body">
        <h5 class="card_title">Danh sách đặt hàng </h5>
        <div className="order_body_func">
          <div className="order_body_func_search">
            {/* icons */}
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
                  <th>Tên khách hàng </th>
                  <th>Tên sản phẩm</th>
                  <th>Ngày đặt hàng</th>
                  <th>Phương thức nhận </th>
                  <th>Đơn hàng</th>
                  <th>Thanh toán</th>
                </tr>
              </thead>
              <tbody>
                {order &&
                  order.map((order) => {
                    return (
                      <tr key={order.id}>
                        <td>{order.id}</td>
                        <td>{order.CUSTOMER_NAME}</td>
                        <td>{order.PRODUCT_NAME}</td>
                        <td>{order.DATE_ORDER}</td>
                        <td>
                          {
                            (order.METHOD_RECEIVE == 1 ? (
                              <button className="btn_method_2">
                                Giao hàng tại nhà
                              </button>
                            ) : (
                              <button className="btn_method_1">
                                Nhận tại cửa hàng
                              </button>
                            ))
                          }
                        </td>
                        <td>{renderStatus(order.ORDER_STATUS)}</td>
                        <td>
                          {order.isPay == 1 ? (
                            <button className="btn_pay_null">
                              Chưa thanh toán
                            </button>
                          ) : (
                            <button className="btn_pay_true">
                              Đã thanh toán
                            </button>
                          )}
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
  );
};

export default OrderManage;
