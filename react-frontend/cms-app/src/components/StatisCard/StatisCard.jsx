import React from 'react'

const StatusCard = props => {
    return (
        <div className='card border-gray-300 rounded-md border hover:border-blue-500 cursor-pointer hover:!text-orange-500'>           
            <div className="mx-8 my-5 text-center ">
                <h4 className='text-blue-500 mb-4 text-lg font-medium '>{props.title}</h4>
                <span className='text-xl font-bold'>{props.value}</span>
            </div>
        </div>
    )
}

export default StatusCard
