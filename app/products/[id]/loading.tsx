export default function ProductLoading() {
  return (
    <main className="bg-surface min-h-screen pt-24 md:pt-28 pb-16 md:pb-20">
      <div className="container mx-auto px-6">
        <div className="h-3 w-40 bg-surface-darker animate-pulse mb-6" />
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] gap-8 lg:gap-12">
          <div className="space-y-3">
            <div className="aspect-square bg-surface-darker industrial-border animate-pulse" />
            <div className="flex gap-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="size-16 md:size-20 bg-surface-darker animate-pulse" />
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <div className="h-3 w-32 bg-surface-darker animate-pulse" />
            <div className="h-12 w-4/5 bg-surface-darker animate-pulse" />
            <div className="h-4 w-full bg-surface-darker animate-pulse" />
            <div className="h-4 w-3/4 bg-surface-darker animate-pulse" />
            <div className="h-44 w-full bg-surface-darker industrial-border animate-pulse mt-6" />
            <div className="h-8 w-56 bg-surface-darker animate-pulse mt-6" />
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-10 w-full bg-surface-darker animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
