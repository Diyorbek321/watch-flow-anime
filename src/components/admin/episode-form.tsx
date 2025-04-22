
import { VideoUpload } from "./video-upload";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";

interface EpisodeFormProps {
  animeId: string;
  onSuccess?: () => void;
}

export function EpisodeForm({ animeId, onSuccess }: EpisodeFormProps) {
  const [title, setTitle] = useState("");
  const [episodeNumber, setEpisodeNumber] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('episodes')
        .insert({
          anime_id: animeId,
          title,
          episode_number: parseInt(episodeNumber),
          description,
        });

      if (error) throw error;

      toast.success("Episode added successfully");
      onSuccess?.();
      setTitle("");
      setEpisodeNumber("");
      setDescription("");
    } catch (error) {
      toast.error("Error adding episode");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Input
          placeholder="Episode Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      
      <div>
        <Input
          type="number"
          placeholder="Episode Number"
          value={episodeNumber}
          onChange={(e) => setEpisodeNumber(e.target.value)}
          required
        />
      </div>
      
      <div>
        <Input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      
      <Button type="submit" disabled={loading}>
        {loading ? "Adding Episode..." : "Add Episode"}
      </Button>
    </form>
  );
}
