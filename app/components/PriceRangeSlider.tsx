'use client';
import React, { useState } from 'react';
// @ts-ignore
import Range from 'rc-slider/Range';
import 'rc-slider/assets/index.css';
import { useRouter } from 'next/navigation';

interface PriceRangeSliderProps {
  min: number;
  max: number;
  value: [number, number];
  searchParams: { [key: string]: string | string[] | undefined };
  typeQuery: string;
  searchQuery: string;
}

export default function PriceRangeSlider({ min, max, value, searchParams, typeQuery, searchQuery }: PriceRangeSliderProps) {
  const [range, setRange] = useState<[number, number]>(value);
  const router = useRouter();

  const handleAfterChange = (vals: number[]) => {
    const [minPrice, maxPrice] = vals;
    // Build query object
    const query: Record<string, any> = { ...searchParams, minPrice, maxPrice };
    if (typeQuery) query.type = typeQuery;
    if (searchQuery) query.search = searchQuery;
    query.page = 1;
    // Remove undefined
    Object.keys(query).forEach(key => { if (query[key] === undefined) delete query[key]; });
    const params = new URLSearchParams(query as any).toString();
    router.push(`/products?${params}`);
  };

  return (
    <div className="mb-8">
      <h3 className="text-lg font-bold mb-2">Price Range</h3>
      <div className="flex items-center justify-between text-sm mb-2">
        <span>${range[0]}</span>
        <span>${range[1]}</span>
      </div>
      <Range
        min={min}
        max={max}
        value={range}
        onChange={(vals: number[]) => setRange(vals as [number, number])}
        onAfterChange={(vals: number[]) => handleAfterChange(vals)}
        allowCross={false}
        trackStyle={[{ backgroundColor: '#000' }]}
        handleStyle={[{ borderColor: '#000' }, { borderColor: '#000' }]}
        railStyle={{ backgroundColor: '#d1d5db' }}
      />
    </div>
  );
} 