export const HeroSkeletonCard = () => {
  return (
    <div className="w-[1440px] h-[600px] bg-gray-300 dark:bg-gray-700 rounded-lg animate-pulse relative">
      {/* Left info panel */}
      <div className="absolute top-[144px] left-[140px] flex flex-col gap-4 text-white w-[404px]">
        {/* Now Playing */}
        <div className="h-4 bg-gray-400 dark:bg-gray-600 w-24 rounded" />
        {/* Title */}
        <div className="h-10 bg-gray-400 dark:bg-gray-600 w-full rounded" />
        {/* Rating */}
        <div className="flex items-center gap-2 mt-2">
          <div className="w-5 h-5 bg-gray-400 dark:bg-gray-600 rounded-full" />
          <div className="h-4 bg-gray-400 dark:bg-gray-600 w-8 rounded" />
          <div className="h-4 bg-gray-400 dark:bg-gray-600 w-6 rounded" />
        </div>
        {/* Overview */}
        <div className="h-20 bg-gray-400 dark:bg-gray-600 w-[302px] rounded mt-2" />
        {/* Watch Trailer Button */}
        <div className="h-10 w-[145px] bg-gray-400 dark:bg-gray-600 rounded-md mt-2" />
      </div>
    </div>
  );
};
