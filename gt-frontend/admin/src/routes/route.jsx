import Home from "../pages/home/Home";
import Order from "../pages/order/Order";
import Login from "../pages/login/Login";
import NotFound from "../components/notfound/NotFound";
import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./protected.route";
import Layout from "../components/layout";

export const AdminRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Home />} />
        <Route
          path="orders"
          element={<Order title="Đơn hàng - thegioididong" />}
        />
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};
