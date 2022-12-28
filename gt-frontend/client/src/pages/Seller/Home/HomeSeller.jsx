import "./home.scss";
import Widget from "../../../components/seller/widget/Widget";
import Chart from "../../../components/seller/chart/Chart";
import Featured from "../../../components/seller/featured/Featured";
import Table from "../../../components/seller/table/Table";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersByShopApi } from "../../../redux/orderShop/ordershopsApi";

const HomeSeller = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state?.auth?.login?.currentUser);
  const getUser = JSON.parse(localStorage.getItem('customerInfo'));
  useEffect(() => {
    getAllOrdersByShopApi(dispatch, getUser.shopId, { limit: 5, sortField: 'createdAt', sortDir: 'dec' });
  }, []);

  return ( 
    <div>
        <div className="widgets">
          <Widget type="order" />
          <Widget type="earning" />
          <Widget type="balance" />
        </div>
        <div className="charts">
                <Featured />
                <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
            </div>
            <div className="listContainer">
                <div className="listTitle">Latest Transactions</div>
                <Table />
            </div>
       </div>
  );
};

export default HomeSeller;
