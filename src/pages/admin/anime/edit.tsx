
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AnimeForm } from "@/components/admin/anime-form";
import { useToast } from "@/hooks/use-toast";
import { getAnimeById } from "@/data/mock-data";
import { Anime } from "@/types/anime";

const EditAnime = () => {
  const { id } = useParams<{ id: string }>();
  const [anime, setAnime] = useState<Anime | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (id) {
      // In a real app, this would be an API call
      const fetchedAnime = getAnimeById(id);
      if (fetchedAnime) {
        setAnime(fetchedAnime);
      }
      setIsLoading(false);
    }
  }, [id]);

  const handleSubmit = (data: any) => {
    setIsSubmitting(true);
    
    // Simulate API call with a timeout
    setTimeout(() => {
      console.log("Updating anime:", data);
      
      // In a real app, this would be an API call to update the data
      toast({
        title: "Anime updated successfully",
        description: `${data.title} has been updated.`,
      });
      
      setIsSubmitting(false);
      navigate("/admin/anime/manage");
    }, 1000);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-6 flex justify-center">
        <div className="animate-pulse text-center">Loading anime data...</div>
      </div>
    );
  }

  if (!anime) {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold">Anime Not Found</h1>
        <p className="text-muted-foreground mt-4">
          The anime you're looking for does not exist or has been removed.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Edit Anime</h1>
        <p className="text-muted-foreground mt-1">
          Update details for {anime.title}
        </p>
      </div>

      <div className="bg-card/50 p-6 rounded-lg border">
        <AnimeForm anime={anime} onSubmit={handleSubmit} isSubmitting={isSubmitting} />
      </div>
    </div>
  );
};

export default EditAnime;
