export default function CategoryLoading() {
  return (
    <main className="bg-surface min-h-screen pt-24 md:pt-28 pb-16 md:pb-20">
      <div className="container mx-auto px-6">
        <div className="mb-8 md:mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="h-4 w-32 bg-surface-darker animate-pulse" />
            <div className="h-12 w-64 bg-surface-darker animate-pulse" />
          </div>
          <div className="h-12 w-full md:max-w-sm bg-surface-darker animate-pulse" />
        </div>
        <div className="lg:hidden mb-6 flex gap-2 overflow-hidden">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-10 w-24 shrink-0 bg-surface-darker animate-pulse" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 xl:gap-10">
          <nav className="hidden lg:block space-y-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-11 bg-surface-darker animate-pulse" />
            ))}
          </nav>
          <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 md:gap-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-surface-darker industrial-border overflow-hidden">
                <div className="aspect-square bg-surface-border/30 animate-pulse" />
                <div className="p-3 sm:p-4 md:p-5 space-y-3">
                  <div className="h-3 w-20 bg-surface-border animate-pulse" />
                  <div className="h-5 w-full bg-surface-border animate-pulse" />
                  <div className="h-10 sm:h-11 w-full bg-surface-border animate-pulse mt-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
