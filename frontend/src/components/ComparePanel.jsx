import React, { useState, useEffect } from 'react';
import { getVehicles } from '../api/api';
import { Car, MapPin, Gauge } from 'lucide-react';

const ComparePanel = ({ onCompare, loading }) => {
    const [vehicles, setVehicles] = useState([]);
    const [car1, setCar1] = useState('');
    const [car2, setCar2] = useState('');
    const [annualKm, setAnnualKm] = useState(15000);
    const [region, setRegion] = useState('US');

    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                const response = await getVehicles();
                setVehicles(response.data);
            } catch (error) {
                console.error("Failed to fetch vehicles", error);
            }
        };
        fetchVehicles();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (car1 && car2 && annualKm) {
            // region is not currently used by backend endpoint but good to have in state for future
            onCompare({ car1_id: car1, car2_id: car2, annual_km: Number(annualKm), region });
        }
    };

    return (
        <div className="card max-w-4xl mx-auto -mt-8 relative z-10 bg-white/95 backdrop-blur-sm">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">

                {/* Car 1 Selection */}
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                        <Car size={16} className="text-primary" /> Vehicle A
                    </label>
                    <select
                        value={car1}
                        onChange={(e) => setCar1(e.target.value)}
                        className="input-field"
                        required
                    >
                        <option value="">Select Car...</option>
                        {vehicles.map(v => (
                            <option key={v._id} value={v._id}>{v.make} {v.model} ({v.type})</option>
                        ))}
                    </select>
                </div>

                {/* Car 2 Selection */}
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                        <Car size={16} className="text-secondary" /> Vehicle B
                    </label>
                    <select
                        value={car2}
                        onChange={(e) => setCar2(e.target.value)}
                        className="input-field"
                        required
                    >
                        <option value="">Select Car...</option>
                        {vehicles.map(v => (
                            <option key={v._id} value={v._id}>{v.make} {v.model} ({v.type})</option>
                        ))}
                    </select>
                </div>

                {/* Distance & Region */}
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                        <Gauge size={16} className="text-gray-500" /> Stats
                    </label>
                    <div className="flex gap-2">
                        <input
                            type="number"
                            value={annualKm}
                            onChange={(e) => setAnnualKm(e.target.value)}
                            className="input-field w-2/3"
                            placeholder="Km/Year"
                            min="1000"
                            required
                        />
                        <select
                            value={region}
                            onChange={(e) => setRegion(e.target.value)}
                            className="input-field w-1/3 bg-gray-50 text-sm"
                        >
                            <option value="US">US</option>
                            <option value="EU">EU</option>
                            <option value="GLOBAL">Global</option>
                        </select>
                    </div>
                </div>

                {/* Action Button */}
                <div>
                    <button
                        type="submit"
                        disabled={loading || !car1 || !car2}
                        className="btn-primary w-full flex items-center justify-center gap-2"
                    >
                        {loading ? 'Analyzing...' : 'Compare Impact'}
                    </button>
                </div>

            </form>
        </div>
    );
};

export default ComparePanel;
