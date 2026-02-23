import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

const EmissionChart = ({ car1Result, car2Result }) => {
    const data = [
        {
            name: `${car1Result.vehicle.make} ${car1Result.vehicle.model}`,
            Manufacturing: Math.round(car1Result.manufacturing),
            "Driving (Standard)": Math.round(car1Result.use_phase),
            "Driving (Real-World)": car1Result.real_world ? Math.round(car1Result.real_world.use_phase) : 0,
        },
        {
            name: `${car2Result.vehicle.make} ${car2Result.vehicle.model}`,
            Manufacturing: Math.round(car2Result.manufacturing),
            "Driving (Standard)": Math.round(car2Result.use_phase),
            "Driving (Real-World)": car2Result.real_world ? Math.round(car2Result.real_world.use_phase) : 0,
        },
    ];

    return (
        <div className="h-80 w-full bg-white p-4 rounded-xl shadow-soft border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">Lifecycle Emissions Breakdown</h3>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    data={data}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    layout="vertical" // Horizontal bars for better comparison
                >
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                    <XAxis type="number" unit=" kg" />
                    <YAxis dataKey="name" type="category" width={100} tick={{ fontSize: 12 }} />
                    <Tooltip
                        formatter={(value) => `${value.toLocaleString()} kg CO₂`}
                        cursor={{ fill: 'transparent' }}
                    />
                    <Legend />
                    <Bar dataKey="Manufacturing" stackId="a" fill="#9CA3AF" barSize={30} />
                    <Bar dataKey="Driving (Standard)" stackId="a" fill="#1B5E20" barSize={30} />
                    <Bar dataKey="Driving (Real-World)" stackId="b" fill="#DC2626" barSize={30} opacity={0.6} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default EmissionChart;
