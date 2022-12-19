import React from 'react';
import { Doughnut } from 'react-chartjs-2'
import { Chart, ArcElement } from 'chart.js';
import Labels from './Labels';

const Graph = () => {

    Chart.register(ArcElement);

    const config = {
        data:{
            datasets: [{
                label: 'My First Dataset',
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

    return (
        <div>
            <h1 className='text-center mb-3'>Expenses Chart</h1>
            <div className="d-flex justify-content-around align-items-center mb-5 ">
                <div className="graph d-flex justify-content-center m-5" style={{height: '320px'}}>
                    <Doughnut {...config}></Doughnut>
                </div>
                <div className="labels">
                    <Labels/>
                </div>
            </div>
        </div>
    );
};


export default Graph;