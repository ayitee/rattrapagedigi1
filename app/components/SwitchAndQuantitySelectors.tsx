'use client';
import React, { useState, useEffect } from 'react';

export function SwitchSelector({ switches }: { switches: string[] }) {
  const [selected, setSelected] = useState(0);
  return (
    <div className="mb-8 p-4 glassmorphic rounded-2xl border border-white/20 shadow-lg">
      <div className="font-semibold mb-3 text-white">Switches</div>
      <div className="flex gap-3">
        {switches.map((sw, i) => (
          <button
            key={sw}
            type="button"
            onClick={() => setSelected(i)}
            className={`px-5 py-2 rounded-full font-medium text-base border transition shadow-sm focus:outline-none focus:ring-2 focus:ring-white/30
              ${selected === i
                ? 'bg-white/20 text-white border-white shadow-md'
                : 'bg-white/10 text-white/80 border-white/20 hover:bg-white/20'}`}
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
    <div className="mb-4 p-4 glassmorphic rounded-2xl border border-white/20 shadow-lg w-full">
      <div className="font-semibold mb-3 text-white">Quantity</div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setQuantity(Math.max(1, qty - 1))}
          className="w-10 h-10 flex items-center justify-center border border-white/20 rounded-full text-2xl font-bold bg-white/10 text-white hover:bg-white/20 transition"
        >-</button>
        <span
          className={`px-5 py-2 rounded-full font-medium text-base border transition shadow-sm focus:outline-none focus:ring-2 focus:ring-white/30 bg-white/20 text-white border-white shadow-md flex justify-center`}
        >
          {qty}
        </span>
        <button
          type="button"
          onClick={() => setQuantity(qty + 1)}
          className="w-10 h-10 flex items-center justify-center border border-white/20 rounded-full text-2xl font-bold bg-white/10 text-white hover:bg-white/20 transition"
        >+</button>
      </div>
    </div>
  );
}

export function QuantitySelectorSubtotal({
  price,
  value,
}: {
  price: number;
  value?: number;
}) {
  const [qty, setQty] = useState(value ?? 1);

  // Sync with parent if controlled
  useEffect(() => {
    if (value !== undefined) setQty(value);
  }, [value]);

  const setQuantity = (newQty: number) => {
    setQty(newQty);
  };

  return (
    <div className="mb-8 text-3xl font-extrabold text-white text-center tracking-tight">
      Subtotal: <span>${(qty * price).toFixed(2)}</span>
    </div>
  );
} 