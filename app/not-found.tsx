import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-stone-50 flex items-center justify-center">
      <div className="text-center px-6">
        <h1 className="text-3xl font-serif font-semibold text-stone-900 mb-3">Page not found</h1>
        <p className="text-stone-600 mb-6">The page you're looking for doesn't exist.</p>
        <Link href="/" className="text-stone-900 underline font-medium">Go back home</Link>
      </div>
    </main>
  );
}
