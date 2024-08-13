import React, { useEffect, useState } from 'react'
import SideBar from '../Components/SideBar';
import Card from '../Components/Card';
import Graph from '../Components/Graph';
import axios from 'axios';
import BASEURL from '../Connection/Connection';
import { useSelector } from 'react-redux';
import { selectUser } from '../Redux/Slices/UserSlice';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';

const Dashboard = () => {
    const user = useSelector(selectUser);
    const [All_Cases, setAll_Cases] = useState([]);
    useEffect(() => {
        axios.get(`${BASEURL}/cases/all_cases`).then((response) => {
            const data = response.data;
            setAll_Cases(data);
        }).catch((err) => {
            console.log(err);
        })
    }, []);


    const [Inprogress, setInprogress] = useState([]);
    useEffect(() => {
        axios.get(`${BASEURL}/cases/case_inprogress`).then((response) => {
            const data = response.data;
            setInprogress(data);
        }).catch((err) => {
            console.log(err);
        })
    }, []);

    const [Completed_Cases, setCompleted_Cases] = useState([]);
    useEffect(() => {
        axios.get(`${BASEURL}/cases/case_completed`).then((response) => {
            const data = response.data;
            setCompleted_Cases(data);
        }).catch((err) => {
            console.log(err);
        })
    }, []);

    return (
        <div className=' grid grid-cols-10'>
            <div className=' col-span-2'>
                <SideBar />
            </div>
            <div className=' col-span-8 bg-[#F0F1F3] pb-5'>
                <div className=' flex justify-between py-1'>
                    <div className=' mx-3'>
                        <h1 className=' font-bold text-xl text-center pt-3'>Forensic Inventry System</h1>
                    </div>

                    <div className=' flex items-center space-x-3 px-4'>
                        <h1 className=' text-[#1482F0] font-bold text-lg'>{user?.user_type}</h1>
                        <RemoveOutlinedIcon />
                        <h1 className=' font-bold text-xl'>{user?.rank}</h1>
                    </div>
                </div>

                <div style={{ borderRadius: 20, borderRadius: 20 }} className=' bg-white mx-3 px-16 py-8 shadow-sm mt-5'>
                    <div className=' py-4'>
                        <h1 className=' font-bold text-xl'>FIS Analytics & Dashboard</h1>
                    </div>
                    <div style={{ borderBottom: "2px solid #1482F0", width: "10%" }}>

                    </div>
                    <div className=' grid grid-cols-3 gap-6 mt-7'>
                        <Card color="#E3F5FF" case_number={Inprogress?.length} Case_name="In-progress Cases" />
                        <Card color="#E5ECF6" Case_name="All Cases" case_number={All_Cases?.length} />
                        <Card color="#E3F5FF" Case_name="Completed Cases" case_number={Completed_Cases?.length} />
                    </div>

                    <div className=' mt-12'>
                        <Graph />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Dashboard;