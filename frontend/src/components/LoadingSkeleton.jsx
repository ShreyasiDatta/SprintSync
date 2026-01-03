function LoadingSkeleton() {
  return (
    <div className="animate-pulse space-y-3">
      <div className="h-4 bg-gray-300 rounded w-1/3"></div>
      <div className="h-20 bg-gray-200 rounded"></div>
      <div className="h-20 bg-gray-200 rounded"></div>
    </div>
  );
}

export default LoadingSkeleton;
