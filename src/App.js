import "./App.scss";
import Navigation from "./components/Navigation";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./views/Home";
import Units from "./views/Units";
import UnitDetail from "./views/UnitDetail";

function App() {
  return (
    <Router>
      <div className="main">
        <Navigation />
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/units" Component={Units} />
          <Route path="/units/:id" Component={UnitDetail} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;