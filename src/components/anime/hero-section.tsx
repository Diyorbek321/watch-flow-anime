
import { Link } from "react-router-dom";
import { Play, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Anime } from "@/types/anime";

interface HeroSectionProps {
  anime: Anime;
}

export function HeroSection({ anime }: HeroSectionProps) {
  return (
    <section className="relative h-[70vh] w-full overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img 
          src={anime.thumbnail} 
          alt={anime.title}
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
      </div>
      
      {/* Content */}
      <div className="anime-container h-full flex flex-col justify-end pb-12 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">{anime.title}</h1>
          
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <Badge variant="outline" className="rounded-full">
              {anime.releaseYear}
            </Badge>
            <Badge variant="outline" className="rounded-full bg-primary/10">
              {anime.status === "ongoing" ? "Ongoing" : "Completed"}
            </Badge>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {anime.episodes[0].duration} min/ep
              </span>
            </div>
            <span className="text-sm text-muted-foreground">
              {anime.episodes.length} episodes
            </span>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {anime.genres.map(genre => (
              <Badge key={genre} variant="secondary">
                {genre}
              </Badge>
            ))}
          </div>
          
          <p className="text-base text-muted-foreground mb-6 max-w-2xl line-clamp-3 md:line-clamp-none">
            {anime.description}
          </p>
          
          <div className="flex flex-wrap items-center gap-4">
            <Link to={`/anime/${anime.id}/watch/${anime.episodes[0].id}`}>
              <Button size="lg" className="gap-2 rounded-full px-6">
                <Play className="h-5 w-5" />
                Watch Now
              </Button>
            </Link>
            <Link to={`/anime/${anime.id}`}>
              <Button variant="outline" size="lg" className="rounded-full px-6">
                Details
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
