import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SuggestBoard from "./pages/SuggestBoard";
import Settings from "./pages/Settings";
import Tutorial from "./pages/Tutorial";
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
            <Route path="/suggest-board" element={<SuggestBoard />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/" element={<Tutorial />} />
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
