
import { useState, useEffect } from "react";
import { HeroSection } from "@/components/anime/hero-section";
import { AnimeCarousel } from "@/components/anime/anime-carousel";
import { 
  mockAnimes, 
  trending, 
  recommended, 
  recentlyAdded, 
  mostViewed 
} from "@/data/mock-data";

export default function Index() {
  const [featuredAnime, setFeaturedAnime] = useState(mockAnimes[0]);
  
  // Simulate changing the featured anime every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * trending.length);
      setFeaturedAnime(trending[randomIndex]);
    }, 15000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="min-h-screen">
      <HeroSection anime={featuredAnime} />
      
      <div className="anime-container space-y-12 py-10">
        <AnimeCarousel title="Trending Now" animes={trending} />
        <AnimeCarousel title="Recommended For You" animes={recommended} />
        <AnimeCarousel title="Recently Added" animes={recentlyAdded} />
        <AnimeCarousel title="Most Viewed" animes={mostViewed} />
      </div>
    </div>
  );
}
