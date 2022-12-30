import Header from '../../Header';
import Footer from '../../Footer';
import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getUserByAccess, logUserByAccess } from '../../../redux/user/userApi';
import { Link } from 'react-router-dom';
import MessengerCustomerChat from 'react-messenger-customer-chat/lib/MessengerCustomerChat';

import './header.scss';
import { DEFAULT_STORE, DEFAULT_VARIABLE } from '../../../utils';
function CommonLayout({ children }) {

    const dispatch = useDispatch()
    const [getUserAccess, setUserAccess] = useState(undefined);
    const getAccess = JSON.parse(localStorage.getItem(DEFAULT_STORE.TOKEN))
    useEffect(() => {
        if (getAccess) {
            getUserByAccess(dispatch)
        }
    }, [localStorage.getItem(DEFAULT_STORE.TOKEN)])
    const user = useSelector((state) => state.user?.user);
    const hanleLogout = () => {
        logUserByAccess(dispatch)
    };
    return (
        <>
            <div className="w-full h-[140px] flex justify-center gap-16 items-center ">
                {/* <div className="select-none text- text-[21px] w-[110px] px-6 py-2 font-semibold text-green-400 border-r-4 border-green-200 rounded shadow-lg text-center">
                    Phúc Xi Cúc
                </div> */}
                <Link to={'/'} className='select-none text- text-[21px] px-2 py-2 font-semibold text-green-400 border-r-4 border-green-200 rounded shadow-lg text-center w-[110px] h-[100px]'>
                    <img src='./public/logowb.png' className='w-full h-full'></img>
                </Link>
                {/* <div className="hover:text-gray-500 header__navbar-item--openqr header__navbar-item text-black font-semibold">
                            <Link to="/Seller" className="w-32  text-center " onClick={()=>setSingIn(!singIn)}>
                                            Kênh người bán
                                </Link>
                        </div> */}
                <div className="select-none text-[23px] px-6 py-2 font-semibold text-white bg-blue-400 border-r-4 border-blue-400 rounded shadow-lg shadow-purple-600/50">

                </div>
                <nav className=" header__navbar hide-on-mobile-tablet">
                    <ul className="header__navbar-list">
                        <li className="text-black font-semibold header__navbar-item--openqr header__navbar-item header__navbar-item--separate-week hover:text-gray-500">
                            <Link to="/history" className="w-32  text-center ">
                                Tra cứu đơn hàng
                            </Link>
                        </li>

                        <li className="header__navbar-item ">
                            {user && (
                                <li className="header__navbar-item header__navbar-user ml-4">
                                    <img
                                        src={user.avatar || "https://haycafe.vn/wp-content/uploads/2022/03/avatar-facebook-doc.jpg"}
                                        alt=""
                                        className="header__user-img"
                                    ></img>
                                    <span className="header__user-name text-black">{user?.fullName || DEFAULT_VARIABLE.FULL_NAME}</span>

                                    <ul className="header__navbar-user-menu">
                                        <li className="header__navbar-user-item text-gray-600">
                                            <Link to="history">Tài khoản của tôi</Link>
                                        </li>
                                        <li className="header__navbar-user-item text-gray-600">
                                            <Link to="history">Đơn mua</Link>
                                        </li>
                                        {user.role != 1 && (
                                            <li className="header__navbar-user-item text-gray-600">
                                                <Link to="/SignInSeller" className="">
                                                    Đăng ký bán hàng
                                                </Link>
                                            </li>
                                        )}

                                        <li
                                            className="header__navbar-user-item header__navbar-user-item--separate text-gray-600"
                                            onClick={hanleLogout}
                                        >
                                            <a href="">Đăng xuất</a>
                                        </li>
                                    </ul>
                                </li>
                            )}
                        </li>
                    </ul>

                    <ul className="header__navbar-list ml-6">
                        {/* <li className="header__navbar-item">
                        <a href="" className="header__navbar-item-link">
                            <i className="header__navbar-icon far fa-question-circle"></i>
                            Hỗ trợ
                        </a>
                    </li> */}


                        <li className=" header__navbar-item header__navbar-item--openNotify">
                            <a href="" className="hover:text-gray-500 header__navbar-item-link text-black font-semibold">
                                <i className="header__navbar-icon far fa-bell"></i>
                                Thông báo
                            </a>
                            <div className="header__notify">
                                <header className="header__notify-header">
                                    <h3>Thông báo mới nhận</h3>
                                </header>
                                <ul className="header__notify-list">
                                    <li className="header__notify-item header__notify-item--viewed">
                                        <a href="" className="header__notify-link">
                                            <img
                                                src="https://images.fpt.shop/unsafe/filters:quality(5)/fptshop.com.vn/uploads/images/tin-tuc/147816/Originals/iPhone-14-Pro-11.jpg"
                                                alt=""
                                                className="header__notify-img"
                                            ></img>
                                            <div className="header__notify-info">
                                                <span className="header__notify-name font-semibold text-gray-800">
                                                    Iphone chính hãng
                                                </span>
                                                <span className="header__notify-desc">Mô tả Iphone chính hãng</span>
                                            </div>
                                        </a>
                                    </li>
                                    <li className="header__notify-item header__notify-item--viewed">
                                        <a href="" className="header__notify-link">
                                            <img
                                                src="https://images.fpt.shop/unsafe/filters:quality(5)/fptshop.com.vn/uploads/images/tin-tuc/147816/Originals/iPhone-14-Pro-11.jpg"
                                                alt=""
                                                className="header__notify-img"
                                            ></img>
                                            <div className="header__notify-info">
                                                <span className="header__notify-name font-semibold text-gray-800">
                                                    Iphone chính hãng
                                                </span>
                                                <span className="header__notify-desc">Mô tả Iphone chính hãng</span>
                                            </div>
                                        </a>
                                    </li>
                                    <li className="header__notify-item header__notify-item--viewed">
                                        <a href="" className="header__notify-link">
                                            <img
                                                src="https://images.fpt.shop/unsafe/filters:quality(5)/fptshop.com.vn/uploads/images/tin-tuc/147816/Originals/iPhone-14-Pro-11.jpg"
                                                alt=""
                                                className="header__notify-img"
                                            ></img>
                                            <div className="header__notify-info">
                                                <span className="header__notify-name font-semibold text-gray-800">
                                                    Iphone chính hãng
                                                </span>
                                                <span className="header__notify-desc">Mô tả Iphone chính hãng</span>
                                            </div>
                                        </a>
                                    </li>
                                </ul>
                                <footer className="header__notify-footer">
                                    <a href="" className="header__notify-footer-btn">
                                        Xem tất cả
                                    </a>
                                </footer>
                            </div>
                        </li>
                        <li className="header__navbar-item ">

                        </li>
                    </ul>
                </nav>
                {/* <div className='w-[520px] h-[140px] '> <img className=' w-full h-full' src='https://pdp.edu.vn/wp-content/uploads/2021/04/hinh-nen-cong-nghe-1.jpg'></img></div> */}
            </div>
            <Header />
            <main role="main" className="wrapper">
                <div className="content">
                    <Outlet />
                </div>
            </main>
            <Footer />
            <MessengerCustomerChat
                pageId="101178992810439"
                appId="952881962336925"
                htmlRef="https://connect.facebook.net/vi_VN/sdk/xfbml.customerchat.js"
            />
        </>
    );
}

export default CommonLayout;
