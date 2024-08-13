import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactApexChart from 'react-apexcharts';
import BASEURL from '../Connection/Connection';

const Graph = () => {
    const [monthlyCounts, setMonthlyCounts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${BASEURL}/cases/case_graph`);
                setMonthlyCounts(response.data.monthlyCounts);
            } catch (error) {
                console.error('Error fetching data:', error.message);
            }
        };

        fetchData();
    }, []);

    // Extract month names and counts from the monthlyCounts array
    const categories = monthlyCounts.map((monthObj) => Object.keys(monthObj)[0]);
    const counts = monthlyCounts.map((monthObj) => Object.values(monthObj)[0]);

    const chartData = {
        options: {
            xaxis: {
                categories: categories,
            },
            colors: ["#1482F0"]
        },
        series: [
            {
                name: 'Cases',
                data: counts,
            },
        ],
    };

    return (
        <div style={{ border: "1px solid #dddddd" }} className=' bg-[#f7f9fb] shadow-sm rounded-[10px]'>
            <h2 className=' text-center pt-3 text-xl'>Monthly cases</h2>
            <ReactApexChart options={chartData.options} series={chartData.series} type="line" height={280} />
        </div>
    );
};

export default Graph;
