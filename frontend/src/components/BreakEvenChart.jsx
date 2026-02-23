import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const BreakEvenChart = ({ car1, car2 }) => {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Cumulative Carbon Debt (kg CO2)',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Total Emissions (kg)'
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Years of Ownership'
                }
            }
        }
    };

    const labels = car1.timeline.map(p => `Yr ${p.year}`);

    const data = {
        labels,
        datasets: [
            {
                label: `${car1.vehicle.make} ${car1.vehicle.model}`,
                data: car1.timeline.map(p => p.emissions),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: `${car2.vehicle.make} ${car2.vehicle.model}`,
                data: car2.timeline.map(p => p.emissions),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };

    return (
        <div className="w-full max-w-2xl bg-white p-4 rounded-lg shadow-md mt-6">
            <Line options={options} data={data} />
        </div>
    );
};

export default BreakEvenChart;
