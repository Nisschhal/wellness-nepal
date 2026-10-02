export default function AboutLoading() {
  return (
    <div className="bg-surface min-h-screen pt-24 md:pt-28 pb-16 md:pb-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16 md:mb-24">
          <div className="space-y-5">
            <div className="h-4 w-32 bg-surface-darker animate-pulse" />
            <div className="h-12 w-72 bg-surface-darker animate-pulse" />
            <div className="h-7 w-full bg-surface-darker animate-pulse" />
            <div className="h-20 w-full bg-surface-darker animate-pulse" />
            <div className="h-16 w-full bg-surface-darker animate-pulse" />
            <div className="grid grid-cols-2 gap-3">
              <div className="h-14 bg-surface-darker animate-pulse" />
              <div className="h-14 bg-surface-darker animate-pulse" />
            </div>
          </div>
          <div className="aspect-square bg-surface-darker animate-pulse" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-48 bg-surface-darker industrial-border animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  )
}
