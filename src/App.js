import React from "react";
import { Route, Routes } from "react-router-dom";
import WeatherCard from "./components/weathercard/index.jsx"
import Weather from "./pages/main/index.jsx";
function App() {
  return (
    <>
      <Weather/>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
      </Routes>
    </>
  );
}

export default App;
