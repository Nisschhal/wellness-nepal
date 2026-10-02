import Link from "next/link"

export default function NotFound() {
  return (
    <div className="bg-surface min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <span className="text-brand-red font-bebas tracking-[0.4em] text-sm block mb-3 uppercase">
        ERROR 404
      </span>
      <h1 className="font-bebas text-6xl sm:text-7xl md:text-8xl text-surface-text italic leading-[0.9] tracking-tight mb-5">
        PAGE NOT FOUND
      </h1>
      <p className="text-surface-muted text-base md:text-lg max-w-md mb-8">
        The page you are looking for does not exist or has been moved.
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href="/"
          className="skew-button bg-brand-red h-12 px-8 text-white font-bebas text-xl tracking-widest uppercase hover:bg-surface-text hover:text-surface transition-all shadow-xl"
        >
          <span>BACK TO HOME</span>
        </Link>
        <Link
          href="/category"
          className="skew-button border-2 border-surface-border h-12 px-8 text-surface-text font-bebas text-xl tracking-widest uppercase hover:border-brand-red transition-all"
        >
          <span>VIEW CATALOG</span>
        </Link>
      </div>
    </div>
  )
}
