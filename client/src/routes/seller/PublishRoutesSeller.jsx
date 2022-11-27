import { lazy, Suspense } from 'react';
import Loading from '~/components/Loading';

const SingIn = lazy(() => import('~/components/SingInForm'));
const SingUp = lazy(() => import('~/components/SignUpForm'));
const HomeSeller = lazy(() => import('../../pages/Seller/Home/HomeSeller'));
const ListOders = lazy(() => import('~/pages/Seller/List/ListOder'));
const ListProducts = lazy(() => import('~/pages/Seller/List/ListProduct'));

export const publishRoutesSeller = [
    {
        index: true,
        element: (
            <Suspense fallback={<Loading />}>
                <HomeSeller />
            </Suspense>
        ),
    },
    {
        path: 'products',
        children: [
            {
                index: true,
                element: (
                    <Suspense fallback={<Loading />}>
                        <ListProducts />
                    </Suspense>
                ),
            }
        ],
    },
    {
        path: 'orders',
        element: (
            <Suspense fallback={<Loading />}>
                <ListOders />
            </Suspense>
        ),
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
];
