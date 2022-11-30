import Sidebar from "../../../Components/seller/sidebar/Sidebar";
import Navbar from "../../../Components/seller/navbar/Navbar";
import "./home.scss";
import Widget from "../../../components/seller/widget/Widget";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const HomeSeller = () => {
  const navigate = useNavigate();

  const user = useSelector((state) => state?.auth?.login?.currentUser);
  useEffect(() => {
    // if (user === null || user?.role !== "2") {
    //   navigate("/");
    // }
  });

  return ( 
        <div className="widgets">
          <Widget type="order" />
          <Widget type="earning" />
          <Widget type="balance" />
        </div>
       
  );
};

export default HomeSeller;
