// app/(main)/dashboard/loading.tsx
export default function Loading() {
  console.log('Loading component rendered');
  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-white">
      <span className="text-xl font-medium animate-pulse">
        Loading dashboard...
      </span>
    </div>
  );
}