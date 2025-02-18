import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import LiveScreen from "./pages/LiveScreen";
import HomeScreen from "./pages/HomeScreen";
import "./App.css"

function App() {
  return (
    <main className="main">
      <Router>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/liveScreen" element={<LiveScreen />} />
        </Routes>
      </Router>
    </main>
  );
}

export default App;
