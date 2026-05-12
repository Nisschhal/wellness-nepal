export default function ProjectLoading() {
  return (
    <div className="bg-surface min-h-screen pt-40 pb-32">
      <div className="container mx-auto px-6">
        <div className="h-4 w-48 bg-surface-darker rounded animate-pulse mb-16" />
        <div className="aspect-video w-full bg-surface-darker industrial-border animate-pulse mb-24" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-24">
          <div className="lg:col-span-2 space-y-8">
            <div className="h-8 w-48 bg-surface-darker rounded animate-pulse" />
            <div className="h-24 w-full bg-surface-darker rounded animate-pulse" />
            <div className="grid grid-cols-2 gap-10">
              <div className="h-64 bg-surface-darker rounded animate-pulse" />
              <div className="h-64 bg-surface-darker rounded animate-pulse" />
            </div>
          </div>
          <div className="space-y-8">
            <div className="h-96 bg-surface-darker rounded animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  )
}
