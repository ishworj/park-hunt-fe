import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import FooterNav from "./components/FooterNav.jsx";
import Explore from "./components/Explore.jsx";
import AddSpot from "./components/AddSpot.jsx";
import Favorites from "./components/Favorites.jsx";
import Home from "./components/Home.jsx";
function App() {
  return (
    <Router>
      <Header />
      <div className="App" >
        <Routes>
          <Route path="*" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/addspot" element={<AddSpot />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </div>
      <FooterNav />
    </Router>
  );
}

export default App;
