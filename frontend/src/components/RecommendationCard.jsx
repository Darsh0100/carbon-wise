import React from 'react';
import { Award, Leaf, TrendingDown } from 'lucide-react';

const RecommendationCard = ({ recommended, breakeven }) => {
    return (
        <div className="bg-primary/10 border-2 border-primary rounded-2xl p-8 text-center relative overflow-hidden shadow-lg">
            <div className="absolute top-0 right-0 p-4 opacity-10">
                <Leaf size={120} className="text-primary" />
            </div>

            <div className="relative z-10">
                <div className="inline-flex items-center gap-2 bg-primary text-white px-4 py-1 rounded-full text-sm font-bold mb-4 uppercase tracking-wider">
                    <Award size={16} /> Best Low-Carbon Choice
                </div>

                <h2 className="text-4xl font-black text-gray-900 mb-2">
                    {recommended.make} {recommended.model}
                </h2>

                <p className="text-xl text-primary font-bold mb-6">
                    Saves {Math.round(recommended.savings_kg).toLocaleString()} kg CO₂
                </p>

                {breakeven > 0 && (
                    <div className="inline-flex items-center gap-3 bg-white px-6 py-3 rounded-xl shadow-sm border border-primary/20">
                        <TrendingDown className="text-accent" size={24} />
                        <div className="text-left">
                            <p className="text-xs text-gray-500 font-semibold uppercase">Breakeven Point</p>
                            <p className="text-lg font-bold text-gray-900">{breakeven.toFixed(1)} Years</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RecommendationCard;
