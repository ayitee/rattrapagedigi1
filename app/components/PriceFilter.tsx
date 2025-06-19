'use client';
import React from 'react';

interface PriceFilterProps {
  minPrice: number;
  maxPrice: number;
  onMinPriceChange: (value: number) => void;
  onMaxPriceChange: (value: number) => void;
}

const PriceFilter: React.FC<PriceFilterProps> = ({
  minPrice,
  maxPrice,
  onMinPriceChange,
  onMaxPriceChange,
}) => {
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-white font-medium">Price Range</span>
        <div className="text-gray-300">
          ${minPrice} - ${maxPrice}
        </div>
      </div>
      <div className="flex items-center gap-4">
        <input
          type="range"
          min={0}
          max={1000}
          value={minPrice}
          onChange={(e) => onMinPriceChange(Number(e.target.value))}
          className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
        />
        <input
          type="range"
          min={0}
          max={1000}
          value={maxPrice}
          onChange={(e) => onMaxPriceChange(Number(e.target.value))}
          className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
        />
      </div>
    </div>
  );
};

export default PriceFilter; 