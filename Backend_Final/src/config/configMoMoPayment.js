var accessKey = "F8BBA842ECF85";
var secretKey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";
var endpoint = "http://localhost:3000/";
var orderInfo = "pay with MoMo";
var partnerCode = "MOMO";
var redirectUrl = "http://localhost:3000/done/order";
var ipnUrl = "http://localhost:3000/done/order";
var requestType = "payWithMethod";
var amount = "1000";
var orderId = partnerCode + new Date().getTime();
var requestId = orderId;
var extraData = "";
var paymentCode =
  "T8Qii53fAXyUftPV3m9ysyRhEanUs9KlOPfHgpMR0ON50U10Bh+vZdpJU7VY4z+Z2y77fJHkoDc69scwwzLuW5MzeUKTwPo3ZMaB29imm6YulqnWfTkgzqRaion+EuD7FN9wZ4aXE1+mRt0gHsU193y+yxtRgpmY7SDMU9hCKoQtYyHsfFR5FUAOAKMdw2fzQqpToei3rnaYvZuYaxolprm9+/+WIETnPUDlxCYOiw7vPeaaYQQH0BF0TxyU3zu36ODx980rJvPAgtJzH1gUrlxcSS1HQeQ9ZaVM1eOK/jl8KJm6ijOwErHGbgf/hVymUQG65rHU2MWz9U8QUjvDWA==";
var orderGroupId = "";
var autoCapture = true;
var lang = "vi";

module.exports = {
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
};
