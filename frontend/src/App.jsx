import Footer from "./components/Footer.jsx";
import Restaurant from "./pages/Restaurant.jsx";
import Reservation from "./pages/Reservation.jsx";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar.jsx";
import Home from "./pages/Home.jsx";
import Menu from "./pages/Menu.jsx";
import DishDetails from "./pages/DishDetails.jsx";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/menu/:id" element={<DishDetails />} />
         <Route path="/reservation" element={<Reservation />} />
         <Route path="/restaurant" element={<Restaurant />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;