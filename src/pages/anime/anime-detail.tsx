
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { ArrowLeft, Star, Play, Plus, Share, Heart, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EpisodeList } from "@/components/anime/episode-list";
import { getAnimeById } from "@/data/mock-data";
import { Anime } from "@/types/anime";

export default function AnimeDetail() {
  const { id } = useParams<{ id: string }>();
  const [anime, setAnime] = useState<Anime | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      // Simulate API call
      setTimeout(() => {
        const animeData = getAnimeById(id);
        setAnime(animeData || null);
        setLoading(false);
      }, 500);
    }
  }, [id]);

  if (loading) {
    return (
      <div className="anime-container min-h-[80vh] flex items-center justify-center">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  if (!anime) {
    return (
      <div className="anime-container min-h-[80vh] flex items-center justify-center">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold">Anime not found</h2>
          <p className="text-muted-foreground">
            The anime you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/">
            <Button>Return to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-16">
      {/* Hero section with blurred background */}
      <div className="relative h-[50vh] w-full overflow-hidden">
        <img
          src={anime.thumbnail}
          alt={anime.title}
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-background/30" />
        
        <div className="anime-container absolute inset-0 flex flex-col justify-end z-10 pb-8">
          <Link to="/" className="mb-auto">
            <Button variant="ghost" className="gap-1">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
          </Link>
          
          <div className="flex flex-col md:flex-row gap-6 mt-auto">
            <div className="flex-shrink-0">
              <div className="relative w-40 h-60 overflow-hidden rounded-lg shadow-lg border-2 border-white/10">
                <img
                  src={anime.thumbnail}
                  alt={anime.title}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{anime.title}</h1>
              
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{anime.rating}</span>
                  <span className="text-muted-foreground text-sm">/ 5</span>
                </div>
                <Badge variant="outline" className="rounded-full">
                  {anime.releaseYear}
                </Badge>
                <Badge 
                  variant="outline" 
                  className={`rounded-full ${anime.status === "ongoing" ? "bg-green-500/10 text-green-500" : "bg-blue-500/10 text-blue-500"}`}
                >
                  {anime.status === "ongoing" ? "Ongoing" : "Completed"}
                </Badge>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {anime.episodes[0].duration} min/ep
                  </span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {anime.genres.map(genre => (
                  <Badge key={genre} variant="secondary">
                    {genre}
                  </Badge>
                ))}
              </div>
              
              <div className="flex flex-wrap items-center gap-3 mt-6">
                <Link to={`/anime/${anime.id}/watch/${anime.episodes[0].id}`}>
                  <Button size="lg" className="gap-2 rounded-full px-6">
                    <Play className="h-5 w-5" />
                    Watch Now
                  </Button>
                </Link>
                <Button variant="outline" size="icon" className="rounded-full">
                  <Plus className="h-5 w-5" />
                  <span className="sr-only">Add to list</span>
                </Button>
                <Button variant="outline" size="icon" className="rounded-full">
                  <Heart className="h-5 w-5" />
                  <span className="sr-only">Add to favorites</span>
                </Button>
                <Button variant="outline" size="icon" className="rounded-full">
                  <Share className="h-5 w-5" />
                  <span className="sr-only">Share</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content section */}
      <div className="anime-container mt-8">
        <Tabs defaultValue="about">
          <TabsList className="mb-6">
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="episodes">Episodes</TabsTrigger>
            <TabsTrigger value="comments">Comments</TabsTrigger>
            <TabsTrigger value="related">Related</TabsTrigger>
          </TabsList>
          
          <TabsContent value="about" className="space-y-6">
            <div>
              <h3 className="font-bold text-lg mb-2">Synopsis</h3>
              <p className="text-muted-foreground">{anime.description}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-bold text-lg mb-3">Information</h3>
                <div className="space-y-2">
                  <div className="flex">
                    <span className="w-24 text-muted-foreground">Studio</span>
                    <span className="font-medium">{anime.studio}</span>
                  </div>
                  <div className="flex">
                    <span className="w-24 text-muted-foreground">Status</span>
                    <span className="font-medium capitalize">{anime.status}</span>
                  </div>
                  <div className="flex">
                    <span className="w-24 text-muted-foreground">Released</span>
                    <span className="font-medium">{anime.releaseYear}</span>
                  </div>
                  <div className="flex">
                    <span className="w-24 text-muted-foreground">Episodes</span>
                    <span className="font-medium">{anime.episodes.length}</span>
                  </div>
                  <div className="flex">
                    <span className="w-24 text-muted-foreground">Duration</span>
                    <span className="font-medium">{anime.episodes[0].duration} min/ep</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-bold text-lg mb-3">Statistics</h3>
                <div className="space-y-2">
                  <div className="flex">
                    <span className="w-24 text-muted-foreground">Rating</span>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{anime.rating}</span>
                      <span className="text-muted-foreground text-sm">/ 5</span>
                    </div>
                  </div>
                  <div className="flex">
                    <span className="w-24 text-muted-foreground">Views</span>
                    <span className="font-medium">{anime.views.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="episodes">
            <EpisodeList anime={anime} />
          </TabsContent>
          
          <TabsContent value="comments">
            <div className="space-y-4">
              <h3 className="font-bold text-lg">Comments</h3>
              <p className="text-muted-foreground">Login to leave a comment.</p>
              
              <div className="space-y-4 mt-6">
                <div className="text-center py-8">
                  <p className="text-muted-foreground">
                    Be the first to comment on {anime.title}!
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="related">
            <div className="space-y-4">
              <h3 className="font-bold text-lg">Related Anime</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                {/* This would normally fetch related anime from API */}
                <div className="text-center py-8 col-span-full">
                  <p className="text-muted-foreground">
                    No related anime found for {anime.title}.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
