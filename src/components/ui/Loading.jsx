import { motion } from "framer-motion";

const Loading = ({ type = "default" }) => {
  if (type === "dashboard") {
    return (
      <div className="animate-fade-in space-y-6">
        {/* Welcome Message Skeleton */}
        <div className="bg-white rounded-xl shadow-card p-6">
          <div className="shimmer h-8 w-64 rounded-lg mb-2"></div>
          <div className="shimmer h-4 w-96 rounded"></div>
        </div>

        {/* Stats Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="card p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="shimmer h-6 w-32 rounded"></div>
                <div className="shimmer h-8 w-8 rounded-lg"></div>
              </div>
              <div className="shimmer h-10 w-16 rounded mb-2"></div>
              <div className="shimmer h-3 w-24 rounded"></div>
            </div>
          ))}
        </div>

        {/* Recent Activity Skeleton */}
        <div className="card p-6">
          <div className="shimmer h-6 w-40 rounded mb-4"></div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center space-x-3 py-2">
                <div className="shimmer h-10 w-10 rounded-full"></div>
                <div className="flex-1">
                  <div className="shimmer h-4 w-48 rounded mb-1"></div>
                  <div className="shimmer h-3 w-32 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (type === "grid") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="card p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="shimmer h-6 w-32 rounded"></div>
              <div className="shimmer h-6 w-16 rounded-full"></div>
            </div>
            <div className="space-y-2 mb-4">
              <div className="shimmer h-4 w-full rounded"></div>
              <div className="shimmer h-4 w-3/4 rounded"></div>
            </div>
            <div className="flex justify-between items-center">
              <div className="shimmer h-4 w-24 rounded"></div>
              <div className="shimmer h-4 w-20 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === "list") {
    return (
      <div className="space-y-4 animate-fade-in">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="card p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="shimmer h-4 w-4 rounded"></div>
                <div className="shimmer h-5 w-48 rounded"></div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="shimmer h-6 w-20 rounded-full"></div>
                <div className="shimmer h-4 w-24 rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-12">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="h-8 w-8 border-4 border-primary-200 border-t-primary-600 rounded-full"
      />
    </div>
  );
};

export default Loading;