import { useSearchParams } from "next/navigation";

const searchParams = useSearchParams();
const genreName = searchParams.get("name");

export default function GenrePage({ params }) {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <h1 className="text-4xl font-bold">
        Genre: {genreName} (ID: {params.type})
      </h1>
    </div>
  );
}
