import React, { useEffect, useRef } from "react";
import "./Payment.scss";
import { requestKakaoPay } from "../services/paymentService";
import { responseKakaoPayApproval } from "../services/paymentService";
import { useNavigate } from "react-router-dom";

function Payment() {
  const navigate = useNavigate();
  const isExecuted = useRef(false);

  const handleRequestKakaoPay = async () => {
    const redirectUrl = await requestKakaoPay("peter", "300");
    if (redirectUrl) {
      window.location.href = redirectUrl; // 카카오페이 결제 페이지로 이동
    } else {
      alert("결제 요청 실패!");
    }
  };

  useEffect(() => {
    if (!isExecuted.current) {
      isExecuted.current = true;

      const urlParams = new URLSearchParams(window.location.search);
      const pg_token = urlParams.get("pg_token");

      console.log(`pg_token: ${pg_token}`);

      if (pg_token) {
        const isSuccess = responseKakaoPayApproval(pg_token);

        if (isSuccess) {
          navigate("/payment/success"); // 결제 성공 페이지로 리다이렉트
        } else {
          navigate("/payment/failed"); // 결제 실패 페이지로 리다이렉트
        }
      } else {
        console.log("결제 승인 파라미터 없음");
      }
    }
  }, [navigate]);

  return (
    <div className="payment-root">
      <p style={{ color: "white" }}>단돈 300원에 연습글을 추가해보세요!</p>
      <button onClick={handleRequestKakaoPay}> 카카오페이 결제하기</button>
    </div>
  );
}

export default Payment;
