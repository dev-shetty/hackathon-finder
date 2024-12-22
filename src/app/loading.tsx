export default function Loading() {
  return (
    <div className="container mx-auto my-8 flex flex-col gap-4">
      <div className="flex flex-col items-center md:items-start gap-4 mb-6">
        <div className="flex flex-row w-full items-center gap-4">
          <div className="w-full h-10 bg-gray-200 animate-pulse rounded" />
          <div className="flex items-center gap-2">
            <div className="w-24 h-6 bg-gray-200 animate-pulse rounded" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-24 h-10 bg-gray-200 animate-pulse rounded" />
          <div className="w-32 h-10 bg-gray-200 animate-pulse rounded" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="rounded-lg border bg-card text-card-foreground shadow-sm"
          >
            <div className="p-6">
              <div className="relative w-full h-48 mb-4 bg-gray-200 animate-pulse rounded" />
              <div className="space-y-3">
                <div className="w-3/4 h-5 bg-gray-200 animate-pulse rounded" />
                <div className="w-1/2 h-4 bg-gray-200 animate-pulse rounded" />
                <div className="space-y-2">
                  <div className="w-1/3 h-4 bg-gray-200 animate-pulse rounded" />
                  <div className="w-1/2 h-4 bg-gray-200 animate-pulse rounded" />
                  <div className="w-1/4 h-4 bg-gray-200 animate-pulse rounded" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
