import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import ComparePanel from '../components/ComparePanel';
import ResultCard from '../components/ResultCard';
import RecommendationCard from '../components/RecommendationCard';
import EmissionChart from '../components/EmissionChart';
import ExplanationBox from '../components/ExplanationBox';
import { compareVehicles } from '../api/api';
import { ArrowRight } from 'lucide-react';
import BreakEvenChart from '../components/BreakEvenChart';

import TruthMeter from '../components/TruthMeter';

const Dashboard = () => {
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleCompare = async (data) => {
        setLoading(true);
        setError('');
        setResult(null); // Reset previous results
        try {
            const response = await compareVehicles(data);
            setResult(response.data);
            // specific error handling if any
        } catch (err) {
            console.error(err);
            setError('Comparison failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background pb-20">
            <Navbar />

            {/* Hero Section */}
            <div className="bg-gradient-to-b from-primary to-green-800 text-white pt-16 pb-24 px-4 text-center">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">Compare Carbon Footprints</h2>
                <p className="text-green-100 text-lg max-w-2xl mx-auto">
                    Make data-driven decisions about your next vehicle. Analyze lifecycle emissions from manufacturing to the road.
                </p>
            </div>

            <div className="container mx-auto px-4">
                <ComparePanel onCompare={handleCompare} loading={loading} />

                {error && (
                    <div className="mt-8 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-center max-w-2xl mx-auto">
                        {error}
                    </div>
                )}

                {result && (
                    <div className="mt-12 space-y-12 animate-fade-in">
                        {/* Recommendation Section */}
                        <div className="max-w-3xl mx-auto">
                            <RecommendationCard
                                recommended={result.recommended}
                                breakeven={result.breakeven_years}
                            />
                            <ExplanationBox comparisonResult={result} />
                        </div>

                        {/* Detailed Comparison */}
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">Detailed Analysis</h3>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                                {/* Car 1 */}
                                <div>
                                    <ResultCard result={result.car1} />
                                    <TruthMeter
                                        greenwashing={result.car1.greenwashing}
                                        claim={result.car1.vehicle.manufacturer_claim}
                                    />
                                </div>

                                {/* VS Graphic */}
                                <div className="hidden md:flex flex-col items-center justify-center h-full pt-20">
                                    <div className="bg-gray-100 rounded-full p-4">
                                        <span className="font-black text-gray-400 text-xl">VS</span>
                                    </div>
                                </div>

                                {/* Car 2 */}
                                <div>
                                    <ResultCard result={result.car2} />
                                    <TruthMeter
                                        greenwashing={result.car2.greenwashing}
                                        claim={result.car2.vehicle.manufacturer_claim}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Chart Section */}
                        <div className="max-w-4xl mx-auto space-y-12">
                            <EmissionChart car1Result={result.car1} car2Result={result.car2} />

                            <div className="animate-slide-up">
                                <h3 className="text-2xl font-bold text-gray-900 text-center mb-6">Carbon Break-Even Analysis</h3>
                                <BreakEvenChart car1={result.car1} car2={result.car2} />

                                {result.breakeven_years > 0 && (
                                    <div className="mt-8 p-6 bg-green-50 border-l-4 border-green-500 text-green-800 rounded-r-lg shadow-sm">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="p-2 bg-green-500 rounded-full text-white">
                                                <ArrowRight size={20} />
                                            </div>
                                            <p className="font-black text-lg uppercase tracking-wider">Sustainability Insight</p>
                                        </div>
                                        <p className="text-lg">
                                            The <span className="font-bold">{result.recommended.make} {result.recommended.model}</span> is the superior environmental choice.
                                            It offsets its higher manufacturing footprint and reaches a "Net Green" state in just
                                            <span className="font-black text-green-700 mx-1 underline decoration-2">{result.breakeven_years.toFixed(1)} years</span>
                                            of ownership.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
