import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Order.scss';
import { useDispatch, useSelector } from 'react-redux';
import { numberWithCommas } from '~/utils';
import { Navigate, useNavigate } from 'react-router-dom';
import { orderService } from '~/services';
import { EGender, EPayment, MESSAGE } from './../../../utils';
import { deleteOrdersByIdApi } from '../../../redux/order/ordersApi';

const Order = ({ title }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [ship, setShip] = useState({ expectedDeliveryTime: null, transportFee: 0 });
    const order = localStorage.getItem('order') ? JSON.parse(localStorage.getItem('order')) : null;
    if (!order) {
        navigate('/');
    }
    const hasOrder = order && Object.keys(order).length > 0 && order.constructor === Object;
    const handleConfirm = async () => {
        const payment = getPayment();
        let orderItems = [...order.orderItems].map((value) => ({ ...value, productId: value.productId?.id }));
        const data = { ...order, orderItems, ...ship, ...payment };
        console.log('data', data);
        try {
            const res = await orderService.postOrder(data);
            console.log('res', res, res?.status);
            if (res?.status === 'CREATED') {         
                    alert('Tạo đơn hàng thành công');
                    navigate('/');           
            } else {
                alert(MESSAGE.ERROR_ACTION);
                navigate('/');
            }
        } catch (err) {
            alert(MESSAGE.ERROR_ACTION);
            navigate('/');
        }
        localStorage.removeItem('order');
    };
    const getPayment = () => {
        const radios = document.querySelectorAll('input[name="payment"]');
        let paymentIndex = -1;
        for (let i = 0, length = radios.length; i < length; i++) {
            if (radios[i].checked) {
                paymentIndex = i;
                break;
            }
        }
        return paymentIndex != -1
            ? { payment: Number.parseInt(radios[paymentIndex].value), paid: false }
            : { payment: EPayment.CASH.index, paid: false };
    };
    const handleCancel = async () => {
        deleteOrdersByIdApi(dispatch, order.id, navigate);
    };
    useEffect(() => {
        document.title = title;
    }, []);
    return (
        <>
            {hasOrder ? (
                <div className="order">
                    <div className="alertsuccess-new">
                        <i className="new-cartnew-success"></i>
                        <strong>Đặt hàng thành công</strong>
                    </div>
                    <div className="ordercontent">
                        <div>
                            <p>
                                Cảm ơn {EGender.getNameFromIndex(order.gender)} <b>{order.fullName}</b> vì đã có cơ hội được phục vụ.
                            </p>
                        </div>
                        <div>
                            <div className="info-order">
                                <div className="info-order-header">
                                    <h4>
                                        Đơn hàng: <span className="text-blue-400 font-bold">#{order.id}</span>
                                    </h4>
                                    <div className="header-right">
                                        <Link to="/history">Quản lý đơn hàng</Link>
                                        <div className="cancel-order-new">
                                            <div>
                                                <div className="cancel-order-new">
                                                    <span>.</span>
                                                    <label
                                                        onClick={handleCancel}
                                                        style={{ color: 'blue', cursor: 'pointer', padding: '0 0' }}
                                                    >
                                                        Hủy
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <label htmlFor="">
                                    <span>
                                        <i className="info-order__dot-icon"></i>
                                        <span>
                                            <strong>Người nhận hàng:</strong>
                                            <h4 id="userName" className="mb-[8px]">
                                                {EGender.getNameFromIndex(order.gender)} {order.fullName}
                                            </h4>
                                            <strong>Số điện thoại:</strong>
                                            <h5 id="customerPhone" className="mb-[8px]">
                                                {order.phone}
                                            </h5>
                                            <strong>Email:</strong>
                                            <h5 id="customerPhone" className="mb-[8px]">
                                                {order.email}
                                            </h5>
                                        </span>
                                    </span>
                                </label>
                                <label htmlFor="">
                                    <span>
                                        <i className="info-order__dot-icon"></i>
                                        <span>
                                            <strong>Giao đến: </strong>
                                            {order.address?.homeAdd}, {order.address?.ward},{order.address?.district},
                                            Thành phố {order.address?.city} (nhân viên sẽ gọi xác nhận trước khi giao).
                                        </span>
                                    </span>
                                </label>
                                <label htmlFor="">
                                    <span>
                                        <i className="info-order__dot-icon"></i>
                                        <span>
                                            <strong>
                                                Tổng tiền hàng: {numberWithCommas(Number(order.totalPriceProduct)) || 0}
                                                {' đ'}
                                            </strong>
                                        </span>
                                    </span>
                                </label>
                                <label htmlFor="">
                                    <span>
                                        <i className="info-order__dot-icon"></i>
                                        <span>
                                            <strong>
                                                Phí vận chuyển: {numberWithCommas(Number(ship.transportFee)) || 0}
                                                {' đ'}
                                            </strong>
                                        </span>
                                    </span>
                                </label>
                                <label htmlFor="">
                                    <span>
                                        <i className="info-order__dot-icon"></i>
                                        <span>
                                            <strong>Tổng thanh toán: {'   '}</strong>
                                            <strong className="text-red-500 text-5xl">
                                                {numberWithCommas(
                                                    Number(ship.transportFee) + Number(order.totalPriceProduct),
                                                ) || 0}{' '}
                                                {' đ'}
                                            </strong>
                                        </span>
                                    </span>
                                </label>
                            </div>
                        </div>

                        <div>
                            <h4 className="order-infor-alert">Đơn hàng chưa được thanh toán</h4>
                        </div>

                        <div className="payment-method-new">
                            <div>
                                <h3>Chọn hình thức thanh toán:</h3>
                                <ul className="formality-pay-new">
                                    <li className="normal-payment">
                                        <div className="text-payment">
                                            <span>
                                                <input
                                                    type="radio"
                                                    id="cash"
                                                    name="payment"
                                                    value={EPayment.CASH.index}
                                                    defaultChecked
                                                />
                                                <label htmlFor="cash">Thanh toán tiền mặt khi nhận hàng</label>
                                            </span>
                                        </div>
                                    </li>

                                    <li className="normal-payment">
                                        <div className="text-payment">
                                            <span>
                                                <input
                                                    type="radio"
                                                    id="momo"
                                                    name="payment"
                                                    value={EPayment.MOMO.index}
                                                />
                                                <label htmlFor="momo">Ví MoMo</label>
                                            </span>
                                        </div>
                                    </li>

                                    <li className="normal-payment">
                                        <div className="text-payment">
                                            <span>
                                                <input
                                                    type="radio"
                                                    id="vnpay"
                                                    name="payment"
                                                    value={EPayment.VNPAY.index}
                                                />
                                                <label htmlFor="vnpay">Thanh toán qua VNPay</label>
                                            </span>
                                        </div>
                                    </li>
                                </ul>

                                <button onClick={handleConfirm} className="confirm-payment-button">
                                    Xác nhận
                                </button>
                            </div>
                            <div className="refund-popup">
                                <a href="">Xem chính sách hoàn tiền online</a>
                            </div>
                            <hr />

                            <div className="buyanotherNew">
                                <Link to="/"> Mua thêm sản phẩm khác </Link>
                            </div>
                            <span className="customer-rating">
                                <div className="customer-rating__top">
                                    <div className="customer-rating__top__desc">
                                        {EGender.getNameFromIndex(order.gender)} <strong>{order.fullName}</strong> có
                                        hài lòng về trải nghiệm mua hàng?
                                    </div>
                                    <div className="customer-rating__top__rating-buttons">
                                        <button className="customer-rating__top__rating-buttons__good">
                                            <p>Hài lòng</p>
                                            <i className="iconrating-good"></i>
                                        </button>
                                        <button className="customer-rating__top__rating-buttons__bad">
                                            <p>Không hài lòng</p>
                                            <i className="iconrating-bad"></i>
                                        </button>
                                    </div>
                                </div>
                            </span>
                        </div>
                    </div>
                </div>
            ) : (
                <Navigate to="/cart" />
            )}
        </>
    );
};

export default Order;