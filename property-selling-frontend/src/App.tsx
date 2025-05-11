import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DealerDashboard from "./components/Dashboard/DealerDashboard";
import PropertyDetailsPage from "./components/property/PropertyDetailsPage";
import HomePage from "./components/HomePage";
import Footer from "./components/Footer";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<Navbar />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<DealerDashboard />}></Route>
            <Route path="/properties/:id" element={<PropertyDetailsPage />} />
          </Route>
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
