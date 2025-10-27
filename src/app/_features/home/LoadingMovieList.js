export const LoadingMovieList = () => {
 
  const placeholders = Array.from({ length: 10 });

  return (
    <div className="w-[1277px] h-[978px] flex flex-col justify-between animate-pulse">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold inter text-[24px] bg-[#F4F4F5] w-[200px] h-[28px]" />
        <div className="bg-[#F4F4F5] w-[80px] h-[24px]" />
      </div>

      <div className="w-[1277px] h-[910px] overflow-hidden">
        <div className="grid grid-rows-2 grid-cols-5 gap-[32px] top-[191px] left-[52px]">
          {placeholders.map((_, i) => (
            <div
              key={i}
              className="bg-[#F4F4F5] w-[220px] h-[330px]"
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};
