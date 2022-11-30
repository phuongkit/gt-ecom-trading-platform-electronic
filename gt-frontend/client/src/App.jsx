import { BrowserRouter as Router } from 'react-router-dom';
import MessengerCustomerChat from 'react-messenger-customer-chat';
import Routes from './routes';
import { HashRouter } from 'react-router-dom';
import './App.css';
function App() {
    return (
        <Router>
            <div className="App">
                    <Routes />
            </div>
        </Router>
    );
}

export default App;
