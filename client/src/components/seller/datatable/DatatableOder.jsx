import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { OderColumns } from "../datablesource/datablesource";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const Datatable = () => {
  
  // const dispatch = useDispatch()
  // const navigate = useNavigate()
  const oderList = useSelector((state)=> state.oder?.oders?.allOder)
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={`/seller/orders/${params.row._id}`}>
            <div
              className="updateButton" >Detail</div>
            </Link>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Add New Order
        <Link to="/admin/products/new" className="link">
          Add New
        </Link>
      </div>   
        <DataGrid getRowId={(row) => row._id}
        className="datagrid"
        rows={oderList|| []}
        columns={OderColumns.concat(actionColumn)}
        pageSize={8}
        rowsPerPageOptions={[8]}
        checkboxSelection
          />
    </div>
  );
};

export default Datatable;
