import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import ItemListing from "./pages/ItemListing";
import ProductDetail from "./pages/ProductDetail";
import MainLayout from "./components/MainLayout";

function App() {
  return (
    <Routes>
      {/* No Nav / Sidebar on Login & Signup */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<RegisterPage />} />

      {/* With Nav & Sidebar */}
      <Route path="/home" element={<MainLayout><LandingPage /></MainLayout>} />
      <Route path="/dashboard" element={<MainLayout><Dashboard /></MainLayout>} />
      <Route path="/listing/:id" element={<MainLayout><ItemListing /></MainLayout>} />
      <Route path="/product/new" element={<MainLayout><ProductDetail /></MainLayout>} />
    </Routes>
  );
}

export default App;
