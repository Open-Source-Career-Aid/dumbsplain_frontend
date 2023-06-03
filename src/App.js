import { Route , Routes } from "react-router-dom";
import Dumbsplain from "./Pages/Dumbsplain";
import "./CSS/App.css";
import Test from "./Pages/Test";

function App() {

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
        <Routes>
          <Route path="/" element={<Dumbsplain />} />
          <Route path="/test" element={<Test />} />
        </Routes>
      </div>
  );
}

export default App;
