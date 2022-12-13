import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const RegistrationForm = () => {

    let [reginfo, setRegInfo] = useState({})
    let [formError, setFormError] = useState({})

    const navigate = useNavigate();

    const changeHandler = (e)=>{
        setRegInfo({
            ...reginfo,
            [e.target.name]: e.target.value
        })
    }

    const submitHandler = (e)=>{
        e.preventDefault()
        axios.post('http://localhost:8000/api/user/new', reginfo, {withCredentials:true})
        .then(res=>{
            console.log(res)
            if(res.data.errors){
                setFormError(res.data.errors)
            }else{
                navigate('/dashboard')
            }
        })
        .catch(err=>{
            console.log('Something went wrong', err)
        })
    }


    return (
        <div className='mt-5'>
            <h1 className='text-primary'>Register</h1>
            <form onSubmit={submitHandler}  style={{width: '500px'}} className='mt-3' >
                <div className="form-group">
                    <label className='h3' htmlFor="">First name:</label>
                    <input onChange={changeHandler} type="text" name="firstName" className='form-control'/>
                    <p className='text-danger bg-warning text-center h5 rounded'>{formError.firstName?.message}</p>
                </div>
                <div className="form-group">
                    <label className='h3' htmlFor="">Last name:</label>
                    <input onChange={changeHandler} type="text" name="lastName" className='form-control'/>
                    <p className='text-danger bg-warning text-center h5 rounded'>{formError.lastName?.message}</p>
                </div>
                <div className="form-group">
                    <label className='h3' htmlFor="">Email:</label>
                    <input onChange={changeHandler} type="text" name="email" className='form-control'/>
                    <p className='text-danger bg-warning text-center h5 rounded'>{formError.email?.message}</p>
                </div>
                <div className="form-group">
                    <label className='h3' htmlFor="">Password:</label>
                    <input onChange={changeHandler} type="password" name="password" className='form-control'/>
                    <p className='text-danger bg-warning text-center h5 rounded'>{formError.password?.message}</p>
                </div>
                <div className="form-group">
                    <label className='h3' htmlFor="">Confirm Password:</label>
                    <input onChange={changeHandler} type="password" name="confirm" className='form-control'/>
                    <p className='text-danger bg-warning text-center h5 rounded'>{formError.confirm?.message}</p>
                </div>
                <input type="submit" value="Register" className='btn btn-success mt-3 btn-lg' />
            </form>
        </div>
    );
};


export default RegistrationForm;