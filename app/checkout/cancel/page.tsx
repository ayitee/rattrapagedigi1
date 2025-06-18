export default function CheckoutCancel() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-black/80 text-white">
      <h1 className="text-3xl font-bold mb-8">Payment Cancelled</h1>
      <p className="mb-4">Your payment was cancelled. You can try again or return to your cart.</p>
      <a href="/cart" className="text-blue-400 underline">Back to Cart</a>
    </main>
  );
} 