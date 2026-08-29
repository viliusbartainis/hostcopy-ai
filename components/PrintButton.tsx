'use client';

export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="print:hidden text-xs text-stone-500 hover:text-stone-800 underline"
    >
      Print this guide
    </button>
  );
}
