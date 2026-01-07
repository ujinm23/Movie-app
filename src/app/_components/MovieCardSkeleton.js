export const MovieCardSkeleton = ({ size = "large" }) => {
  const sizes = {
    small: { card: "w-[165px] h-[331px]", image: "w-[165px] h-[244px]", content: "h-[87px]" },
    medium: { card: "w-[190px] h-[372px]", image: "w-[190px] h-[281px]", content: "h-[87px]" },
    large: { card: "w-[229.73px] h-[439px]", image: "w-[229.73px] h-[340px]", content: "h-[95px]" },
  };
  const currentSize = sizes[size];

  return (
    <div className={`${currentSize.card} bg-gray-200 dark:bg-gray-700 rounded-lg flex flex-col justify-between animate-pulse`}>
      <div className={`${currentSize.image} bg-gray-300 dark:bg-gray-600 rounded-t-lg`} />
      <div className={`${currentSize.content} p-2 flex flex-col gap-2`}>
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2" />
        <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-3/4" />
      </div>
    </div>
  );
};
