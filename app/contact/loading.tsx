export default function ContactLoading() {
  return (
    <div className="bg-surface min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="h-6 w-40 bg-surface-darker rounded animate-pulse" />
          <div className="h-14 w-80 bg-surface-darker rounded animate-pulse" />
          <div className="h-6 w-full bg-surface-darker rounded animate-pulse" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-14 bg-surface-darker rounded animate-pulse" />
            ))}
          </div>
          <div className="h-40 bg-surface-darker rounded animate-pulse" />
          <div className="h-14 w-full bg-surface-darker rounded animate-pulse" />
        </div>
      </div>
    </div>
  )
}
