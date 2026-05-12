import Link from "next/link"

export default function NotFound() {
  return (
    <div className="bg-surface min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <span className="text-brand-red font-bebas tracking-[0.4em] text-sm block mb-4 uppercase">
        ERROR 404
      </span>
      <h1 className="font-bebas text-7xl md:text-[10rem] text-surface-text italic leading-none tracking-tighter mb-6">
        PAGE NOT FOUND
      </h1>
      <p className="text-surface-muted text-lg md:text-xl max-w-md mb-12 italic">
        The page you are looking for does not exist or has been moved.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/"
          className="skew-button bg-brand-red px-10 py-4 text-white font-bebas text-xl tracking-widest uppercase hover:bg-surface-text hover:text-surface transition-all shadow-xl"
        >
          <span>BACK TO HOME</span>
        </Link>
        <Link
          href="/category"
          className="skew-button border-2 border-surface-border px-10 py-4 text-surface-text font-bebas text-xl tracking-widest uppercase hover:border-brand-red transition-all"
        >
          <span>VIEW CATALOG</span>
        </Link>
      </div>
    </div>
  )
}
