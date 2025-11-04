import { Header } from "../_features/Header";
import { Footer } from "../_features/Footer";

export function MovieDetailLayout({ children }) {
  return (
    <div className="flex items-center gap-[24px] flex-col">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
