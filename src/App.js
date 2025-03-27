import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import SuggestBoard from "./pages/suggest-board/SuggestBoard";
import Settings from "./pages/setting/Settings";
import Tutorial from "./pages/tutorial/Tutorial";
import Payment from "./pages/payment/Payment";
import PaymentSuccess from "./components/PaymentSuccess";
import PaymentFailed from "./components/PaymentFailed";
import PaymentCancel from "./components/PaymentCancel";
import { SoundProvider } from "./contexts/SoundContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import Header from "./components/Header";
import { useTheme } from "./contexts/ThemeContext";

function App() {
  const { backgroundUrl, alpha } = useTheme();

  const containerStyle = {
    position: "relative",
    minHeight: "100%",
  };

  const backgroundStyle = {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundImage: backgroundUrl ? `url(${backgroundUrl})` : "none",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundAttachment: "fixed",
    opacity: alpha, // 배경만 투명하게 조절 가능
    zIndex: -1, // 배경을 뒤로 보내기
  };

  return (
    <SoundProvider>
      <Router>
        <Header />
        <div style={containerStyle}>
          <div style={backgroundStyle}></div>

          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/suggest-board" element={<SuggestBoard />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/" element={<Tutorial />} />

            <Route path="/payment" element={<Payment />} />
            <Route path="/payment/success" element={<PaymentSuccess />} />
            <Route path="/payment/failed" element={<PaymentFailed />} />
            <Route path="/payment/cancel" element={<PaymentCancel />} />
          </Routes>
        </div>
      </Router>
    </SoundProvider>
  );
}

export default function AppWithThemeProvider() {
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
}
