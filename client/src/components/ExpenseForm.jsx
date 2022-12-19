import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const ExpenseForm = () => {

    const categoriesOptions = [
        "choose one below",
        "Rent and Utilities",
        "Investing",
        "Grocery",
        "Dining",
        "Social",
        "Education",
        "Health",
        "Transportation",
        "Travel",
        "Entertainment",
        "Other",
    ]

    let [expenseForm, setExpenseForm] = useState({})
    let [formError, setFormError] = useState({})

    const navigate = useNavigate();

    const changeHandler = (e) => {
        setExpenseForm({
            ...expenseForm,
            [e.target.name]: e.target.value
        })
    }

    const submitHandler = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/expense/new', expenseForm, { withCredentials: true })
            .then(res => {
                console.log(res)
                if (res.data.errors) {
                    setFormError(res.data.errors)
                } else {
                    navigate('/dashboard')
                }
            })
            .catch(err => {
                console.log('Something went wrong', err)
            })
    }

    return (
        <div>
            <h1 className='text-center mt-4'>Add a new expense </h1>
            <form onSubmit={submitHandler} className="form p-3 rounded" style={{ width: '600px' }}>
                <div className="form-group">
                    <label className='h3'>Name :</label>
                    <input onChange={changeHandler} type="text" name="name" className='form-control' />
                    <p className='text-danger bg-warning text-center h5 rounded'>{formError.name?.message}</p>
                </div>
                <div className="form-group">
                    <label className='h3'>Category :</label>
                    <select name="category" className='form-select' onChange={changeHandler} >
                    {
                        categoriesOptions.map((cat, i) => {
                            return <option key={i} value={cat}>{cat}</option>
                        })
                    }
                </select>
                <p className='text-danger bg-warning text-center h5 rounded'>{formError.category?.message}</p>
                </div>
                <div className="form-group">
                    <label className='h3'>Date :</label>
                    <input onChange={changeHandler} type="date" name="date" className='form-control' />
                    <p className='text-danger bg-warning text-center h5 rounded'>{formError.date?.message}</p>
                </div>
                <div className="form-group">
                    <label className='h3'>Cost :</label>
                    <input onChange={changeHandler} type="number" name="cost" className='form-control' />
                    <p className='text-danger bg-warning text-center h5 rounded'>{formError.cost?.message}</p>
                </div>
                {/* <input type="hidden" name="user_id" value={expenseForm._id} /> */}
                <div className="d-flex justify-content-between align-items-center mt-3">
                    <input type="submit" value="Add" className='btn btn-success btn-lg' />
                    <Link to='/dashboard' className=' me-5 h5'>Home</Link>
                </div>
            </form>
        </div>
    );
};

export default ExpenseForm;