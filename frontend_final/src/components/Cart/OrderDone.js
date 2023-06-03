import React, { useEffect } from "react";
import "./FormOrder.css";
import { updateOrderStatus } from "../../Services/orderServices";
import { useNavigate } from "react-router-dom";
import { rmAll } from "../../Services/cart";

const OrderDone = (props) => {
  const navigate = useNavigate();

  const handleRmAllCart = async (id) => {
    await rmAll(id);
  };

  const handleUpdateStatus = async () => {
    let dataRaw = localStorage.getItem("cartID");
    let updateData = await updateOrderStatus(dataRaw);
    let carID = localStorage.getItem("customerKey");
    await handleRmAllCart(carID);
    localStorage.removeItem("cartID");
    localStorage.removeItem("customerKey");
  };

  const handleCompletebtn = () => {
    navigate("/");
  };

  useEffect(() => {
    handleUpdateStatus();
  }, []);

  return (
    <div className="complete_contaier">
      <h1 className="margin_top_coplete_container">Cảm ơn Bạn</h1>
      <p>
        Chúng tôi sẽ chuẩn bị cho đơn hàng của bạn trong thời gian sớm nhất. Cảm
        ơn bạn đã tin tưởng và sử dụng dịch vụ của chúng tôi. Chúc bạn thành
        công và may mắn.
      </p>
      <button className="view_order_btn" onClick={() => handleCompletebtn()}>
        Trở về trang chủ
      </button>
      <a className="ruleLink formorderrulelink">
        {" "}
        xem lại điều khoản và diều kiện của website
      </a>
    </div>
  );
};

export default OrderDone;
