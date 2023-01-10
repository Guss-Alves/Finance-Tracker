import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';

const ExpenseList = (props) => {

    let [allexpenses, setAllExpenses] = useState([]);
    let [deleteclicked, setDeleteClicked] = useState(false)

    // let [userInfo, setUserInfo] = useState({})

    useEffect(() => {
        axios.get('http://localhost:8000/api/loggedUserExpenses', {withCredentials:true})
            .then(res => {
                // console.log('List res ->', res)
                setAllExpenses(res.data.results)
            })
            .catch(err => {
                console.log('something went wrong -->', err)
            })
    }, [deleteclicked]);

    const deleteExpense = (id) => {
        axios.delete(`http://localhost:8000/api/expense/delete/${id}`)
            .then(res => {
                // console.log(res)
                setDeleteClicked(!deleteclicked)
                props.setupdateGraph(!props.updateGraph)
            })
            .catch(err => {
                console.log('something went wrong -->', err)
            })
    }

    const calculateTotal = ()=>{
        // console.log('Here is the Total ->', allexpenses);
        let sumTotal = allexpenses.reduce((accumulator, value)=> {
            return accumulator + value.cost;
        }, 0)
        return sumTotal;
    }

    return (
        <div>
            <h2 className='card bg-warning p-1 mt-4 text-center'>Total Amount: <strong>${calculateTotal()}</strong></h2>
            <div className='space  d-flex flex-wrap gap-2 justify-content-center mt-3 mb-5 '>
                {
                    allexpenses.map((item) => {
                        return (
                            <div key={item._id} className="card p-2 bg-light " style={{ width: '21rem' }}>
                                <div className='d-flex justify-content-between'>
                                    <p className='card-title'>Name: <strong>{item.name}</strong> </p>
                                    <button onClick={() => deleteExpense(item._id)} className='delete btn btn-danger rounded-circle position-absolute'>X</button>
                                </div>
                                <p className=' card-text text-primary'>Category: <strong>{item.category}</strong></p>
                                <p className=' card-text'> Date:<strong> {moment.utc(item.date).format("MMMM DD, YYYY")} </strong></p>
                                <p className=' card-text text-danger'> Cost:<strong> $<span>{item.cost}</span></strong></p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default ExpenseList;