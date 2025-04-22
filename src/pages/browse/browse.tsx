
import { useState } from "react";
import { Search, Filter, ChevronDown } from "lucide-react";
import { AnimeCard } from "@/components/anime/anime-card";
import { mockAnimes } from "@/data/mock-data";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuCheckboxItem, 
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

// Extract all unique genres
const allGenres = Array.from(
  new Set(mockAnimes.flatMap(anime => anime.genres))
).sort();

// Extract all statuses
const allStatuses = ["ongoing", "completed"];

// Extract release years in descending order
const allYears = Array.from(
  new Set(mockAnimes.map(anime => anime.releaseYear))
).sort((a, b) => b - a);

export default function Browse() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedYears, setSelectedYears] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState<"latest" | "oldest" | "title" | "rating">("latest");
  
  // Filter animes based on search query and filters
  const filteredAnimes = mockAnimes.filter(anime => {
    // Search query filter
    const matchesSearch = searchQuery === "" || 
      anime.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      anime.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Genre filter
    const matchesGenres = selectedGenres.length === 0 || 
      selectedGenres.some(genre => anime.genres.includes(genre));
    
    // Status filter
    const matchesStatus = selectedStatuses.length === 0 || 
      selectedStatuses.includes(anime.status);
    
    // Year filter
    const matchesYear = selectedYears.length === 0 || 
      selectedYears.includes(anime.releaseYear);
    
    return matchesSearch && matchesGenres && matchesStatus && matchesYear;
  });
  
  // Sort animes
  const sortedAnimes = [...filteredAnimes].sort((a, b) => {
    if (sortBy === "latest") {
      return b.releaseYear - a.releaseYear;
    } else if (sortBy === "oldest") {
      return a.releaseYear - b.releaseYear;
    } else if (sortBy === "title") {
      return a.title.localeCompare(b.title);
    } else if (sortBy === "rating") {
      return b.rating - a.rating;
    }
    return 0;
  });
  
  return (
    <div className="min-h-screen">
      <div className="border-b bg-card/20">
        <div className="anime-container py-8">
          <h1 className="text-3xl font-bold mb-2">Browse Anime</h1>
          <p className="text-muted-foreground mb-6">
            Discover and filter through our extensive anime collection
          </p>
          
          <div className="relative mb-6">
            <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search anime by title or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 py-6 text-lg bg-card/50"
            />
          </div>
          
          <div className="flex flex-wrap gap-4">
            {/* Genre Filter */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Filter className="h-4 w-4" />
                  Genres
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                {allGenres.map(genre => (
                  <DropdownMenuCheckboxItem
                    key={genre}
                    checked={selectedGenres.includes(genre)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedGenres([...selectedGenres, genre]);
                      } else {
                        setSelectedGenres(selectedGenres.filter(g => g !== genre));
                      }
                    }}
                  >
                    {genre}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            {/* Status Filter */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  Status
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {allStatuses.map(status => (
                  <DropdownMenuCheckboxItem
                    key={status}
                    checked={selectedStatuses.includes(status)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedStatuses([...selectedStatuses, status]);
                      } else {
                        setSelectedStatuses(selectedStatuses.filter(s => s !== status));
                      }
                    }}
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            {/* Year Filter */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  Year
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-40">
                {allYears.map(year => (
                  <DropdownMenuCheckboxItem
                    key={year}
                    checked={selectedYears.includes(year)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedYears([...selectedYears, year]);
                      } else {
                        setSelectedYears(selectedYears.filter(y => y !== year));
                      }
                    }}
                  >
                    {year}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            {/* Sort Order */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2 ml-auto">
                  Sort: {sortBy.charAt(0).toUpperCase() + sortBy.slice(1)}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuCheckboxItem
                  checked={sortBy === "latest"}
                  onCheckedChange={() => setSortBy("latest")}
                >
                  Latest First
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={sortBy === "oldest"}
                  onCheckedChange={() => setSortBy("oldest")}
                >
                  Oldest First
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={sortBy === "title"}
                  onCheckedChange={() => setSortBy("title")}
                >
                  Alphabetical
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={sortBy === "rating"}
                  onCheckedChange={() => setSortBy("rating")}
                >
                  Rating
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          {/* Active filters */}
          {(selectedGenres.length > 0 || selectedStatuses.length > 0 || selectedYears.length > 0) && (
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="text-sm text-muted-foreground">Active filters:</span>
              
              {selectedGenres.map(genre => (
                <Badge 
                  key={genre}
                  variant="secondary"
                  className="flex items-center gap-1"
                >
                  {genre}
                  <button
                    onClick={() => setSelectedGenres(selectedGenres.filter(g => g !== genre))}
                    className="ml-1 hover:text-white/70"
                  >
                    ×
                  </button>
                </Badge>
              ))}
              
              {selectedStatuses.map(status => (
                <Badge 
                  key={status} 
                  variant="secondary"
                  className="flex items-center gap-1"
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                  <button
                    onClick={() => setSelectedStatuses(selectedStatuses.filter(s => s !== status))}
                    className="ml-1 hover:text-white/70"
                  >
                    ×
                  </button>
                </Badge>
              ))}
              
              {selectedYears.map(year => (
                <Badge 
                  key={year} 
                  variant="secondary"
                  className="flex items-center gap-1"
                >
                  {year}
                  <button
                    onClick={() => setSelectedYears(selectedYears.filter(y => y !== year))}
                    className="ml-1 hover:text-white/70"
                  >
                    ×
                  </button>
                </Badge>
              ))}
              
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => {
                  setSelectedGenres([]);
                  setSelectedStatuses([]);
                  setSelectedYears([]);
                }}
                className="text-sm"
              >
                Clear all
              </Button>
            </div>
          )}
        </div>
      </div>
      
      <div className="anime-container py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-medium">
            {sortedAnimes.length} {sortedAnimes.length === 1 ? "result" : "results"}
          </h2>
        </div>
        
        {sortedAnimes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {sortedAnimes.map(anime => (
              <AnimeCard key={anime.id} anime={anime} size="lg" />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h3 className="text-xl font-medium mb-2">No results found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filters to find what you're looking for.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
