import React, {useState} from 'react';
import RegistrationForm from './RegistrationForm';
import LoginForm from './LoginForm';
import './styles/signIn.css'

const SignIn = () => {

    const [hasAccount, setHasAccount] = useState(false);

    return (
        <div>
            <h1 className='text-center mt-4'>Finance Tracker Website</h1>
            <div className="sides d-flex mt-2">
                <div className="main" style={{ width: '500px' }}>
                    <div className="logInOptions mt-5 d-flex justify-content-around mb-3">
                        <div className="logInOption">
                            <button className='btn btn-outline-primary btn-lg' onClick={()=> setHasAccount(false)}>Create new account</button>
                        </div>
                        <div className="logInOption">
                            <button className='btn btn-outline-primary btn-lg' onClick={()=> setHasAccount(true)}>Log In</button>
                        </div>
                    </div>
                    <div>
                        <div className="regAndLogin mb-5">
                            {
                                hasAccount?
                                <LoginForm/> :
                                <RegistrationForm/>
                            }
                        </div>
                    </div>
                </div>
                <div className="ms-5 mt-5 signInfo">
                    <h2 className='text-primary'>Are you tired of losing track of your monthly expenses?</h2>
                    <h4 className='mt-3'>With Finance Tracker you will never have this problem again !!</h4>
                    <ul className='mt-3'>
                        <li className='h4'>Create as many expenses cards as you want to</li>
                        <li className='h4'>Check at any time the total amount of all your expenses</li>
                        <li className='h4'>Pie chart to analyze your expenses by category</li>
                        <li className='h4'>and much more ...</li>
                    </ul>
                    <h2 className='mt-4 text-center'>Don't waste time, create an account now for <span className='text-success'>FREE</span>!!</h2>
                    <img src="https://animated-gif-creator.com/images/01/gif-arrow-left-with-images-gif-animated-images_95.gif" alt="arrow" className='arrow-img' />
                </div>
            </div>
        </div>
    );
};


export default SignIn;