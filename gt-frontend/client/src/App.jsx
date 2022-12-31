import { BrowserRouter as Router } from 'react-router-dom';
import MessengerCustomerChat from 'react-messenger-customer-chat';
import Routes from './routes';
import { HashRouter } from 'react-router-dom';
import './App.css';
function App() {
    if (window.location.hash === '#_=_') {
        window.location.hash = '';
    }
    return (
        <HashRouter basename="">
            <div className="App">
                <Routes />
            </div>
        </HashRouter>
    );
}

export default App;
