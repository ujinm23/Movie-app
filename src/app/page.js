import { Footer } from "./_features/Footer";
import { Header } from "./_features/Header";
import { HeroSection } from "./_features/home/HeroSection";
import { MovieList } from "./_features/home/MovieList";


export default function Home() {

 return (
    <div className="gap-[24px] flex flex-col items-center justify-center box-border">
      <Header />
      <HeroSection />
      <MovieList type="upcoming"/>
      <MovieList type="popular"/>
      <MovieList type="top_rated"/>
      <Footer />
    </div>
  );
}
