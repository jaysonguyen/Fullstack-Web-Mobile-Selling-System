const {
  addOrder,
  addOrderDetails,
  editStatus,
  getOrderByEmail,
} = require("../services/orderServices");

const {
  accessKey,
  secretKey,
  endpoint,
  orderInfo,
  partnerCode,
  redirectUrl,
  ipnUrl,
  requestType,
  amount,
  orderId,
  requestId,
  extraData,
  paymentCode,
  orderGroupId,
  autoCapture,
  lang,
} = require("../config/configMoMoPayment");

const createOrder = async (req, res) => {
  try {
    let randomNumber = Math.random(1, 9999);
    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();
    let formattedDate =
      year +
      month.toString().padStart(2, "0") +
      day.toString().padStart(2, "0");
    let orderKey = formattedDate + randomNumber;
    const { name, phone, email, address, total, pay, billDetails } = req.body;
    console.log(orderKey, name, phone, email, address, total, pay, billDetails);
    const data = await addOrder(
      orderKey,
      name,
      phone,
      email,
      address,
      total,
      pay
    );
    if (data) {
      for (let i = 0; i < billDetails.length; i++) {
        let data = await addOrderDetails(
          orderKey,
          billDetails[i].priceItem,
          billDetails[i].hardware,
          billDetails[i].colorItem,
          billDetails[i].nameItem,
          billDetails[i].imageItem
        );
      }
      return res.status(200).json({
        EM: data.EM,
        EC: data.EC,
        DT: orderKey,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      EM: "Error from server",
      EC: -1,
      DT: "",
    });
  }
};

const makePayment = (total) => {
  return new Promise((resolve, reject) => {
    try {
      if (total) {
        var rawSignature =
          "accessKey=" +
          accessKey +
          "&amount=" +
          total +
          "&extraData=" +
          extraData +
          "&ipnUrl=" +
          ipnUrl +
          "&orderId=" +
          orderId +
          "&orderInfo=" +
          orderInfo +
          "&partnerCode=" +
          partnerCode +
          "&redirectUrl=" +
          redirectUrl +
          "&requestId=" +
          requestId +
          "&requestType=" +
          requestType;
        const crypto = require("crypto");
        var signature = crypto
          .createHmac("sha256", secretKey)
          .update(rawSignature)
          .digest("hex");

        //json object send to MoMo endpoint
        const requestBody = JSON.stringify({
          partnerCode: partnerCode,
          partnerName: "Fast Bite",
          storeId: "Fast Bite Store",
          requestId: requestId,
          amount: total,
          orderId: orderId,
          orderInfo: orderInfo,
          redirectUrl: redirectUrl,
          ipnUrl: ipnUrl,
          lang: lang,
          requestType: requestType,
          autoCapture: autoCapture,
          extraData: extraData,
          orderGroupId: orderGroupId,
          signature: signature,
        });

        //Create the HTTPS objects
        const https = require("https");
        const options = {
          hostname: "test-payment.momo.vn",
          port: 443,
          path: "/v2/gateway/api/create",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Content-Length": Buffer.byteLength(requestBody),
          },
        };

        //Send the request and get the response
        const req = https.request(options, (res) => {
          console.log(`Status: ${res.statusCode}`);
          console.log(`Headers: ${JSON.stringify(res.headers)}`);
          res.setEncoding("utf8");
          res.on("data", (body) => {
            resolve(JSON.parse(body));
          });
          res.on("end", () => {
            console.log("No more data in response.");
          });
        });

        req.on("error", (e) => {
          console.log(`problem with request: ${e.message}`);
          reject(e);
        });
        // write data to request body
        console.log("Sending....");
        req.write(requestBody);
        req.end();
      }
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

const paymentBill = async (req, res) => {
  let { total } = req.body;
  let result = "";
  console.log("total ne", total);
  await makePayment(total)
    .then((response) => {
      result = response.payUrl;
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      return res.status(200).json({
        EM: "Get QR code success",
        EC: 1,
        DT: result,
      });
    });
};

const updateBillStatus = async (req, res) => {
  try {
    const { id } = req.body;
    const data = await editStatus(id);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: "",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "Error from server",
      EC: -1,
      DT: "",
    });
  }
};

const getBillByEmail = async (req, res) => {
  try {
    const email = req.params.id;
    const data = await getOrderByEmail(email);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      EM: "Error from server",
      EC: -1,
      DT: "",
    });
  }
};

module.exports = { createOrder, paymentBill, updateBillStatus, getBillByEmail };
