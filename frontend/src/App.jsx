import Footer from "./components/Footer.jsx";
import Restaurant from "./pages/Restaurant.jsx";
import Reservation from "./pages/Reservation.jsx";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar.jsx";
import Home from "./pages/Home.jsx";
import Menu from "./pages/Menu.jsx";
import FineDining from "./pages/FineDining.jsx";
import DishDetails from "./pages/DishDetails.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Account from "./pages/Account.jsx";
import Admin from "./pages/Admin.jsx";
import Cart from "./pages/Cart.jsx";
import OrderConfirmation from "./pages/OrderConfirmation.jsx";
import MyOrders from "./pages/MyOrders.jsx";
import MyReservations from "./pages/MyReservations.jsx";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/fine-dining" element={<FineDining />} />
        <Route path="/menu/:id" element={<DishDetails />} />
        <Route path="/reservation" element={<Reservation />} />
        <Route path="/restaurant" element={<Restaurant />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/account" element={<Account />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/my-orders" element={<MyOrders />} />
        <Route path="/my-reservations" element={<MyReservations />} />

        <Route path="/order-confirmation" element={<OrderConfirmation />} />

        <Route path="/admin" element={<Admin />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
