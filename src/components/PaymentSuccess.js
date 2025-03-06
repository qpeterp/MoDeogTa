import React from "react";

const PaymentSuccess = () => {
  //   useEffect(() => {
  //     const params = new URLSearchParams(window.location.search);
  //     const orderId = params.get("partner_order_id");

  //     if (orderId) {
  //       updatePaymentStatus(orderId, "approved"); // Firestore 상태 업데이트
  //     }
  //   }, []);

  return (
    <div style={{ margin: "100px" }}>
      <h1>결제가 완료되었습니다!</h1>
    </div>
  );
};

export default PaymentSuccess;
