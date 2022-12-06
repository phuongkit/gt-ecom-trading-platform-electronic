import './datatable.scss';
import { DataGrid } from '@mui/x-data-grid';
import { productColumns } from '../datablesource/datablesource';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllProductApi, deleteProduct } from '../../../redux/product/productsApi';

const Datatable = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const getUser = JSON.parse(localStorage.getItem('customerInfo'));
    useEffect(() => {
        getAllProductApi(dispatch, { shopId: getUser?.shopId });
    }, []);
    const productList = useSelector((state) => state.products?.pageProduct?.data);
    useEffect(() => {
        if (getUser.role != 1) {
            navigate('/');
        }

        // if(getUser?.accessToken){
        //   getProductSeller(user?.accessToken,dispatch,user?._id)
        // }
    }, []);

    const handleDelete = (id) => {
        // setData(data.filter((item) => item._id !== id));
        // deleteUser(user?.accessToken, dispatch, id)
        deleteProduct(id, dispatch, navigate, productList);
    };

    const actionColumn = [
        {
            field: 'action',
            headerName: 'Action',
            width: 200,
            renderCell: (params) => {
                return (
                    <div className="cellAction">
                        <Link to={`/seller/products/edit/${params.row.id}`}>
                            <div className="updateButton">Edit</div>
                        </Link>
                        <div className="deleteButton" onClick={() => handleDelete(params.row.id)}>
                            Delete
                        </div>
                    </div>
                );
            },
        },
    ];
    return (
        <div className="datatable">
            <div className="datatableTitle">
               
                <Link to="/seller/products/addProduct" className="link">
                    Add New
                </Link>
            </div>
            <DataGrid
                sx={{
                    typography: {
                        fontSize: 12,
                        '& .MuiTablePagination-displayedRows': {
                            fontSize: 12,
                        },
                    },
                }}
                getRowId={(row) => row.id}
                className="datagrid"
                rows={productList?.content || []}
                columns={productColumns.concat(actionColumn)}
                pageSize={9}
                rowsPerPageOptions={[9]}
                checkboxSelection
            />
        </div>
    );
};

export default Datatable;
