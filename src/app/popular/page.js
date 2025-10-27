import { Header } from "../_features/Header";
import { Footer } from "../_features/Footer";
import { MovieList } from "../_features/home/MovieList";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function PopularMovie() {
  return (
    <div className="flex flex-col items-center justify-center gap-[52px] box-border">
      <Header />
      <MovieList type="popular" />

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      
      <Footer />
    </div>
  );
}
