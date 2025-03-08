import axios from "axios";

export const requestKakaoPay = async (userId, amount) => {
  try {
    // 저장된 orderId, tid, pgToken 초기화
    localStorage.clear();

    const orderId = new Date().getTime();
    const response = await axios.post(
      "https://requestkakaopay-a6z55ez5bq-uc.a.run.app",
      //   "http://127.0.0.1:8081/modeogta-b54db/us-central1/requestKakaoPay",
      { userId, amount, orderId }
    );

    localStorage.setItem("tid", response.data.tid);
    localStorage.setItem("userId", userId);
    localStorage.setItem("orderId", orderId);

    const nextRedirectUrl = response.data.next_redirect_pc_url;
    if (nextRedirectUrl) {
      window.location.href = nextRedirectUrl; // 카카오페이 결제 페이지로 리다이렉트
    }
  } catch (error) {
    alert(error.message); // 오류 메시지 표시
  }
};

export const responseKakaoPayApproval = async (pgToken) => {
  // 로컬 스토리지에서 값을 가져옴
  const orderId = localStorage.getItem("orderId");
  const userId = localStorage.getItem("userId");
  const tid = localStorage.getItem("tid");
  const savedPgToken = localStorage.getItem("pgToken", pgToken);

  if (savedPgToken === pgToken) return;

  localStorage.setItem("pgToken", pgToken);
  try {
    const response = await axios.post(
      //   "https://us-central1-modeogta-b54db.cloudfunctions.net/handleKakaoPayApproval",
      "https://handleKakaoPayApproval-a6z55ez5bq-uc.a.run.app",

      {
        pgToken,
        orderId,
        userId,
        tid,
      }
    );
    return response.data.success;
  } catch (error) {
    // console.error("결제 승인 처리 실패:", error);
    window.location.href = "/payment/failed"; // 결제 실패 페이지로 리다이렉트
  }
};
