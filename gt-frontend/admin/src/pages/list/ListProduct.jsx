import "./list.scss";
import { useState, useEffect } from "react";
import Datatable from "./../../components/datatable/Datatable";
import { useLocation } from "react-router-dom";
import { productColumns } from "./../../datatablesource";
import { useDispatch, useSelector } from "react-redux";


const ListProduct = () => {
  const locationUrl = useLocation();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.products.pageProduct.data);
  return (
    <div>
      <div>
        <Datatable
          rows={data}
          title=""
          productColumns={productColumns()}
          type="products"
        />
      </div>
    </div>
  );
};

export default ListProduct;
