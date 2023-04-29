//import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
//import TopGameList from "./TopGameList";
import React from "react";
import AllGames from "./AllGames";
import AddGame from "./AddGame";
import EditGame from "./EditGame";

function App() {
  return (
    <div className="App">
      <Router>
      <Routes>
          <Route path="/" element={<AllGames />} />
          <Route path="/create" element={<AddGame />} />
          <Route path="/update/:id"  element={<EditGame />} />
        </Routes>
        </Router>
    </div>
  );
}

export default App;
