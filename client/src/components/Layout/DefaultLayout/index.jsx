import './index.scss'
import { Outlet } from 'react-router-dom';

function DefaultLayout({ children }) {
    return (
        <div className="list">
        {/* <Sidebar/> */}
        <div className="listContainer">
            {/* <Navbar/> */}
            <Outlet></Outlet>
        </div>
        </div>
    );
}

export default DefaultLayout;
