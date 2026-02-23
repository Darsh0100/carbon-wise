import React from 'react';
import { AlertTriangle, ShieldCheck, Info } from 'lucide-react';

const TruthMeter = ({ greenwashing, claim }) => {
    if (!greenwashing || !claim) return null;

    const { risk_level, reason, transparency_score } = greenwashing;

    const getRiskColor = (level) => {
        switch (level.toLowerCase()) {
            case 'high': return 'text-red-600 bg-red-50 border-red-200';
            case 'medium': return 'text-orange-600 bg-orange-50 border-orange-200';
            case 'low': return 'text-green-600 bg-green-50 border-green-200';
            default: return 'text-gray-600 bg-gray-50 border-gray-200';
        }
    };

    const getRiskIcon = (level) => {
        if (level.toLowerCase() === 'low') return <ShieldCheck size={20} />;
        if (level.toLowerCase() === 'medium' || level.toLowerCase() === 'high') return <AlertTriangle size={20} />;
        return <Info size={20} />;
    };

    return (
        <div className={`mt-4 p-4 border rounded-xl ${getRiskColor(risk_level)} shadow-sm`}>
            <div className="flex items-center gap-2 mb-2">
                {getRiskIcon(risk_level)}
                <h4 className="font-bold uppercase text-xs tracking-widest">Truth Meter: {risk_level} Risk</h4>
            </div>

            <p className="text-sm font-medium mb-3 italic">"{claim}"</p>

            <div className="text-sm border-t pt-2 opacity-90">
                <span className="font-bold">AI Analysis:</span> {reason}
            </div>

            <div className="mt-3">
                <div className="flex justify-between text-[10px] font-bold uppercase mb-1">
                    <span>Transparency Score</span>
                    <span>{transparency_score}/10</span>
                </div>
                <div className="w-full bg-black/10 h-1.5 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-current transition-all duration-1000"
                        style={{ width: `${transparency_score * 10}%` }}
                    />
                </div>
            </div>
        </div>
    );
};

export default TruthMeter;
