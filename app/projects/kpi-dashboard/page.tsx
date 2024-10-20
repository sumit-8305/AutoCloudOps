// app/dashboard/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import 'chart.js/auto';

export default function Dashboard() {
    const [trafficData, setTrafficData] = useState<number[]>([]);
    const [kpiData, setKpiData] = useState<number[]>([]);

    // Function to generate random data
    const generateRandomData = (min: number, max: number) => {
        const randomNumbers = [];
        for (let i = 0; i < 5; i++) {
            randomNumbers.push(Math.floor(Math.random() * (max - min + 1)) + min); // Random number between min and max
        }
        return randomNumbers;
    };

    // Initialize data on component mount
    useEffect(() => {
        // Generate initial data
        setTrafficData(generateRandomData(0, 100)); // User traffic data
        setKpiData(generateRandomData(0, 10)); // KPI data

        // Set interval to update the data every 5 seconds
        const interval = setInterval(() => {
            setTrafficData(generateRandomData(0, 100)); // Update user traffic data
            setKpiData(generateRandomData(0, 10)); // Update KPI data
        }, 5000);

        // Clear interval on component unmount
        return () => clearInterval(interval);
    }, []);

    const trafficChartOptions = {
        scales: {
            y: {
                beginAtZero: true,
                min: 0,
                max: 100, // Max value for user traffic
            },
        },
    };

    const kpiChartOptions = {
        scales: {
            y: {
                beginAtZero: true,
                min: 0,
                max: 10, // Max value for KPI
            },
        },
    };

    const trafficChartData = {
        labels: ['Traffic 1', 'Traffic 2', 'Traffic 3', 'Traffic 4', 'Traffic 5'],
        datasets: [
            {
                label: 'User Traffic',
                data: trafficData,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
            },
        ],
    };

    const kpiChartData = {
        labels: ['Metric 1', 'Metric 2', 'Metric 3', 'Metric 4', 'Metric 5'],
        datasets: [
            {
                label: 'KPI Data',
                data: kpiData,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="p-4 ">
            <div className='flex texxt-center justify-center'>
                <h1 className="text-2xl font-bold mb-4 flex text-center  ">KPI Dashboard</h1>
            </div>
            <div className="mb-6">
                <h2 className="text-xl mb-2">User Traffic</h2>
                <Bar data={trafficChartData} options={trafficChartOptions} />
            </div>

            <div>
                <h2 className="text-xl mb-2">KPI Metrics</h2>
                <Line data={kpiChartData} options={kpiChartOptions} />
            </div>
        </div>
    );
}
