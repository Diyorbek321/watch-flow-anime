
export interface Anime {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  genres: string[];
  releaseYear: number;
  status: 'ongoing' | 'completed';
  studio: string;
  rating: number;
  episodes: Episode[];
  views: number;
}

export interface Episode {
  id: string;
  number: number;
  title: string;
  thumbnail: string;
  duration: number; // in minutes
  videoUrl: string;
  releaseDate: string;
}

export interface Comment {
  id: string;
  userId: string;
  username: string;
  userAvatar: string;
  content: string;
  createdAt: string;
  likes: number;
}

export interface WatchHistoryItem {
  animeId: string;
  episodeId: string;
  watchedAt: string;
  progress: number; // percentage watched
}

export interface UserProfile {
  id: string;
  username: string;
  email: string;
  avatar: string;
  watchHistory: WatchHistoryItem[];
  favorites: string[]; // anime IDs
}
