export default function LoadingScreen() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-9 h-9 border-[2.5px] border-gray-200 border-t-gray-800 rounded-full animate-spin" />
        <p className="text-sm text-gray-400">Đang tải...</p>
      </div>
  </div>
)};