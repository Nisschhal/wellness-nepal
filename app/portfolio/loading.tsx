export default function PortfolioLoading() {
  return (
    <div className="bg-surface min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 space-y-3">
          <div className="h-6 w-48 bg-surface-darker rounded animate-pulse mx-auto" />
          <div className="h-14 w-72 bg-surface-darker rounded animate-pulse mx-auto" />
          <div className="flex justify-center gap-4 mt-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-12 w-32 bg-surface-darker rounded animate-pulse" />
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="border border-surface-border bg-surface-darker overflow-hidden">
              <div className="aspect-[4/3] bg-zinc-800/50 animate-pulse" />
              <div className="p-8 space-y-3">
                <div className="h-3 w-24 bg-surface-border rounded animate-pulse" />
                <div className="h-8 w-full bg-surface-border rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
