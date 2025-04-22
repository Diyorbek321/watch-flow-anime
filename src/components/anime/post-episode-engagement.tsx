
import { Star, Check, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { Anime } from "@/types/anime";
import { AnimeCard } from "./anime-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

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
  const { toast } = useToast();

  const handleMarkAsComplete = () => {
    // This would typically update user's completed list in a backend
    toast({
      title: "Series marked as completed",
      description: `${anime.title} has been added to your completed list`
    });
  };

  const handleAddToFavorites = () => {
    // This would typically update user's favorites in a backend
    toast({
      title: "Added to favorites",
      description: `${anime.title} has been added to your favorites`
    });
  };

  const handleRate = () => {
    // This would typically open a rating modal
    toast({
      title: "Rating feature coming soon",
      description: "You'll be able to rate series in the next update"
    });
  };

  return (
    <div className="space-y-6 mt-8 p-6 border rounded-lg bg-card/50">
      {isLastEpisode && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-green-500/10 text-green-500 border-green-500/20">
              Series Complete!
            </Badge>
          </div>
          
          <p className="text-muted-foreground">
            Congratulations! You've finished watching all episodes of {anime.title}
          </p>
          
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" className="gap-2" onClick={handleRate}>
              <Star className="h-4 w-4" />
              Rate Series
            </Button>
            <Button variant="outline" className="gap-2" onClick={handleMarkAsComplete}>
              <Check className="h-4 w-4" />
              Mark as Completed
            </Button>
            <Button variant="outline" className="gap-2" onClick={handleAddToFavorites}>
              <Heart className="h-4 w-4" />
              Add to Favorites
            </Button>
          </div>
        </div>
      )}

      {similarAnimes.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Because you watched {anime.title}</h3>
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
