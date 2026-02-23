import React from 'react';
import { Leaf } from 'lucide-react';

const Navbar = () => {
    return (
        <nav className="bg-white border-b border-gray-100 py-4 shadow-sm sticky top-0 z-50">
            <div className="container mx-auto px-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="bg-primary p-2 rounded-lg text-white">
                        <Leaf size={24} />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-gray-900 leading-tight">Carbon-Wise</h1>
                        <p className="text-xs text-gray-500 font-medium">The Nutrition Label for Cars</p>
                    </div>
                </div>
                <div>
                    <a href="#" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">About</a>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
