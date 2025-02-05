import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SuggestBoard from "./pages/SuggestBoard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} className="non-scroll" />
        <Route path="/suggest-board" element={<SuggestBoard />} />
      </Routes>
    </Router>
  );
}

export default App;
