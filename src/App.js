import { Route , Routes } from "react-router-dom";
import Dumbsplain from "./Pages/Dumbsplain";
import "./CSS/App.css";
import Test from "./Pages/Test";

function App() {

  return (
      <div className="App">
        <Routes>
          <Route path="/" element={<Dumbsplain />} />
          <Route path="/test" element={<Test />} />
        </Routes>
      </div>
  );
}

export default App;
