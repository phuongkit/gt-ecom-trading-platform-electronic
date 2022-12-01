import { lazy, Suspense } from 'react';
import Loading from '~/components/Loading';

const Home = lazy(() => import('../pages/User/Home'));
const SingIn = lazy(() => import('../components/SingInForm'));
const SingUp = lazy(() => import('../components/SignUpForm'));  
const Category = lazy(() => import('../pages/User/Category'));
const Cart = lazy(() => import('../pages/User/Cart'));
const ShopInfo = lazy(() => import('../pages/User/ShopInfo'));
const Order = lazy(() => import('../pages/User/Order'));
const PurchaseHistory = lazy(() => import('../pages/User/History/PurchaseHistory'));
const History = lazy(() => import('../pages/User/History'));
const Profile = lazy(() => import('../pages/User/History/Profile'));
const OrderDetail = lazy(() => import('../pages/User/OrderDetail'));
const SearchPage = lazy(() => import('../pages/User/Search'));
//serler
const HomeSeller = lazy(() => import('../pages/Seller/Home/HomeSeller'));  
import SingInSeller from '~/components/SingInSellerForm';
export const publishRoutes = [
    {
        index: true,
        element: (
            <Suspense fallback={<Loading />}>
                <Home title="Website" />
            </Suspense>
        ),
    },
    {
        path: '/:categorySlug',
        element: (
            <Suspense fallback={<Loading />}>
                <Category title="Máy tính bảng, tablet giá rẻ, trả góp 0%" />
            </Suspense>
        )
    },
    
    {
        path: '/search',
        // path: 'tim-kiem',
        element: (
            <Suspense fallback={<Loading />}>
                <SearchPage title="Tìm kiếm | Phúc Xi Cúc" />
            </Suspense>
        ),
        children: [
            {
                path: '?keyword=:keyword',
                index: true,
                // path: 'tim-kiem',
                element: (
                    <Suspense fallback={<Loading />}>
                        <SearchPage title="Tìm kiếm | Phúc Xi Cúc" />
                    </Suspense>
                ),
            },
        ],
    },
    {
        path: 'SignIn',
        element: (
            <Suspense fallback={<Loading />}>
                <SingIn />
            </Suspense>
        ),
    },
    {
        path: 'SignUp',
        element: (
            <Suspense fallback={<Loading />}>
                <SingUp />
            </Suspense>
        ),
    }
    ,
    {
        path: 'cart',
        element: (
            <Suspense fallback={<Loading />}>
                <Cart title="Giỏ hàng - Phúc Xi Cúc" />
            </Suspense>
        ),
    },
    {
        path: '/ShopInfo/:slug',
        element: (
            <Suspense fallback={<Loading />}>
                <ShopInfo title="Thông tin Shop | Phúc Xi Cúc" />
            </Suspense>
        ),
    },
    
    {
        path: 'order',
        element: (
            <Suspense fallback={<Loading />}>
                <Order title="Đơn hàng - Phúc Xi Cúc" />
            </Suspense>
        ),
    },    
    {
        path: 'order/detail/:id',
        element: (
            <Suspense fallback={<Loading />}>
                <OrderDetail title="Chi tiết Đơn hàng - Phúc Xi Cúc" />
            </Suspense>
        ),
    },
    
    {
        path: 'history',
        element: (
            <Suspense fallback={<Loading />}>
                <History title="Lịch sử mua hàng | Phúc Xi Cúc" />
            </Suspense>
        ),
    },
    {
        path: 'history/purchaseHistory',
        element: (
            <Suspense fallback={<Loading />}>
                <PurchaseHistory title="Lịch sử mua hàng | Phúc Xi Cúc" />
            </Suspense>
        ),
    },
    {
        path: '/history/profile',
        element: (
            <Suspense fallback={<Loading />}>
                <Profile title="Lịch sử mua hàng | Phúc Xi Cúc" />
            </Suspense>
        ),
    },
    {
        path: 'SignInSeller',
        element: (
            <Suspense fallback={<Loading />}>
                <SingInSeller />
            </Suspense>
        ),
    },
    {
        path: 'Seller',
        element: (
            <Suspense fallback={<Loading />}>
                <HomeSeller />
            </Suspense>
        ),
    },
];
