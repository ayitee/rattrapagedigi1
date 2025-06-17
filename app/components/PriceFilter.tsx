'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface PriceFilterProps {
  min: number;
  max: number;
  selectedMin: number;
  selectedMax: number;
  typeQuery: string;
  searchQuery: string;
}

export default function PriceFilter({ min, max, selectedMin, selectedMax, typeQuery, searchQuery }: PriceFilterProps) {
  const [minPrice, setMinPrice] = useState(selectedMin);
  const [maxPrice, setMaxPrice] = useState(selectedMax);
  const router = useRouter();

  const handleMinChange = (val: number) => {
    setMinPrice(Math.min(val, maxPrice));
  };
  const handleMaxChange = (val: number) => {
    setMaxPrice(Math.max(val, minPrice));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    params.set('minPrice', String(minPrice));
    params.set('maxPrice', String(maxPrice));
    if (typeQuery) params.set('type', typeQuery);
    if (searchQuery) params.set('search', searchQuery);
    router.push(`/products?${params.toString()}`);
  };

  return (
    <form className="mb-8" onSubmit={handleSubmit}>
      <h3 className="text-lg font-bold mb-2">Price Range</h3>
      <div className="flex items-center justify-between text-sm mb-2">
        <span>${minPrice}</span>
        <span>${maxPrice}</span>
      </div>
      <div className="flex flex-col gap-2">
        <input
          type="range"
          min={min}
          max={maxPrice}
          value={minPrice}
          onChange={e => handleMinChange(Number(e.target.value))}
          className="w-full accent-black h-3 rounded-lg appearance-none bg-gray-300 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:bg-black [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:transition-all"
          step="1"
        />
        <input
          type="range"
          min={minPrice}
          max={max}
          value={maxPrice}
          onChange={e => handleMaxChange(Number(e.target.value))}
          className="w-full accent-black h-3 rounded-lg appearance-none bg-gray-300 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:bg-black [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:transition-all"
          step="1"
        />
      </div>
      <div className="flex items-center justify-between mt-4 mb-2">
        <div className="flex items-center border border-gray-400 rounded px-2 py-1 bg-white">
          <span className="text-gray-500 mr-1">$</span>
          <input
            type="number"
            min={min}
            max={maxPrice}
            value={minPrice}
            onChange={e => handleMinChange(Number(e.target.value))}
            className="w-16 text-center outline-none bg-transparent"
          />
        </div>
        <span className="mx-2 text-gray-700">to</span>
        <div className="flex items-center border border-gray-400 rounded px-2 py-1 bg-white">
          <span className="text-gray-500 mr-1">$</span>
          <input
            type="number"
            min={minPrice}
            max={max}
            value={maxPrice}
            onChange={e => handleMaxChange(Number(e.target.value))}
            className="w-16 text-center outline-none bg-transparent"
          />
        </div>
      </div>
      <button type="submit" className="mt-3 w-full px-4 py-2 rounded bg-black text-white font-medium hover:bg-gray-800 transition">Apply</button>
    </form>
  );
} 