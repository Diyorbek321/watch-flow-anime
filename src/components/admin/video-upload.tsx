
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/components/ui/sonner";
import { Upload } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface VideoUploadProps {
  episodeId: string;
  onUploadComplete: (path: string) => void;
}

export function VideoUpload({ episodeId, onUploadComplete }: VideoUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (!event.target.files || event.target.files.length === 0) {
        return;
      }

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const filePath = `${episodeId}-${Math.random()}.${fileExt}`;

      setUploading(true);
      setProgress(0);

      const { error: uploadError, data } = await supabase.storage
        .from('videos')
        .upload(filePath, file, {
          upsert: true,
          onUploadProgress: (progress) => {
            const percent = (progress.loaded / progress.total) * 100;
            setProgress(percent);
          },
        });

      if (uploadError) {
        throw uploadError;
      }

      onUploadComplete(filePath);
      toast.success("Video uploaded successfully");
    } catch (error) {
      toast.error("Error uploading video");
      console.error(error);
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          disabled={uploading}
          className="relative"
          onClick={() => document.getElementById('video-upload')?.click()}
        >
          <Upload className="w-4 h-4 mr-2" />
          {uploading ? 'Uploading...' : 'Upload Video'}
        </Button>
        <input
          id="video-upload"
          type="file"
          accept="video/*"
          onChange={handleUpload}
          className="hidden"
        />
      </div>
      
      {uploading && (
        <div className="space-y-2">
          <Progress value={progress} className="w-full" />
          <p className="text-sm text-muted-foreground">
            {Math.round(progress)}% uploaded
          </p>
        </div>
      )}
    </div>
  );
}
