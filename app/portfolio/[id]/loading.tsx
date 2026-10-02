export default function ProjectLoading() {
  return (
    <div className="bg-surface min-h-screen pb-16 md:pb-20">
      <div className="h-[68svh] min-h-[440px] max-h-[720px] w-full bg-surface-darker animate-pulse" />
      <div className="container mx-auto px-6 pt-8 md:pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-12">
          <div className="lg:col-span-2 space-y-6">
            <div className="h-12 w-64 bg-surface-darker animate-pulse" />
            <div className="h-20 w-full bg-surface-darker animate-pulse" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
              <div className="h-56 bg-surface-darker industrial-border animate-pulse" />
              <div className="h-56 bg-surface-darker industrial-border animate-pulse" />
            </div>
          </div>
          <div className="space-y-5">
            <div className="h-80 bg-surface-darker industrial-border animate-pulse" />
            <div className="h-48 bg-surface-darker animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  )
}
