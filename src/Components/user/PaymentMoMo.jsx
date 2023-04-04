import React, { useEffect } from "react";
//import CryptoJS from "crypto-js";
const MomoPayment = () => {
  // Define the initial payment data state with default values
  //   const [paymentData, setPaymentData] = useState({
  //     partnerCode: "MOMOGEIB20220529",
  //   accessKey: "w5osEIxOkogP9Orp",
  //   secretKey: "0LA4ectXuLQ3qHgMUEFBTLcgj47x8sCw",
  //   amount: "50000",
  //   orderId: "1234567890",
  //   orderInfo: "Payment for order #1234567890",
  //   returnUrl: "",
  //   notifyUrl: "https://example.com/payment-notification",
  //   requestType: "captureMoMoWallet",
  //   });
  const handlePayment = () => {
    var MomoClient = new window.MoMo.Client();
    MomoClient.init({
      accessKey: "YOUR_ACCESS_KEY",
      partnerCode: "YOUR_PARTNER_CODE",
      requestId: "YOUR_REQUEST_ID",
      amount: "YOUR_AMOUNT",
      orderId: "YOUR_ORDER_ID",
      orderInfo: "YOUR_ORDER_INFO",
      returnUrl: "YOUR_RETURN_URL",
      notifyUrl: "YOUR_NOTIFY_URL",
      extraData: "YOUR_EXTRA_DATA",
    });

    MomoClient.pay();
  };
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://developers.momo.vn/momosdk/web/1.0.0/momo-sdk-web.min.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <>
      <button onClick={handlePayment}>Thanh toán qua Momo</button>
    </>
  );
};

export default MomoPayment;
