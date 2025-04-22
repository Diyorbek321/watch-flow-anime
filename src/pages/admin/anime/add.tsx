
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimeForm } from "@/components/admin/anime-form";
import { useToast } from "@/hooks/use-toast";

const AddAnime = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (data: any) => {
    setIsSubmitting(true);
    
    // Simulate API call with a timeout
    setTimeout(() => {
      console.log("Adding new anime:", data);
      
      // In a real app, this would be an API call to save the data
      toast({
        title: "Anime added successfully",
        description: `${data.title} has been added to the library.`,
      });
      
      setIsSubmitting(false);
      navigate("/admin/anime/manage");
    }, 1000);
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Add New Anime</h1>
        <p className="text-muted-foreground mt-1">
          Create a new anime entry in the library
        </p>
      </div>

      <div className="bg-card/50 p-6 rounded-lg border">
        <AnimeForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
      </div>
    </div>
  );
};

export default AddAnime;
