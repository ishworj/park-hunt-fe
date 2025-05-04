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

function LayoutWrapper() {
  const location = useLocation();
  const showHeader = location.pathname === "/addspot";

  return (
    <>
      {showHeader && <Header />}

      <div
        className="App"
        style={{
          marginTop: showHeader ? "67px" : "0", 
        }}
      >
        <Routes>
          <Route path="*" element={<Explore />} />
          <Route path="/addspot" element={<AddSpot />} />
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
