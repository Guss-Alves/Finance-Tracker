import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2'
import { Chart, ArcElement, Legend, Tooltip, Title } from 'chart.js';
import axios from 'axios';
import _ from 'lodash';
// import ExpenseList from './ExpenseList';

const Graph = () => {

    Chart.register(
        ArcElement, Legend, Tooltip, Title
    );

    const [data, setData] = useState({
        datasets: [{
            data: [10, 20, 30],
            backgroundColor: [
                'red',
                'blue',
                'yellow'
            ]
        },
        ],
        labels: [
            'Red',
            'Yellow',
            'Blue'
        ],
    });

    useEffect(() => {
        axios.get('http://localhost:8000/api/loggedUserExpenses', { withCredentials: true })
            .then(res => {
                console.log('List res FOR THE CHART ->', res)
                const categoriesArr = [];
                const categoriesCost = [];
                for (const dataObj of res.data.results) {
                    categoriesArr.push(dataObj.category);
                    categoriesCost.push(dataObj.cost);
                }
                // console.log('its here dummy', categoriesArr);
                // console.log('I AM HEREEE, YES THE COST', categoriesCost)

                //HERE STARTS THE FUNCTIONS TO HAVE DINAMIC DATA ON THE CHART
                let storeData = [];
                function getSum(transaction){
                    let sum = _(transaction)
                            .groupBy("category")
                            .map((objs, key)=>{
                                return objs
                            })
                            .value()
                    storeData.push(transaction);
                    console.log(sum);
                }
                getSum(res.data.results);
                console.log('now is outside the function',storeData);

                setData(
                    {
                        datasets: [{
                            data: categoriesCost,
                            backgroundColor: [
                                'red',
                                'blue',
                                'yellow',
                                'orange',
                                'green',
                                'purple',
                                'brown',
                                'aqua',
                                'white'
                            ],
                            hoverOffset: 14,
                        },
                        ],
                        labels: categoriesArr,
                    },)
            })
            .catch(err => {
                console.log('something went wrong -->', err)
            })
    }, []);


    return (
        <div>
            <strong><h1 className='text-center mb-3'>Expenses Chart</h1></strong>
            <div className="d-flex justify-content-center align-items-center mb-5 ">
                <div className="graph d-flex justify-content-center m-5" style={{ height: '430px' }}>
                    <Doughnut data={data} />
                </div>
                {/* <div className="labels">
                    <Labels />
                </div> */}
            </div>
        </div>
    );
};


export default Graph;