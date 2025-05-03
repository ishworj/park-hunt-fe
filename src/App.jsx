import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Header from "./components/Header.jsx";
import FooterNav from "./components/FooterNav.jsx";
import Explore from "./components/Explore.jsx";
import AddSpot from "./components/AddSpot.jsx";
import Favorites from "./components/Favorites.jsx";
import Home from "./components/Home.jsx";

function LayoutWrapper() {
  const location = useLocation();
  const hideHeader = location.pathname === "/explore";

  return (
    <>
      {!hideHeader && <Header />}

      <div
        className="App"
        style={{
          marginTop: hideHeader ? "0" : "67px", 
        }}
      >
        <Routes>
          <Route path="*" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/addspot" element={<AddSpot />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </div>

      <FooterNav />
    </>
  );
}

function App() {
  return (
    <Router>
      <LayoutWrapper />
    </Router>
  );
}

export default App;
