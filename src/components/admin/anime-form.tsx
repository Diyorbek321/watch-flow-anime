
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Anime } from "@/types/anime";

const animeFormSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  thumbnail: z.string().url({ message: "Please enter a valid URL" }),
  genres: z.string().min(1, { message: "At least one genre is required" }),
  releaseYear: z.coerce.number().int().min(1900).max(new Date().getFullYear() + 1),
  status: z.enum(["ongoing", "completed"]),
  studio: z.string().min(1, { message: "Studio is required" }),
  rating: z.coerce.number().min(0).max(10),
});

type AnimeFormData = z.infer<typeof animeFormSchema>;

interface AnimeFormProps {
  anime?: Anime;
  onSubmit: (data: AnimeFormData) => void;
  isSubmitting: boolean;
}

export function AnimeForm({ anime, onSubmit, isSubmitting }: AnimeFormProps) {
  // Transform the anime data for the form
  const defaultValues: Partial<AnimeFormData> = anime
    ? {
        ...anime,
        genres: anime.genres.join(", "),
      }
    : {
        title: "",
        description: "",
        thumbnail: "",
        genres: "",
        releaseYear: new Date().getFullYear(),
        status: "ongoing",
        studio: "",
        rating: 0,
      };

  const form = useForm<AnimeFormData>({
    resolver: zodResolver(animeFormSchema),
    defaultValues,
  });

  const handleSubmit = (data: AnimeFormData) => {
    // Process the genres from comma-separated string to array
    const processedData = {
      ...data,
      genres: data.genres.split(",").map((genre) => genre.trim()),
    };
    onSubmit(processedData as any);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Anime title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="studio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Studio</FormLabel>
                <FormControl>
                  <Input placeholder="Studio name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="releaseYear"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Release Year</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Release year"
                    min={1900}
                    max={new Date().getFullYear() + 1}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <FormControl>
                  <select
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2"
                    {...field}
                  >
                    <option value="ongoing">Ongoing</option>
                    <option value="completed">Completed</option>
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="rating"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rating (0-10)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Rating"
                    min={0}
                    max={10}
                    step={0.1}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="genres"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Genres</FormLabel>
                <FormControl>
                  <Input placeholder="Action, Adventure, Comedy..." {...field} />
                </FormControl>
                <FormDescription>
                  Separate genres with commas
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="thumbnail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Thumbnail URL</FormLabel>
                <FormControl>
                  <Input placeholder="https://example.com/image.jpg" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="col-span-1 md:col-span-2">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter anime description..."
                      className="min-h-32"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => window.history.back()}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : anime ? "Update Anime" : "Add Anime"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
