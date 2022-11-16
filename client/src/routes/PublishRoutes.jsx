import { lazy, Suspense } from 'react';
import Loading from '~/components/Loading';

const Home = lazy(() => import('../pages/User/Home'));
const SingIn = lazy(() => import('../components/SingInForm'));
const SingUp = lazy(() => import('../components/SignUpForm'));  

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
