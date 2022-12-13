import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import { Link } from "react-router-dom";
import ExpenseList from './ExpenseList';

const Dashboard = () => {

    let [userInfo, setUserInfo] = useState({})

    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8000/api/user/getloggedinuser', { withCredentials: true })
            .then(res => {
                console.log('res -->', res)
                if (res.data.results) {
                    setUserInfo(res.data.results)
                }
            })
            .catch(err => {
                console.log('err -->', err)
                navigate('/')
            })
    }, [navigate])

    const Logout = () => {
        axios.get('http://localhost:8000/api/user/logout', { withCredentials: true })
            .then(res => {
                console.log(res)
                navigate('/')
            })
            .catch(err => { console.log(err) })
    }
    //There is a bug now, if you delete a user with espenses, the code breaks
    // const deleteUser = ()=>{
    //     axios.delete(`http://localhost:8000/api/user/delete/${userInfo._id}`)
    //         .then(res => {
    //             console.log(res)
    //             navigate('/')
    //         })
    //         .catch(err => { console.log(err) })
    // }

    return (
        <div className='container'>
            <nav className="navbar navbar-light bg-light d-flex justify-content-between mt-4 rounded">
                <h1 className='ms-5'>Finance Tracker</h1>
                <DropdownButton className='me-5' title="Actions">
                    <Dropdown.Item><Link className='text-decoration-none text-success' to='/api/expense/new'>Add Expense</Link></Dropdown.Item>
                    <Dropdown.Item><button onClick={Logout} className='button'>Logout</button></Dropdown.Item>
                    {/* <Dropdown.Item> <button onClick={deleteUser} className='button text-danger'>Delete User</button></Dropdown.Item> */}
                </DropdownButton>
            </nav>
            <h2 className='mt-4 font'><strong>Welcome {userInfo.firstName}, keep track of your expenses below :</strong></h2>
            <div>
                <ExpenseList/>
            </div>
        </div>
    );
};


export default Dashboard;