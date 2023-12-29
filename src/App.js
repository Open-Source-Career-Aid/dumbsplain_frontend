import { Route , Routes } from "react-router-dom";
import Dumbsplain from "./Pages/Dumbsplain";
import "./CSS/App.css";
import Test from "./Pages/Test";
import React, { useState } from "react";
import ReactGA4 from 'react-ga4';
import { GTAG } from "./config";
import DumbsplainError from "./Pages/Error";
import SignupPage from "./Components/SignupPage";

function App() {

  const [theme, setTheme] = React.useState('light');
  const measurementId = GTAG;
  ReactGA4.initialize(measurementId);

  const [userLoggedIn, setUserLoggedIn] = useState(false)

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
          userLoggedIn={userLoggedIn}
          setUserLoggedIn={setUserLoggedIn}
          />} />
          <Route path="/test" element={<Test />} />
          {/* on 404 show 404 page*/}
          <Route path="*" element={<DumbsplainError />} />
          <Route path="signup" element={<SignupPage userLoggedIn={userLoggedIn}
          setUserLoggedIn={setUserLoggedIn}/>} />
        </Routes>
      </div>
  );
}

export default App;
