import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2'
import { Chart, ArcElement, Legend, Tooltip, Title } from 'chart.js';
import axios from 'axios';
import _ from 'lodash';
// import ExpenseList from './ExpenseList';

const Graph = (props) => {

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
                // console.log('List res FOR THE CHART ->', res)

                 //HERE STARTS THE FUNCTIONS TO HAVE DINAMIC DATA ON THE CHART
                const categoriesArr = [];
                //here I will loop and get all the categories
                for (const dataObj of res.data.results) {
                    categoriesArr.push(dataObj.category);
                }
                //here I am getting rid of the duplicates categories inside the array
                let uniqueCategories = [...new Set(categoriesArr)];

                //here I am using lodash to group by categories and to get the total cost for each category
                let sum = _(res.data.results)
                            .groupBy("category")
                            .map((objs, key)=>{
                                return _.sumBy(objs, 'cost')
                            })
                            .value()

                setData(
                    {
                        datasets: [{
                            data: sum,
                            backgroundColor: [
                                'red',
                                'blue',
                                'yellow',
                                'lime',
                                'teal',
                                'firebrick',
                                'cyan',
                                'green',
                                'purple',
                                'pink',
                                'orange '
                            ],
                            hoverOffset: 14,
                            spacing: 12,
                        },
                        ],
                        labels: uniqueCategories,
                    },)
            })
            .catch(err => {
                console.log('something went wrong -->', err)
            })
    }, [props.updateGraph]);


    return (
        <div>
            <strong><h1 className='text-center mb-1'>Expenses by Category</h1></strong>
            <div className="d-flex justify-content-center align-items-center mb-5 ">
                <div className="graph d-flex justify-content-center m-5" style={{ height: '435px' }}>
                    <Doughnut data={data} />
                </div>
                <div>

                </div>
            </div>
        </div>
    );
};


export default Graph;