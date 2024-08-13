import React from 'react';
import MovingIcon from '@mui/icons-material/Moving';

const Card = ({ Case_name, case_number, color }) => {
    // bg-[#E3F5FF]
    return (
        <div style={{ backgroundColor: color }} className=' rounded-[13px] px-8 py-5 shadow-sm  font-bold text-xl'>
            <h1>{Case_name}</h1>


            <div className=' flex justify-between pt-5'>
                <h1 className=' font-bold  text-2xl '>{case_number}</h1>
                <div>
                    <MovingIcon />
                </div>
            </div>



        </div>
    )
}

export default Card;