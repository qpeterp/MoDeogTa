import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Battle from "./pages/battle/Battle";
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
  const { backgroundUrl } = useTheme();

  const containerStyle = {
    backgroundImage: backgroundUrl ? `url(${backgroundUrl})` : "none",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundAttachment: "fixed",
    minHeight: "100%",
  };

  return (
    <SoundProvider>
      <Router>
        <Header />
        <div style={containerStyle}>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/battle" element={<Battle />} />
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
