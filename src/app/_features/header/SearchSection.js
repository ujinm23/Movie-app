import { SearchResults } from "@/app/_components/ui/SearchResults";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState, useEffect } from "react";

export const SearchSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setisSearchOpen] = useState(false);

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 " />
      <input
        placeholder="Search..."
        className="pl-9 w-64"
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          setisSearchOpen(e.target.value.length > 0);
        }}
        onFocus={() => {
          if (searchQuery.length > 0) setisSearchOpen(true);
        }}
      />
      <SearchResults
        query={searchQuery}
        isOpen={isSearchOpen}
        onClose={() => setisSearchOpen(false)}
      />
    </div>
  );
};
