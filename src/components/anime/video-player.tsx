import { useState, useRef, useEffect } from "react";
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Minimize,
  SkipBack,
  SkipForward,
  Settings
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";

interface VideoPlayerProps {
  src: string;
  poster?: string;
  title?: string;
  onTimeUpdate?: (currentTime: number) => void;
  className?: string;
}

export function VideoPlayer({ 
  src, 
  poster, 
  title,
  onTimeUpdate,
  className 
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isBuffering, setIsBuffering] = useState(false);
  
  const controlsTimerRef = useRef<ReturnType<typeof setTimeout>>();
  
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      if (onTimeUpdate) onTimeUpdate(video.currentTime);
    };
    const handleLoadedMetadata = () => setDuration(video.duration);
    const handleVolumeChange = () => setVolume(video.volume);
    const handleWaiting = () => setIsBuffering(true);
    const handlePlaying = () => setIsBuffering(false);
    
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('volumechange', handleVolumeChange);
    video.addEventListener('waiting', handleWaiting);
    video.addEventListener('playing', handlePlaying);
    
    return () => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('volumechange', handleVolumeChange);
      video.removeEventListener('waiting', handleWaiting);
      video.removeEventListener('playing', handlePlaying);
    };
  }, [onTimeUpdate]);
  
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);
  
  useEffect(() => {
    const resetControlsTimer = () => {
      if (controlsTimerRef.current) {
        clearTimeout(controlsTimerRef.current);
      }
      
      setShowControls(true);
      
      controlsTimerRef.current = setTimeout(() => {
        if (isPlaying) {
          setShowControls(false);
        }
      }, 3000);
    };
    
    resetControlsTimer();
    
    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', resetControlsTimer);
      container.addEventListener('mousedown', resetControlsTimer);
      container.addEventListener('touchstart', resetControlsTimer);
    }
    
    return () => {
      if (controlsTimerRef.current) {
        clearTimeout(controlsTimerRef.current);
      }
      
      if (container) {
        container.removeEventListener('mousemove', resetControlsTimer);
        container.removeEventListener('mousedown', resetControlsTimer);
        container.removeEventListener('touchstart', resetControlsTimer);
      }
    };
  }, [isPlaying]);
  
  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  };
  
  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };
  
  const handleVolumeChange = (value: number[]) => {
    const video = videoRef.current;
    if (!video) return;
    
    const newVolume = value[0];
    video.volume = newVolume;
    video.muted = newVolume === 0;
    setIsMuted(newVolume === 0);
  };
  
  const handleSeek = (value: number[]) => {
    const video = videoRef.current;
    if (!video) return;
    
    video.currentTime = value[0];
    setCurrentTime(value[0]);
  };
  
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };
  
  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  
  const skip = (seconds: number) => {
    const video = videoRef.current;
    if (!video) return;
    
    video.currentTime += seconds;
  };
  
  const handleQualityChange = (quality: string) => {
    console.log('Quality changed to:', quality);
  };
  
  return (
    <div 
      ref={containerRef}
      className={cn(
        "relative overflow-hidden rounded-lg bg-black",
        isFullscreen ? "fixed inset-0 z-50" : "w-full aspect-video",
        className
      )}
      onDoubleClick={toggleFullscreen}
    >
      <video
        ref={videoRef}
        className="w-full h-full cursor-pointer"
        src={src}
        poster={poster}
        onClick={togglePlay}
        playsInline
      />
      
      {isBuffering && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      )}
      
      <div 
        className={cn(
          "absolute inset-0 transition-opacity duration-300",
          showControls ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
        
        <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between z-10">
          {title && (
            <h3 className="font-medium text-white text-shadow drop-shadow-lg">{title}</h3>
          )}
          <div className="flex items-center gap-2">
            <button 
              className="p-1 rounded-full bg-black/30 backdrop-blur-sm text-white hover:bg-black/50"
              onClick={() => {}}
            >
              <Settings className="h-5 w-5" />
              <span className="sr-only">Settings</span>
            </button>
          </div>
        </div>
        
        <div className="absolute inset-0 flex items-center justify-center">
          <button
            className={cn(
              "p-4 rounded-full bg-primary/80 text-white transform transition-transform",
              isPlaying ? "scale-0" : "scale-100"
            )}
            onClick={togglePlay}
          >
            <Play className="h-8 w-8 fill-white" />
            <span className="sr-only">Play</span>
          </button>
        </div>
        
        <div className="absolute bottom-16 right-4">
          <div className="flex items-center gap-2">
            <button 
              className="p-1 rounded-full bg-black/30 backdrop-blur-sm text-white hover:bg-black/50"
              onClick={() => handleQualityChange('720p')}
            >
              <span className="text-sm px-2">720p</span>
            </button>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
          <div className="mb-4 px-1">
            <Slider
              value={[currentTime]}
              min={0}
              max={duration || 100}
              step={0.1}
              onValueChange={handleSeek}
              className="cursor-pointer"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                className="p-1 rounded-full hover:bg-white/10"
                onClick={togglePlay}
              >
                {isPlaying ? (
                  <Pause className="h-5 w-5 text-white" />
                ) : (
                  <Play className="h-5 w-5 text-white" />
                )}
                <span className="sr-only">{isPlaying ? 'Pause' : 'Play'}</span>
              </button>
              
              <button
                className="p-1 rounded-full hover:bg-white/10"
                onClick={() => skip(-10)}
              >
                <SkipBack className="h-5 w-5 text-white" />
                <span className="sr-only">Skip back 10s</span>
              </button>
              
              <button
                className="p-1 rounded-full hover:bg-white/10"
                onClick={() => skip(10)}
              >
                <SkipForward className="h-5 w-5 text-white" />
                <span className="sr-only">Skip forward 10s</span>
              </button>
              
              <div className="flex items-center gap-2">
                <button
                  className="p-1 rounded-full hover:bg-white/10"
                  onClick={toggleMute}
                >
                  {isMuted ? (
                    <VolumeX className="h-5 w-5 text-white" />
                  ) : (
                    <Volume2 className="h-5 w-5 text-white" />
                  )}
                  <span className="sr-only">{isMuted ? 'Unmute' : 'Mute'}</span>
                </button>
                
                <div className="hidden sm:block w-20">
                  <Slider
                    value={[isMuted ? 0 : volume]}
                    min={0}
                    max={1}
                    step={0.1}
                    onValueChange={handleVolumeChange}
                    className="cursor-pointer"
                  />
                </div>
              </div>
              
              <div className="text-xs text-white">
                <span>{formatTime(currentTime)}</span>
                <span className="mx-1">/</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                className="p-1 rounded-full hover:bg-white/10"
                onClick={toggleFullscreen}
              >
                {isFullscreen ? (
                  <Minimize className="h-5 w-5 text-white" />
                ) : (
                  <Maximize className="h-5 w-5 text-white" />
                )}
                <span className="sr-only">
                  {isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
