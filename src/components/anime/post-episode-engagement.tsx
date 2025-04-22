
import { Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Anime } from "@/types/anime";
import { AnimeCard } from "./anime-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface PostEpisodeEngagementProps {
  anime: Anime;
  isLastEpisode?: boolean;
  similarAnimes?: Anime[];
}

export function PostEpisodeEngagement({ 
  anime, 
  isLastEpisode,
  similarAnimes = [] 
}: PostEpisodeEngagementProps) {
  return (
    <div className="space-y-6 mt-8 p-6 border rounded-lg bg-card/50">
      {isLastEpisode && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Series Complete!</h3>
          <p className="text-muted-foreground">
            You've finished watching all episodes of {anime.title}
          </p>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" className="gap-2">
              <Star className="h-4 w-4" />
              Rate Series
            </Button>
          </div>
        </div>
      )}

      {similarAnimes.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Recommended For You</h3>
            <Badge variant="outline">Similar Series</Badge>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {similarAnimes.slice(0, 3).map((anime) => (
              <AnimeCard key={anime.id} anime={anime} size="sm" />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
