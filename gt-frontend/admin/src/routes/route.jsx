import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import NotFound from "../components/notfound/NotFound";
import { Routes, Route } from "react-router-dom";
import Layout from "../components/layout";
import ListProduct from "../pages/list/ListProduct";
import Order from "../pages/order/Order";
export const AdminRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
     
            <Layout />
         
        }
      >
        <Route index element={<Home />} />
        <Route
          path="orders"
          element={<Order title="Đơn hàng - thegioididong" />}
        />
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="products">
          <Route index element={<ListProduct />} />
          <Route
            path=":productId"
           
          />
          <Route path="new" />
        </Route>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};
