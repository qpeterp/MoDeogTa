import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SuggestBoard from "./pages/SuggestBoard";
import Settings from "./pages/Settings";
import Tutorial from "./pages/Tutorial";
import { SoundProvider } from "./contexts/SoundContext";
import Header from "./components/Header";

function App() {
  return (
    <SoundProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/suggest-board" element={<SuggestBoard />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/" element={<Tutorial />} />
        </Routes>
      </Router>
    </SoundProvider>
  );
}

export default App;
