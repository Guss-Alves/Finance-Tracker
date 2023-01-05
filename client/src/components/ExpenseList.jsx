import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';

const ExpenseList = () => {

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
            })
            .catch(err => {
                console.log('something went wrong -->', err)
            })
    }

    const calculateTotal = ()=>{
        // console.log('Here is the Total ->', allexpenses);
        let sum = allexpenses.reduce((accumulator, value)=> {
            return accumulator + value.cost;
        }, 0)
        return sum;

        // let sum = myExpenses.filter(expense=>expense.category.includes(selectedCat)).filter(expense=>{
        //     if(selectedDate<13){
        //         return moment.utc(expense.date).month() == selectedDate
        //     }else{
        //         return true
        //     }
        // }).reduce((acc, obj) => { return acc + obj.price}, 0);
        // return sum;
    }
    //here I have to get the total for each category

    return (
        <div>
            <h2 className='card bg-warning p-1 mt-4 text-center'>Total Amount: ${calculateTotal()}</h2>
            <div className='space  d-flex flex-wrap gap-2 justify-content-center mt-3 mb-5 '>
                {
                    allexpenses.map((item) => {
                        return (
                            <div key={item._id} className="card p-3 bg-light " style={{ width: '22rem' }}>
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