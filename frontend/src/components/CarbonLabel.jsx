import React from 'react';

const CarbonLabel = ({ vehicle, result }) => {
    const grade = result.total < 25000 ? 'A' : result.total < 40000 ? 'B' : 'C';
    const gradeColor = grade === 'A' ? 'text-green-600' : grade === 'B' ? 'text-yellow-600' : 'text-red-600';

    return (
        <div className="border-2 border-gray-900 p-4 font-sans max-w-sm bg-white shadow-sm">
            <h3 className="font-black text-2xl border-b-4 border-gray-900 pb-1 mb-2">Carbon Facts</h3>
            <div className="flex justify-between items-baseline mb-1">
                <span className="font-bold text-lg">{vehicle.make} {vehicle.model}</span>
                <span className="text-sm text-gray-600">{vehicle.type}</span>
            </div>
            <div className="border-b border-gray-300 mb-2"></div>

            <div className="flex justify-between items-center py-1 font-bold text-sm">
                <span>Lifecycle CO₂</span>
                <span>{Math.round(result.total).toLocaleString()} kg</span>
            </div>

            <div className="border-b-4 border-gray-900 my-2"></div>

            <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                    <span className="pl-4">Manufacturing</span>
                    <span className="font-medium">{Math.round(result.manufacturing).toLocaleString()} kg</span>
                </div>
                <div className="flex justify-between border-b-2 border-gray-900 pb-1">
                    <span className="pl-4">Use-Phase</span>
                    <span className="font-medium">{Math.round(result.use_phase).toLocaleString()} kg</span>
                </div>
                {result.real_world && (
                    <div className="flex justify-between pt-1 text-red-700">
                        <span className="pl-0 font-bold italic">Real-World Est.</span>
                        <span className="font-black italic">{Math.round(result.real_world.total).toLocaleString()} kg</span>
                    </div>
                )}
            </div>

            <div className="mt-4 flex justify-between items-center bg-gray-50 p-2 border border-gray-200">
                <span className="font-bold text-gray-700">Carbon Grade</span>
                <span className={`font-black text-3xl ${gradeColor}`}>{grade}</span>
            </div>

            <div className="mt-2 text-[10px] text-gray-500 leading-tight">
                *Based on 15yr lifetime. Values are estimates. Confidence Score: {result.confidence_score}%
            </div>
        </div>
    );
};

export default CarbonLabel;
