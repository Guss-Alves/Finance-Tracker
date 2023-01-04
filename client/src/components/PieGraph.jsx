import React, { useEffect, useState } from 'react';
import { Chart as ChartJs, Tooltip, Title, ArcElement, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
ChartJs.register(
    Tooltip, Title, ArcElement, Legend
);
//this was a test so I could try use the chart with the useState
const PieGraph = () => {

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
        const fetchData = () => {
            fetch('https://jsonplaceholder.typicode.com/users').then((data) => {
                const res = data.json();
                return res
            }).then((res) => {
                console.log("resss", res)
                const label = [];
                const data = [];
                for (var i of res) {
                    label.push(i.name);
                    data.push(i.id)
                }
                setData(
                    {
                        datasets: [{
                            data: data,
                            backgroundColor: [
                                'red',
                                'blue',
                                'yellow',
                                'green',
                                'orange'
                            ]
                        },
                        ],
                        labels: label,
                    }
                )

            }).catch(e => {
                console.log("error", e)
            })
        }
        fetchData();
    }, [])

    return (
        <div className='' style={{height:'320px'}}>
            <Doughnut data={data}/>
        </div>
    );
};



export default PieGraph;