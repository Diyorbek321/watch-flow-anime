
import { Link } from "react-router-dom";
import { Clock, Calendar } from "lucide-react";
import { Anime, Episode } from "@/types/anime";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";

interface EpisodeListProps {
  anime: Anime;
  currentEpisodeId?: string;
}

export function EpisodeList({ anime, currentEpisodeId }: EpisodeListProps) {
  return (
    <div className="space-y-4">
      <h3 className="font-bold text-lg">Episodes</h3>
      <div className="space-y-3">
        {anime.episodes.map((episode) => (
          <EpisodeItem 
            key={episode.id} 
            episode={episode} 
            animeId={anime.id} 
            isCurrent={currentEpisodeId === episode.id}
          />
        ))}
      </div>
    </div>
  );
}

interface EpisodeItemProps {
  episode: Episode;
  animeId: string;
  isCurrent?: boolean;
}

function EpisodeItem({ episode, animeId, isCurrent }: EpisodeItemProps) {
  return (
    <Link
      to={`/anime/${animeId}/watch/${episode.id}`}
      className={`flex gap-3 rounded-lg border p-3 transition-colors ${
        isCurrent 
          ? "bg-primary/10 border-primary" 
          : "bg-card hover:border-primary/40 hover:bg-primary/5"
      }`}
    >
      <div className="relative h-16 w-28 flex-shrink-0 overflow-hidden rounded-md">
        <img 
          src={episode.thumbnail} 
          alt={`Episode ${episode.number}`} 
          className="h-full w-full object-cover" 
        />
        <Badge 
          className="absolute bottom-1 right-1 bg-black/70" 
          variant="outline"
        >
          {episode.duration} min
        </Badge>
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <Badge variant="outline" className="bg-primary/10 text-xs">
            EP {episode.number}
          </Badge>
          {isCurrent && (
            <Badge className="bg-accent text-xs">
              Currently Watching
            </Badge>
          )}
        </div>
        
        <h4 className="font-medium line-clamp-1 text-sm md:text-base">
          {episode.title}
        </h4>
        
        <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{episode.duration} min</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>{formatDate(episode.releaseDate)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
