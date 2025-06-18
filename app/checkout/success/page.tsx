export default function CheckoutSuccess() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-black/80 text-white">
      <h1 className="text-3xl font-bold mb-8">Payment Successful!</h1>
      <p className="mb-4">Thank you for your purchase. Your order has been received.</p>
      <a href="/products" className="text-blue-400 underline">Continue Shopping</a>
    </main>
  );
} 