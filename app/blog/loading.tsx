export default function BlogLoading() {
  return (
    <div className="bg-surface min-h-screen pt-24 md:pt-28 pb-16 md:pb-20">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl space-y-4">
          <div className="h-4 w-40 bg-surface-darker animate-pulse" />
          <div className="h-16 w-full max-w-xl bg-surface-darker animate-pulse" />
          <div className="h-12 w-full bg-surface-darker animate-pulse" />
          <div className="h-6 w-full max-w-md bg-surface-darker animate-pulse" />
        </div>
        <div className="mt-12 md:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-48 bg-surface-darker industrial-border animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  )
}
