import React from 'react';

const Labels = () => {

    //this prbably has to go way, because can't make dinamic with this obj
    const obj = [
        {
            type: "Rent and Utilities",
            color: 'rgb(255, 99, 132)',
            percent: 45
        },
        {
            type: "Investing",
            color: 'rgb(54, 162, 235)',
            percent: 20
        },
        {
            type: "Grocery",
            color: 'rgb(255, 205, 86)',
            percent: 8
        },
        {
            type: "Dining",
            color: 'rgb(255, 99, 132)',
            percent: 6
        },
        {
            type: "Social",
            color: 'rgb(255, 99, 132)',
            percent: 55
        },
        {
            type: "Education",
            color: 'rgb(255, 99, 132)',
            percent: 15
        },
        {
            type: "Health",
            color: 'rgb(255, 99, 132)',
            percent: 12
        },
        {
            type: "Transportation",
            color: 'rgb(255, 99, 132)',
            percent: 1
        },
        {
            type: "Travel",
            color: 'rgb(255, 99, 132)',
            percent: 77
        },
        {
            type: "Entertainment",
            color: 'rgb(255, 99, 132)',
            percent: 45
        },
        {
            type: "Other",
            color: 'rgb(255, 99, 132)',
            percent: 15
        }
    ]
    //here I shoud get all the categories from api to avoid dry


    return (
        <div>
            <>
                {obj.map((v, i) => <LabelComponent key={i} data={v}></LabelComponent>)}
            </>
        </div>
    );
};

function LabelComponent({ data }){
    if(!data) return <></>;
    return(
        <div className='label d-flex justify-content-between' style={{width: "350px"}} >
            <div className="d-flex align-items-center" >
            <div className='btn btn-square-sm m-2 btn-default'id='changes' style={{background: data.color??'rgb(255, 99, 132)'}} ></div>
                <h5>{data.type?? ''}</h5>
            </div>
            <h5>{data.percent?? 0}%</h5>
        </div>
    )
}


export default Labels;