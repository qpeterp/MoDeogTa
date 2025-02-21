import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SuggestBoard from "./pages/SuggestBoard";
import Settings from "./pages/Settings";
import Tutorial from "./pages/Tutorial";
import { SoundProvider } from "./contexts/SoundContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import Header from "./components/Header";

function App() {
  return (
    <SoundProvider>
      <ThemeProvider>
        <Router>
          <Header />
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/suggest-board" element={<SuggestBoard />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/" element={<Tutorial />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </SoundProvider>
  );
}

export default App;
