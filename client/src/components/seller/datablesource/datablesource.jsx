import { ENUM } from "../../../utils";

export const OderColumns = [
    { 
    field: "_id", headerName: "ID", width: 50 ,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
         {console.log(params.row)}
          {params.row._id}
        </div>
      );
    },
    },
    {
  
      width: 215  ,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            {params.row.buy_date}
          </div>
        );
      },
    },
   
  
    {
      field: "customer",
      headerName: "Customer",
      width: 160,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
           
            {params.row.customer_id.fullname}
          </div>
        );
      },
    },
    {
      field: "phone",
      headerName: "phone",
      width: 100,
      renderCell: (params) => {
        return (
          <div className={`cellWithStatus `}>
            {params.row.phone}
          </div>
        );
      },
    },
    {
      field: "address",
      headerName: "Address",
      width: 100,
      renderCell: (params) => {
        return (
          <div className={`cellWithStatus `}>
            {params.row.address}
          </div>
        );
      },
    },
  
    {
      field: "receiver",
      headerName: "Receiver",
      width: 120,
      renderCell: (params) => {
        return (
          <div className={`cellWithStatus `}>
            {params.row.receiver}
          </div>
        );
      },
    },
  
    
  
    {
      field: "payment",
      headerName: "Payment",
      width: 130,
      renderCell: (params) => {
        return (
          <div className={`cellWithStatus `}>
            {params.row.pay_id.name}
          </div>
        );
      },
    },
    {
      field: "status",
      headerName: "Status",
      width: 160,
      renderCell: (params) => {
        return (
          <div className={`cellWithStatus `}>
            {params.row.status.name}
          </div>
        );
      },
    },
  ];
export const productColumns = [
    { field: "id", headerName: "ID", width: 50 ,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
         
          {params.row.id}
        </div>
      );
    },
    },
    {
      field: "product",
      headerName: "Product",
      width: 250 ,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            <img className="cellImg2" src={params.row.img} alt="avatar" />
            {params.row.title}
          </div>
        );
      },
    },
    {
      field: "price",
      headerName: "Price",
      width: 100,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
           
            {params.row.price}
          </div>
        );
      },
    },
  
  
    {
      field: "category",
      headerName: "Category",
      width: 120,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
           
            {params.row.category}
          </div>
        );
      },
    },
    {
      field: "brand",
      headerName: "Brand",
      width: 100,
      renderCell: (params) => {
        return (
          <div className={`cellWithStatus `}>
            {params.row.brand}
          </div>
        );
      },
    },
    {
      field: "amount",
      headerName: "Amount",
      width: 80,
      renderCell: (params) => {
        return (
          <div className={`cellWithStatus `}>
            {params.row.availableQuantity}
          </div>
        );
      },
    },
    // {
    //   field: "seller",
    //   headerName: "Seller",
    //   width: 200,
    //   renderCell: (params) => {
    //     return (
    //       <div className="cellWithImg">
           
    //         {params.row.shop.name}
    //       </div>
    //     );
    //   },
    // },
  
    {
      field: "status",
      headerName: "Status",
      width: 100,
      renderCell: (params) => {
        return (
          <div className={`cellWithStatus `}>
            {ENUM.EProductStatus.getNameFromIndex(params.row?.status) || ENUM.EProductStatus.PRODUCT_UN_TRADING.name}
          </div>
        );
      },
    },
  
    
  ];