import { Route , Routes } from "react-router-dom";
import Dumbsplain from "./Pages/Dumbsplain";
import "./CSS/App.css";
import Test from "./Pages/Test";
import React from "react";
import ReactGA4 from 'react-ga4';
import { GTAG } from "./config";

function App() {

  const [theme, setTheme] = React.useState('light');
  const measurementId = GTAG;
  ReactGA4.initialize(measurementId);

  return (
      <div className="App"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        width: "100%",
        padding: "0",
      }}
      >
        <div className='bg' data-theme={theme}></div>
        <Routes>
          <Route path="/" element={<Dumbsplain
          theme={theme}
          setTheme={setTheme}
           />} />
          <Route path="/test" element={<Test />} />
        </Routes>
      </div>
  );
}

export default App;
