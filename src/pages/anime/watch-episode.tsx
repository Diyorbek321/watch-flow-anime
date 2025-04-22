import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ListVideo } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VideoPlayer } from "@/components/anime/video-player";
import { EpisodeList } from "@/components/anime/episode-list";
import { getAnimeById, getEpisodeById, mockAnimes } from "@/data/mock-data";
import { Anime, Episode } from "@/types/anime";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { PostEpisodeEngagement } from "@/components/anime/post-episode-engagement";
import { supabase } from "@/lib/supabase";

export default function WatchEpisode() {
  const { animeId, episodeId } = useParams<{ animeId: string, episodeId: string }>();
  const [anime, setAnime] = useState<Anime | null>(null);
  const [episode, setEpisode] = useState<Episode | null>(null);
  const [loading, setLoading] = useState(true);
  const [showEpisodes, setShowEpisodes] = useState(false);

  useEffect(() => {
    if (animeId && episodeId) {
      // Simulate API call
      setTimeout(() => {
        const animeData = getAnimeById(animeId);
        const episodeData = animeData ? getEpisodeById(animeId, episodeId) : null;
        
        setAnime(animeData || null);
        setEpisode(episodeData || null);
        setLoading(false);
      }, 500);
    }
  }, [animeId, episodeId]);

  const getVideoUrl = async (path: string) => {
    if (!path) return null;
    
    const { data: { publicUrl } } = supabase
      .storage
      .from('videos')
      .getPublicUrl(path);
      
    return publicUrl;
  };

  useEffect(() => {
    if (episode?.video_path) {
      getVideoUrl(episode.video_path).then(url => {
        if (url) {
          episode.videoUrl = url;
        }
      });
    }
  }, [episode]);

  const currentEpisodeIndex = episode 
    ? anime?.episodes.findIndex(ep => ep.id === episode.id) || 0 
    : 0;
    
  const previousEpisode = anime?.episodes[currentEpisodeIndex - 1];
  const nextEpisode = anime?.episodes[currentEpisodeIndex + 1];

  if (loading) {
    return (
      <div className="anime-container min-h-[80vh] flex items-center justify-center">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  if (!anime || !episode) {
    return (
      <div className="anime-container min-h-[80vh] flex items-center justify-center">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold">Episode not found</h2>
          <p className="text-muted-foreground">
            The episode you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/">
            <Button>Return to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Improved similar anime logic based on genres and studio
  const similarAnimes = anime ? 
    mockAnimes.filter(a => 
      a.id !== anime.id && 
      (a.genres.some(g => anime.genres.includes(g)) || a.studio === anime.studio)
    ).slice(0, 3) : 
    [];

  return (
    <div className="min-h-screen">
      <div className="bg-card/50">
        <div className="anime-container pt-6">
          {/* Navigation breadcrumb */}
          <div className="flex items-center gap-2 mb-4 text-sm">
            <Link to="/" className="text-muted-foreground hover:text-foreground">
              Home
            </Link>
            <span className="text-muted-foreground">/</span>
            <Link to={`/anime/${anime.id}`} className="text-muted-foreground hover:text-foreground">
              {anime.title}
            </Link>
            <span className="text-muted-foreground">/</span>
            <span>Episode {episode.number}</span>
          </div>
          
          {/* Video player */}
          <VideoPlayer 
            src={episode.videoUrl} 
            poster={episode.thumbnail}
            title={`${anime.title} - Episode ${episode.number}: ${episode.title}`}
          />
          
          {/* Episode navigation */}
          <div className="flex justify-between items-center mt-6 mb-6">
            <div className="flex-1">
              {previousEpisode ? (
                <Link to={`/anime/${anime.id}/watch/${previousEpisode.id}`}>
                  <Button variant="outline" className="gap-2">
                    <ChevronLeft className="h-4 w-4" />
                    Previous Episode
                  </Button>
                </Link>
              ) : (
                <Button variant="outline" disabled className="gap-2">
                  <ChevronLeft className="h-4 w-4" />
                  Previous Episode
                </Button>
              )}
            </div>
            
            <div className="flex-shrink-0 mx-2">
              <Button 
                variant="outline" 
                onClick={() => setShowEpisodes(!showEpisodes)}
                className="gap-2"
              >
                <ListVideo className="h-4 w-4" />
                {showEpisodes ? "Hide Episodes" : "All Episodes"}
              </Button>
            </div>
            
            <div className="flex-1 flex justify-end">
              {nextEpisode ? (
                <Link to={`/anime/${anime.id}/watch/${nextEpisode.id}`}>
                  <Button variant="outline" className="gap-2">
                    Next Episode
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
              ) : (
                <Button variant="outline" disabled className="gap-2">
                  Next Episode
                  <ChevronRight className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className="anime-container py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold flex items-center gap-2">
                  {anime.title}
                  <Badge variant="outline" className="text-xs">
                    EP {episode.number}
                  </Badge>
                </h1>
                <h2 className="text-xl font-medium mt-1">{episode.title}</h2>
              </div>
              
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="outline" className="rounded-full">
                  {anime.releaseYear}
                </Badge>
                <Badge variant="outline" className="rounded-full">
                  {episode.duration} min
                </Badge>
                <div className="flex items-center gap-2">
                  {anime.genres.map(genre => (
                    <Badge key={genre} variant="secondary">
                      {genre}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">About this anime</h3>
                <p className="text-muted-foreground">{anime.description}</p>
              </div>
              
              <div>
                <h3 className="font-medium mb-4">Comments</h3>
                <div className="text-center py-6 border rounded-lg bg-card/50">
                  <p className="text-muted-foreground">Login to leave a comment.</p>
                </div>
              </div>
              
              <PostEpisodeEngagement
                anime={anime}
                isLastEpisode={!nextEpisode}
                similarAnimes={similarAnimes}
              />
            </div>
          </div>
          
          <div>
            <div className={showEpisodes ? "block" : "hidden lg:block"}>
              <div className="p-4 border rounded-lg bg-card/50 mb-6 lg:sticky lg:top-20">
                <ScrollArea className="h-[60vh]">
                  <EpisodeList anime={anime} currentEpisodeId={episode.id} />
                </ScrollArea>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
