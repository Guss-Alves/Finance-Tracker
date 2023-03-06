import './App.css';
import SignIn from './components/SignIn';
import Dashboard from './components/Dashboard';
import ExpenseForm from './components/ExpenseForm';
import {
    Routes,
    Route
} from "react-router-dom";
import './components/styles/signIn.css'

function App() {
    return (
        <div className="App container">
            <Routes>
                <Route exact path='/' element={<SignIn/>}></Route>
                <Route exact path='/dashboard' element={<Dashboard/>}></Route>
                <Route exact path='/api/expense/new' element={<ExpenseForm/>}></Route>
            </Routes>
        </div>
    );
}

export default App;
