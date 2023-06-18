import "./home.scss";
import Widget from "../../../components/seller/widget/Widget";
import Chart from "../../../components/seller/chart/Chart";
import Featured from "../../../components/seller/featured/Featured";
import Table from "../../../components/seller/table/Table";
import swal from 'sweetalert';
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersByShopApi } from "../../../redux/orderShop/orderShopsApi";
import { shopService } from "../../../services";
import { getByShopId } from "../../../redux/shop/shopApi";
const HomeSeller = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const getUser = JSON.parse(localStorage.getItem('customerInfo'));
  useEffect(() => {
    getAllOrdersByShopApi(dispatch, getUser.shopId, { limit: 5, sortField: 'createdAt', sortDir: 'dec' });
    getByShopId(dispatch,getUser.shopId)
  }, []);
  
  const user = useSelector((state) => state?.shops?.viewShop);
  if(user?.shopPrice == null){
    swal({
      title: 'Notify',
      text: 'Cần mua gói gia hạn trước khi thực hiện giao dịch',
      icon: 'warning',
    });
    navigate('/Seller/package')
  }

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
