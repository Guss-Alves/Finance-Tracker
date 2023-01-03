import React, { useState,useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2'
import { Chart, ArcElement, Legend, Tooltip, Title } from 'chart.js';
import Labels from './Labels';
import axios from 'axios';

const Graph = () => {

    Chart.register(
        ArcElement, Legend, Tooltip, Title
    );

    const config = {
        data: {
            labels: [
                'Red',
                'Blue',
                'Yellow'
            ],
            datasets: [{
                data: [300, 50, 100],
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 205, 86)'
                ],
                hoverOffset: 7,
                borderRadius: 30,
                spacing: 10
            }]
        },
        options: {
            cutout: 90
        }
    }

    //Indian girl video has a way of passing array values to chart throught useState watch again!!!
    // let [chartData, setChartData] = [{}];
    
    useEffect(() => {
        axios.get('http://localhost:8000/api/loggedUserExpenses', { withCredentials: true })
        .then(res => {
            console.log('List res FOR THE CHART ->', res)
                // setAllExpenses(res.data.results)
                const categoriesArr = [];
                const categoriesCosts = [];
                for(const dataObj of res.data.results){
                    categoriesArr.push(dataObj.category);
                    categoriesCosts.push(parseInt(dataObj.cost));
                }
                console.log('its here dummy', categoriesArr);
                console.log('its here COST', categoriesCosts);
            })
            .catch(err => {
                console.log('something went wrong -->', err)
            })
        });


    return (
        <div>
            <h1 className='text-center mb-3'>Expenses Chart</h1>
            <div className="d-flex justify-content-around align-items-center mb-5 ">
                <div className="graph d-flex justify-content-center m-5" style={{ height: '320px' }}>
                    <Doughnut {...config}></Doughnut>
                </div>
                <div className="labels">
                    <Labels />
                </div>
            </div>
        </div>
    );
};


export default Graph;