
import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { Anime } from "@/types/anime";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface AnimeCardProps {
  anime: Anime;
  className?: string;
  showRating?: boolean;
  showStatus?: boolean;
  size?: "sm" | "md" | "lg";
}

export function AnimeCard({ 
  anime, 
  className, 
  showRating = true, 
  showStatus = true,
  size = "md"
}: AnimeCardProps) {
  const sizeClasses = {
    sm: "h-48",
    md: "h-64",
    lg: "h-80"
  };
  
  return (
    <Link to={`/anime/${anime.id}`} className="block">
      <div 
        className={cn(
          "anime-card anime-card-hover group relative overflow-hidden",
          sizeClasses[size],
          className
        )}
      >
        <img 
          src={anime.thumbnail} 
          alt={anime.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-4 flex flex-col justify-end">
          <h3 className="font-bold text-white line-clamp-2 text-balance">
            {anime.title}
          </h3>
          
          <div className="flex items-center justify-between mt-2">
            <div className="flex flex-wrap gap-1 mt-1">
              {anime.genres.slice(0, 2).map(genre => (
                <Badge key={genre} variant="outline" className="bg-black/50 text-xs border-primary/20 text-white">
                  {genre}
                </Badge>
              ))}
              {anime.genres.length > 2 && (
                <Badge variant="outline" className="bg-black/50 text-xs border-primary/20 text-white">
                  +{anime.genres.length - 2}
                </Badge>
              )}
            </div>
            
            {showRating && (
              <div className="flex items-center gap-1 bg-black/50 rounded px-1.5 py-0.5">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span className="text-xs font-medium text-white">{anime.rating}</span>
              </div>
            )}
          </div>
          
          {showStatus && (
            <div className="absolute top-3 left-3">
              <Badge className={cn(
                "text-xs",
                anime.status === "ongoing" ? "bg-green-500" : "bg-blue-500"
              )}>
                {anime.status === "ongoing" ? "Ongoing" : "Completed"}
              </Badge>
            </div>
          )}
          
          <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/50 rounded px-1.5 py-0.5">
            <span className="text-xs font-medium text-white">{anime.episodes.length} eps</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
