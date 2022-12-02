import { BrowserRouter } from "react-router-dom";
import "./App.scss";
import { useContext } from "react";
import { useUser } from "./context/UserContext";
import { AdminRoutes } from "./routes/route";
function App() {


    return (
        <div className={ "app"}>
            <BrowserRouter>
                <AdminRoutes />
            </BrowserRouter>
        </div>
    );
}

export default App;
