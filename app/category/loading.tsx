export default function CategoryLoading() {
  return (
    <main className="bg-surface min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-6">
        <div className="mb-16 space-y-3">
          <div className="h-6 w-40 bg-surface-darker rounded animate-pulse" />
          <div className="h-16 w-80 bg-surface-darker rounded animate-pulse" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          <nav className="space-y-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-12 bg-surface-darker rounded animate-pulse" />
            ))}
          </nav>
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-surface-darker industrial-border overflow-hidden">
                <div className="aspect-square bg-zinc-800/50 animate-pulse" />
                <div className="p-6 space-y-3">
                  <div className="h-3 w-20 bg-surface-border rounded animate-pulse" />
                  <div className="h-6 w-full bg-surface-border rounded animate-pulse" />
                  <div className="h-10 w-full bg-surface-border rounded animate-pulse mt-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
