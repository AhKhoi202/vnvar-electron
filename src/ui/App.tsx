import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import LiveScreen from "./pages/LiveScreen";
import HomeScreen from "./pages/HomeScreen";

import "./App.css";
import LiveScreenWS from "./pages/LiveScreenWS";

function App() {
  return (
    <main className="main">
      <Router>
        <Routes>
          {/* <Route path="/" element={<Screenshort />} /> */}
          <Route path="/" element={<HomeScreen />} />
          <Route path="/liveScreen" element={<LiveScreen />} />
          <Route path="/liveScreenws" element={<LiveScreenWS />} />
        </Routes>
      </Router>
    </main>
  );
}

export default App;
