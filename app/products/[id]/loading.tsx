export default function ProductLoading() {
  return (
    <main className="bg-surface min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-6">
        <div className="h-4 w-40 bg-surface-darker rounded animate-pulse mb-12" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-6">
            <div className="aspect-square bg-surface-darker industrial-border animate-pulse" />
            <div className="grid grid-cols-2 gap-4">
              <div className="h-20 bg-surface-darker rounded animate-pulse" />
              <div className="h-20 bg-surface-darker rounded animate-pulse" />
            </div>
          </div>
          <div className="space-y-6">
            <div className="h-4 w-32 bg-surface-darker rounded animate-pulse" />
            <div className="h-20 w-full bg-surface-darker rounded animate-pulse" />
            <div className="h-6 w-full bg-surface-darker rounded animate-pulse" />
            <div className="h-6 w-3/4 bg-surface-darker rounded animate-pulse" />
            <div className="h-16 w-full bg-surface-darker rounded animate-pulse mt-8" />
            <div className="h-14 w-full bg-surface-darker rounded animate-pulse" />
          </div>
        </div>
      </div>
    </main>
  )
}
