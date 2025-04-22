
import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimeCard } from "@/components/anime/anime-card";
import { Anime } from "@/types/anime";
import { cn } from "@/lib/utils";

interface AnimeCarouselProps {
  title: string;
  animes: Anime[];
  className?: string;
}

export function AnimeCarousel({
  title,
  animes,
  className,
}: AnimeCarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollButtons = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10); // 10px buffer
    }
  };

  useEffect(() => {
    updateScrollButtons();
    window.addEventListener("resize", updateScrollButtons);
    return () => window.removeEventListener("resize", updateScrollButtons);
  }, [animes]);

  const scroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.clientWidth * 0.8;
      const newScrollLeft = direction === "left"
        ? carouselRef.current.scrollLeft - scrollAmount
        : carouselRef.current.scrollLeft + scrollAmount;
      
      carouselRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth"
      });
      
      // Update buttons after scroll animation completes
      setTimeout(updateScrollButtons, 300);
    }
  };

  return (
    <section className={cn("relative", className)}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">{title}</h2>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full"
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Scroll left</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full"
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Scroll right</span>
          </Button>
        </div>
      </div>

      <div 
        ref={carouselRef}
        className="grid grid-flow-col auto-cols-[280px] gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-4"
        onScroll={updateScrollButtons}
      >
        {animes.map((anime) => (
          <div key={anime.id} className="snap-start">
            <AnimeCard anime={anime} size="md" />
          </div>
        ))}
      </div>
    </section>
  );
}
