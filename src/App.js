import { Route , Routes } from "react-router-dom";
import Dumbsplain from "./Pages/Dumbsplain";
import "./CSS/App.css";

function App() {

  return (
      <div className="App">
        <Routes>
          <Route path="/" element={<Dumbsplain />} />
        </Routes>
      </div>
  );
}

export default App;
