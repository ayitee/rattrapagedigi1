'use client';

export type QnAItem = {
  question: string;
  answer: string;
};

export default function QnAAccordion({ qna }: { qna: QnAItem[] }) {
  return (
    <div className="space-y-4">
      {qna.map((item, idx) => (
        <details key={idx} className="border rounded">
          <summary className="cursor-pointer px-4 py-3 font-medium select-none focus:outline-none focus:ring-2 focus:ring-black">
            {item.question}
          </summary>
          <div className="px-4 py-3 text-gray-700 border-t bg-gray-50">{item.answer}</div>
        </details>
      ))}
    </div>
  );
} 