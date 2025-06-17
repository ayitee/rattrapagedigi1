import path from 'path';
import { promises as fs } from 'fs';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { SwitchSelector, QuantitySelector } from '../../components/SwitchAndQuantitySelectors';
import Header from '../../components/Header';

async function getProduct(id: number) {
  const filePath = path.join(process.cwd(), 'prisma/products.json');
  const data = await fs.readFile(filePath, 'utf-8');
  const products = JSON.parse(data);
  return products.find((p: any) => p.id === id);
}

const switches = [
  'Gateron II Magnetic Switch',
  'ATK II Magnetic Switch',
];

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(Number(params.id));
  if (!product) notFound();

  // Example Q&A data (replace with real data if available)
  const qna = [
    {
      question: 'What is the warranty period?',
      answer: 'All ATK products come with a 1-year warranty covering manufacturing defects.'
    },
    {
      question: 'Is international shipping available?',
      answer: 'Yes, we ship worldwide. Shipping fees and delivery times vary by location.'
    },
    {
      question: 'Can I return the product?',
      answer: 'Returns are accepted within 30 days of delivery if the product is in original condition.'
    }
  ];

  // Extract bullet points from description if possible (for demo, split by '•' or fallback to full desc)
  let details: string[] = [];
  if (product.description.includes('•')) {
    details = product.description.split('•').map((s: string) => s.trim()).filter(Boolean);
  } else if (product.description.includes(' - ')) {
    details = product.description.split(' - ').map((s: string) => s.trim()).filter(Boolean);
  } else {
    details = [product.description];
  }

  return (
    <main className="min-h-screen bg-white text-black flex flex-col">
      {/* Header */}
      <Header />

      <div className="max-w-5xl mx-auto w-full p-8">
        <div className="flex flex-col md:flex-row gap-12">
          {/* Image on the left */}
          <div className="flex-shrink-0 flex justify-center items-center w-full md:w-1/2">
            <img src={product.photo} alt={product.name} className="w-full max-w-xs h-auto object-cover rounded" />
          </div>
          {/* Info on the right */}
          <div className="flex flex-col w-full md:w-1/2">
            <h1 className="text-3xl font-bold mb-2 line-clamp-2">{product.name}</h1>
            <div className="text-2xl font-semibold text-gray-800 mb-4">${product.price.toFixed(2)}</div>
            <ul className="mb-6 list-disc list-inside space-y-1 text-gray-700">
              {details.map((d, i) => <li key={i}>{d}</li>)}
            </ul>
            {/* Switches selection (frontend only) */}
            <SwitchSelector switches={switches} />
            {/* Quantity selector (frontend only) */}
            <QuantitySelector price={product.price} />
          </div>
        </div>
        {/* Description below */}
        <div className="mt-10">
          <h2 className="text-xl font-bold mb-2">Description</h2>
          <p className="text-gray-600 text-base md:text-lg">{product.description}</p>
        </div>
      </div>
      {/* Q&A Accordion with extra spacing */}
      <div className="max-w-5xl mx-auto w-full px-8 pb-12 mt-16">
        <h2 className="text-2xl font-bold mb-4">Q&amp;A</h2>
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
      </div>
      {/* Footer */}
      <footer className="border-t border-gray-200 p-6 text-center text-xs text-gray-500">
        &copy; {new Date().getFullYear()} Rattrapage Digi. All rights reserved.
      </footer>
    </main>
  );
} 