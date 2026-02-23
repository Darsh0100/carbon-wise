import React, { useState } from 'react';
import { getExplanation } from '../api/api';
import { Bot, Sparkles, Loader2 } from 'lucide-react';

const ExplanationBox = ({ comparisonResult }) => {
    const [explanation, setExplanation] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleExplain = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await getExplanation({ comparison_result: comparisonResult });
            setExplanation(response.data.explanation);
        } catch (err) {
            setError('Failed to get explanation. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (explanation) {
        return (
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-100 rounded-xl p-6 shadow-sm relative">
                <div className="flex gap-4">
                    <div className="bg-indigo-600 text-white p-3 rounded-full h-12 w-12 flex items-center justify-center shrink-0 shadow-md">
                        <Bot size={24} />
                    </div>
                    <div>
                        <h4 className="font-bold text-indigo-900 mb-2 flex items-center gap-2">
                            AI Insight <Sparkles size={14} className="text-indigo-500" />
                        </h4>
                        <p className="text-indigo-800 leading-relaxed text-sm md:text-base">
                            {explanation}
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="text-center mt-8">
            <button
                onClick={handleExplain}
                disabled={loading}
                className="inline-flex items-center gap-2 text-indigo-600 font-bold hover:text-indigo-800 transition-colors disabled:opacity-50"
            >
                {loading ? <Loader2 className="animate-spin" /> : <Sparkles />}
                {loading ? 'Analyzing with AI...' : 'Why is this recommended?'}
            </button>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
    );
};

export default ExplanationBox;
