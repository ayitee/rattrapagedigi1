'use client';
import React, { useState, useEffect } from 'react';

export function SwitchSelector({ switches }: { switches: string[] }) {
  const [selected, setSelected] = useState(0);
  return (
    <div className="mb-8 p-4 bg-gray-50 rounded-lg border border-gray-200 shadow-sm">
      <div className="font-semibold mb-3 text-gray-900">Switches</div>
      <div className="flex gap-3">
        {switches.map((sw, i) => (
          <button
            key={sw}
            type="button"
            onClick={() => setSelected(i)}
            className={`px-5 py-2 rounded-full font-medium text-base border transition shadow-sm focus:outline-none focus:ring-2 focus:ring-black/30
              ${selected === i
                ? 'bg-black text-white border-black shadow-md'
                : 'bg-white text-gray-900 border-gray-300 hover:bg-gray-100'}`}
          >
            {sw}
          </button>
        ))}
      </div>
    </div>
  );
}

export function QuantitySelector({
  price,
  value,
  onChange,
}: {
  price: number;
  value?: number;
  onChange?: (qty: number) => void;
}) {
  const [qty, setQty] = useState(value ?? 1);

  // Sync with parent if controlled
  useEffect(() => {
    if (value !== undefined) setQty(value);
  }, [value]);

  const setQuantity = (newQty: number) => {
    if (onChange) onChange(newQty);
    else setQty(newQty);
  };

  return (
    <div className="mb-8 p-4 bg-gray-50 rounded-lg border border-gray-200 shadow-sm w-full max-w-xs">
      <div className="font-semibold mb-3 text-gray-900">Quantity</div>
      <div className="flex items-center gap-3 mb-3">
        <button
          type="button"
          onClick={() => setQuantity(Math.max(1, qty - 1))}
          className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-full text-2xl font-bold bg-white hover:bg-gray-100 transition"
        >-</button>
        <span className="w-12 h-10 flex items-center justify-center border border-gray-300 rounded bg-white text-lg font-medium">
          {qty}
        </span>
        <button
          type="button"
          onClick={() => setQuantity(qty + 1)}
          className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-full text-2xl font-bold bg-white hover:bg-gray-100 transition"
        >+</button>
      </div>
      <div className="text-base font-semibold text-black">Subtotal: <span className="text-lg">${(qty * price).toFixed(2)}</span></div>
    </div>
  );
} 