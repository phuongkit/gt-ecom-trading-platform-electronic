import Header from '../../Header';
import SingInForm from '../../SingInForm';
import Footer from '../../Footer';
import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {getUserByAccess,logUserByAccess} from '~/redux/user/userApi'
import { Link } from 'react-router-dom';
import {userService} from '../../../services/user.service'
import './header.css';
function CommonLayout({ children }) {
   
    const dispatch = useDispatch()
    const [getUserAccess, setUserAccess] = useState(undefined);
    const getAccess = JSON.parse(localStorage.getItem('access'))
    useEffect(()=>{   
        if(getAccess){
            getUserByAccess(dispatch)  
        }   
    },[localStorage.getItem('access')])
    const user = useSelector((state) => state.user?.user);
    const hanleLogout = () => {    
        logUserByAccess(dispatch)
    };
    return (
        <>
            <div className="w-full h-[140px] flex justify-center gap-16 items-center bg-slate-700">
                <div className="select-none text- text-[21px] w-[110px] px-6 py-2 font-semibold text-green-400 border-r-4 border-green-200 rounded shadow-lg text-center">
                    Phúc Xi Cúc
                </div>
                <div className="select-none text-[23px] px-6 py-2 font-semibold text-white bg-blue-400 border-r-4 border-blue-400 rounded shadow-lg shadow-purple-600/50">
                    Sàn giao dịch thiết bị công nghệ 4.0
                </div>
                <nav className=" header__navbar hide-on-mobile-tablet">
                    <ul className="header__navbar-list">
                        <li className="header__navbar-item--openqr header__navbar-item header__navbar-item--separate-week">
                            <Link to="/History" className="w-32  text-center " onClick={()=>setSingIn(!singIn)}>
                                            Tra cứu đơn hàng
                                </Link>
                        </li>

                        <ul className="header__navbar-item ">
                        {user && (
                            <li className="header__navbar-item header__navbar-user">
                                <img
                                    src="https://haycafe.vn/wp-content/uploads/2022/03/avatar-facebook-doc.jpg"
                                    alt=""
                                    className="header__user-img"
                                ></img>
                                <span className="header__user-name">{user?.username}</span>

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
                        </ul>
                    </ul>

                    <ul className="header__navbar-list ml-6">
                        {/* <li className="header__navbar-item">
                        <a href="" className="header__navbar-item-link">
                            <i className="header__navbar-icon far fa-question-circle"></i>
                            Hỗ trợ
                        </a>
                    </li> */}
                     

                        <li className="header__navbar-item header__navbar-item--openNotify">
                            <a href="" className="header__navbar-item-link">
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
        </>
    );
}

export default CommonLayout;
