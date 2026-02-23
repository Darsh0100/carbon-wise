import React from 'react';
import CarbonLabel from './CarbonLabel';
import BreakEvenChart from './BreakEvenChart';

const ResultCard = ({ result }) => {
    if (!result || !result.vehicle) return null;

    return (
        <div className="flex flex-col items-center w-full">
            <CarbonLabel vehicle={result.vehicle} result={result} />
        </div>
    );
};

export default ResultCard;
