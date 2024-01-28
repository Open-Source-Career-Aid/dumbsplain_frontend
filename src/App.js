import { Route , Routes } from "react-router-dom";
import SignupPage from "./Components/SignupPage";
import Dumbsplain from "./Pages/Dumbsplain";
import "./CSS/App.css";
import Test from "./Pages/Test";
import React, { useState } from "react";
import ReactGA4 from 'react-ga4';
import { GTAG } from "./config";
import DumbsplainError from "./Pages/Error";

import UserContext from "./userContext";

function App() {

  // useContext state for user
  const [user, setUser] = useState(null)

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
        <UserContext.Provider value={ {user, setUser}}>
          <Routes>
            <Route path="/" element={<Dumbsplain
            theme={theme}
            setTheme={setTheme}
            />} />
            <Route path="/test" element={<Test />} />
            {/* on 404 show 404 page*/}
            <Route path="*" element={<DumbsplainError />} />
            <Route path="signup" element={<SignupPage />} />
          </Routes>
        </UserContext.Provider>
      </div>
  );
}

export default App;
