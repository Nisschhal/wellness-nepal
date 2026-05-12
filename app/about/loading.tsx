export default function AboutLoading() {
  return (
    <div className="bg-surface min-h-screen pt-28 md:pt-40 pb-20 md:pb-24">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center mb-20 md:mb-40">
          <div className="space-y-6">
            <div className="h-6 w-40 bg-surface-darker rounded animate-pulse" />
            <div className="h-14 w-72 bg-surface-darker rounded animate-pulse" />
            <div className="h-8 w-full bg-surface-darker rounded animate-pulse" />
            <div className="h-24 w-full bg-surface-darker rounded animate-pulse" />
            <div className="h-24 w-full bg-surface-darker rounded animate-pulse" />
          </div>
          <div className="aspect-square bg-surface-darker rounded animate-pulse" />
        </div>
      </div>
    </div>
  )
}
