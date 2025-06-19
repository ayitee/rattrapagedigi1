'use client';

import React from "react";

export type QnAItem = {
  question: string;
  answer: string;
};

export default function QnAAccordion({ qna }: { qna: QnAItem[] }) {
  return (
    <div className="space-y-4">
      {qna.map((item, idx) => (
        <details
          key={idx}
          className="group rounded-xl border border-white/20 bg-white/10 text-white transition-all overflow-hidden shadow-md group-open:shadow-2xl group-open:border-white"
        >
          <summary
            className="cursor-pointer px-4 py-3 font-semibold select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-inset text-white/90 rounded-t-xl transition bg-white/10 group-open:bg-white/20 group-open:text-white group-open:font-bold hover:bg-white/20 flex items-center justify-between gap-2"
          >
            <span>{item.question}</span>
            <span className="ml-2 flex items-center">
              <img
                src="/icons/chevron-down.png"
                alt="Show answer"
                className="w-5 h-5 transition-transform duration-300 group-open:rotate-180"
              />
            </span>
          </summary>
          <div
            className="px-4 py-3 text-white/90 border-t border-white/10 bg-white/5 transition-opacity duration-300 opacity-100 group-open:opacity-100 rounded-b-xl"
          >
            {item.answer}
          </div>
        </details>
      ))}
    </div>
  );
} 