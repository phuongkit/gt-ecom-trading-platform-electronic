import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronDown, TicketPerforated } from 'react-bootstrap-icons';
import ProductItem from './ProductItem';
import Input from './Input';
import { numberWithCommas } from '~/utils';
import { LocationForm } from '~/components/LocationForm';
import { clearCart } from '../../../redux/shopping-cart/cartItemsSlide';
import moment from 'moment';
import './Cart.scss';
import { useCart } from '../../../hooks';
import { useDispatch } from 'react-redux';
import { EGender, EPayment, EShippingMethod, REGEXP, toAddressSlug } from '../../../utils';
import { createOrder } from '../../../redux/order/orderSlice';

function CartInfo() {
    const { cartItems, totalPrice, totalQuantity } = useCart();
    const [addressOption, setAddresOption] = useState();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const getUser = JSON.parse(localStorage.getItem('customerInfo'))
    const [orderDetail, setOrderDetail] = useState({
        gender: EGender.UNKNOWN.index,
        fullName: '',
        email: '',
        phone: '',
        address: {
            homeAdd: '',
            ward: '',
            district: '',
            city: '',
        },
        payment: EPayment.CASH.index,
        shippingMethod: EShippingMethod.GHN_EXPRESS.index,
        discountCode: '',
        paid: false,
        note: '',
        orderItems: [],
    });
    let orderItem = {
        name: '',
        productId: 0,
        quantity: 0,
        percent: 0,
        saleName: '',
        note: '',
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if(getUser){
            const fullName = document.getElementById('fullname').value;
            const phone = document.getElementById('phone').value;
            let homeAdd = document.getElementById('homeAddress').value;
            const sex = document.getElementsByName('sex');
            const discountCode = document.getElementById('ticketid').value;
            const note = document.getElementById('anotheroption').value;
            let sexValue;
            for (let i = 0, length = sex.length; i < length; i++) {
                if (sex[i].checked) {
                    sexValue = sex[i].value;
                }
            }
            let orderItemDetails = cartItems.map((value) => {
                let item = orderItem;
            item.productId = value;
                item.quantity = value.quantity;
                item.saleName = value.tag;
                item.note = value?.note ? value.note : '';
                return item;
            });
        let data = {
                ...orderDetail,
                gender: sexValue === null || sexValue === undefined ? EGender.UNKNOWN : Number.parseInt(sexValue),
                fullName: fullName,
                phone: phone,
                address: {
                    homeAdd: homeAdd,
                    ward: addressOption.ward,
                    district: addressOption.district,
                    city: addressOption.city,
                },
                discountCode: discountCode,
                note: note,
                orderItems: orderItemDetails,
            totalPriceProduct: totalPrice,
            };
        dispatch(createOrder(data));
            dispatch(clearCart());
        navigate('/order');
            navigate('/SingIn')
        }
        
    };
    useEffect(() => {
        const setCustomerInfo = () => {
            let customerInfo = localStorage.getItem('customerInfo');
            if (customerInfo) {
                customerInfo = JSON.parse(customerInfo);

                // console.log(customerInfo);
                let fullName = (document.getElementById('fullname').value =
                    customerInfo?.fullName === null ||
                    customerInfo?.fullName === undefined ||
                    customerInfo?.fullName.trim() === ''
                        ? 'Ẩn Danh'
                        : customerInfo?.fullName);
                let phone = (document.getElementById('phone').value = customerInfo.phone);
                let email = (document.getElementById('email').value = customerInfo.email);
                document.getElementById('homeAddress').value = customerInfo?.address?.homeAdd || '';
                let address = customerInfo?.address || {
                    homeAdd: '',
                    ward: '',
                    district: '',
                    city: '',
                };
                setOrderDetail((prev) => ({
                    ...prev,
                    fullName: fullName,
                    phone: phone,
                    email: email,
                    address: address,
                }));
            }
        };
        setCustomerInfo();
    }, []);
    return (
        <div className="w-1/2 m-auto">
            <div className="flex justify-between py-4">
                <Link to="/" className="text-blue-500">
                    <i>
                        <ChevronLeft />
                    </i>
                    Mua thêm sản phẩm khác
                </Link>
            </div>
            <h2 className="text-orange-500 mb-2 text-center font-semibold text-3xl">Đơn hàng của bạn</h2>
            <form className="bg-white rounded-xl px-14 py-8 shadow-sm" onSubmit={handleSubmit}>
                {cartItems.map((product, index) => (
                    <ProductItem key={index} {...product} />
                ))}
                <div className="flex justify-between py-4">
                    <span>Tạm tính ({totalQuantity} sản phẩm):</span>
                    <span> {numberWithCommas(totalPrice)}₫</span>
                </div>
                <div className="my-8 border-t py-4">
                    <h4>THÔNG TIN KHÁCH HÀNG</h4>
                    <div className="my-4">
                        <input id="male" type="radio" name="sex" value={EGender.MALE.index} defaultChecked />
                        &nbsp;
                        <label htmlFor="male">Anh</label>
                        &emsp;
                        <input id="female" type="radio" name="sex" value={EGender.FEMALE.index} />
                        &nbsp;
                        <label htmlFor="female">Chị</label>
                    </div>
                    <div className="flex gap-4 my-8">
                        <Input
                            placeholder="Họ và Tên"
                            id="fullname"
                            required={true}
                            onChange={(e) => setOrderDetail((prev) => ({ ...prev, fullName: e.target.value }))}
                        />
                        <Input
                            placeholder="Số điện thoại"
                            id="phone"
                            type="tel"
                            required={true}
                            pattern="(84|0[3|5|7|8|9])+([0-9]{8})\b"
                            onChange={(e) => setOrderDetail((prev) => ({ ...prev, phone: e.target.value }))}
                        />
                    </div>
                    <div className="flex gap-4">
                        <Input
                            placeholder="Địa chỉ email (dùng để nhận thông báo đơn hàng ( không bắt buộc)"
                            id="email"
                            type="email"
                            required={true}
                            pattern={REGEXP.EMAIL}
                            onChange={(e) => setOrderDetail((prev) => ({ ...prev, email: e.target.value }))}
                        />
                    </div>
                </div>
                <div className="my-8">
                    <h4>CHỌN CÁCH THỨC NHẬN HÀNG</h4>
                    <div className="my-4">
                        <input id="site" type="radio" name="destination" />
                        &nbsp;
                        <label htmlFor="site">Giao tận nơi</label>
                        &emsp;
                        <input id="market" type="radio" name="destination" />
                        &nbsp;
                        <label htmlFor="market">Nhận tại siêu thị</label>
                    </div>
                    <div>
                        <div className="border border-blue-400 border p-4 rounded-xl">
                            <p>Chọn địa chỉ để biết thời gian nhận hàng và phí vận chuyển (nếu có)</p>

                            <Input
                                placeholder="Số nhà, tên đường"
                                id="homeAddress"
                                required={true}
                                onChange={(e) =>
                                    setOrderDetail((prev) => ({
                                        ...prev,
                                        address: { ...prev.address, homeAdd: e.target.value },
                                    }))
                                }
                            />
                            <LocationForm onChange={setAddresOption} address={toAddressSlug(orderDetail.address)} />
                            <div>
                                <div className="flex justify-between mb-4">
                                    <span>Giao trước 20h hôm nay ({moment().format('DD/MM/YYYY')})</span>

                                    <span>Chọn ngày giờ khác</span>
                                </div>
                                <div className="flex flex-col my-30 border-b py-4 gap-4 p-10 border-1 border-gray-400 rounded">
                                    {cartItems.map((product, index) => (
                                        <div className="border-b " key={index}>
                                            <div className="h-16">
                                                <img src={product.img} alt="" className="h-full object-vocer" />
                                            </div>
                                            <div>
                                                <Link to="productdetail">{product.title}</Link>
                                                <div>
                                                    <small>Màu: {product.color}</small>&emsp;
                                                    <small>Số lượng: {product.quantity}</small>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <p className="text-green-600 mt-6">Miễn phí giao hàng</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <Input
                        placeholder="Ghi chú cho người giao hàng (không bắt buộc)"
                        id="anotheroption"
                        onChange={(e) => setOrderDetail((prev) => ({ ...prev, note: e.target.value }))}
                    />
                </div>

                <div>
                    <div className="py-8 border-b ">
                        <button className="p-4 border rounded-lg">
                            <i>
                                <TicketPerforated />
                            </i>
                            &nbsp;
                            <span>Sử dụng mã giảm giá</span>&nbsp;
                            <i>
                                <ChevronDown />
                            </i>
                        </button>
                        <div className="flex gap-8 border border-blue-400 border p-4 rounded-xl">
                            <Input
                                placeholder="Nhập mã giảm giá/ Phiếu mua hàng"
                                id="ticketid"
                                onChange={(e) => setOrderDetail((prev) => ({ ...prev, discountCode: e.target.value }))}
                            />
                            <button className="py-4 px-10 border bg-blue-600 rounded-lg text-white">Áp dụng</button>
                        </div>
                    </div>

                    <div className="flex justify-between my-4">
                        <strong>Tổng tiền:</strong>
                        <strong className="text-red-600">{numberWithCommas(totalPrice)}₫</strong>
                    </div>
                    <button
                        type="submit"
                        className="h-20 my-8 border-green-400 border border-solid rounded-lg w-full text-green-400 font-bold"
                    >
                        ĐẶT HÀNG
                    </button>
                    <small className="block text-center">Bạn có thể chọn hình thức thanh toán sau khi đặt hàng</small>
                </div>
            </form>
        </div>
    );
}

export default CartInfo;
