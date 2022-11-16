import { BrowserRouter as Router } from 'react-router-dom';
import MessengerCustomerChat from 'react-messenger-customer-chat';
import Routes from './routes';
import { HashRouter } from 'react-router-dom';
import './App.css';
function App() {
    return (
        <HashRouter>
            <div className="App">
                    <Routes />
            </div>
        </HashRouter>
    );
}

export default App;
