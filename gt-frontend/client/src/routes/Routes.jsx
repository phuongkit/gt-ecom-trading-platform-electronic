import { useRoutes } from 'react-router-dom';
import { CommonLayout, DefaultLayout } from '../components/Layout';
import NotFound from '../pages/User/NotFound';
import { publishRoutes } from './PublishRoutes';
import { publishRoutesSeller } from './seller/PublishRoutesSeller';
import { productDetailRoute } from './ProductDetailRoutes';

export default function Routes() {
    const routes = [
        {
            path: '/',
            element: <CommonLayout />,
            children: [
                ...publishRoutes,
                productDetailRoute,
                { path: '*', element: <NotFound title="Not found" /> },
            ],
        },
        {
            path: '/Seller',
            element: <DefaultLayout />,
            children: [
                ...publishRoutesSeller,
                { path: '*', element: <NotFound title="Not found" /> },
            ],
        },
    ];
    return useRoutes(routes);
}