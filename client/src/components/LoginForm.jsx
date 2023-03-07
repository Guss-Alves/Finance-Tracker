import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import './styles/signIn.css'

const LoginForm = () => {

    let [loginfo, setLogInfo] = useState({})
    let [formError, setFormError] = useState('')

    const navigate = useNavigate();

    const changeHandler = (e)=>{
        setLogInfo({
            ...loginfo,
            [e.target.name]: e.target.value
        })
    }

    const submitHandler = (e)=>{
        e.preventDefault()
        axios.post('http://localhost:8000/api/user/login', loginfo, {withCredentials:true})
        .then(res=>{
            console.log(res)
            if(res.data.error){
                setFormError(res.data.error)
            }else{
                navigate('/dashboard')
            }
        })
        .catch(err=>{
            console.log('Something went wrong', err)
        })
    }


    return (
        <div className='mt-4 mb-5'>
        <h1 className='text-primary'>Login</h1>
        <div className="form-group">
            <p className=' text-danger bg-warning text-center h5 rounded '>{formError}</p>
        </div>
        <form onSubmit={submitHandler} style={{width: '500px'}} className='mt-3 loginForm' >
            <div className="form-group">
                <label className='h3' htmlFor="">Email:</label>
                <input  onChange={changeHandler} type="text" name="email" className='form-control'/>
            </div>
            <div className="form-group">
                <label className='h3' htmlFor="">Password:</label>
                <input  onChange={changeHandler} type="password" name="password" className='form-control'/>
            </div>
            <input type="submit" value="Log In" className='btn btn-success mt-3 btn-lg' />
        </form>
    </div>
    );
};


export default LoginForm;