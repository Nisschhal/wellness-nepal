export default function PortfolioLoading() {
  return (
    <div className="bg-surface min-h-screen pt-24 md:pt-28 pb-16 md:pb-20">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8 md:mb-12">
          <div className="space-y-3">
            <div className="h-4 w-48 bg-surface-darker animate-pulse" />
            <div className="h-12 w-72 bg-surface-darker animate-pulse" />
          </div>
          <div className="flex gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-10 w-28 bg-surface-darker animate-pulse" />
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="border border-surface-border bg-surface-darker overflow-hidden">
              <div className="aspect-[4/3] bg-surface-border/30 animate-pulse" />
              <div className="p-5 md:p-6 space-y-3">
                <div className="h-3 w-24 bg-surface-border animate-pulse" />
                <div className="h-7 w-full bg-surface-border animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
