import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SuggestBoard from "./pages/SuggestBoard";
import Settings from "./pages/Settings";
import { SoundProvider } from "./contexts/SoundContext";

function App() {
  return (
    <SoundProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} className="non-scroll" />
          <Route path="/suggest-board" element={<SuggestBoard />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Router>
    </SoundProvider>
  );
}

export default App;
