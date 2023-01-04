import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2'
import { Chart, ArcElement, Legend, Tooltip, Title } from 'chart.js';
// import Labels from './Labels';
import axios from 'axios';
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
                console.log('its here dummy', categoriesArr);
                console.log('I AM HEREEE, YES THE COST', categoriesCost)
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