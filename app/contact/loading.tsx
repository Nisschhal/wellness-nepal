export default function ContactLoading() {
  return (
    <div className="bg-surface min-h-screen pt-24 md:pt-28 pb-16 md:pb-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] gap-8 lg:gap-12">
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="h-4 w-36 bg-surface-darker animate-pulse" />
              <div className="h-12 w-72 bg-surface-darker animate-pulse" />
              <div className="h-5 w-full max-w-md bg-surface-darker animate-pulse" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="h-20 bg-surface-darker industrial-border animate-pulse" />
              <div className="h-20 bg-surface-darker industrial-border animate-pulse" />
            </div>
            <div className="h-80 bg-surface-darker industrial-border animate-pulse" />
          </div>
          <div className="h-[460px] bg-surface-darker industrial-border animate-pulse" />
        </div>
      </div>
    </div>
  )
}
