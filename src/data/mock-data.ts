
import { Anime } from "@/types/anime";

export const mockAnimes: Anime[] = [
  {
    id: "1",
    title: "Demon Slayer",
    description: "A young boy hunts down demons who killed his family.",
    thumbnail: "https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=1854&auto=format&fit=crop",
    genres: ["Action", "Fantasy", "Adventure"],
    releaseYear: 2019,
    status: "ongoing",
    studio: "Ufotable",
    rating: 4.8,
    views: 15000000,
    episodes: [
      {
        id: "1-1",
        number: 1,
        title: "Cruelty",
        thumbnail: "https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=1854&auto=format&fit=crop",
        duration: 24,
        videoUrl: "https://www.youtube.com/embed/VQGCKyvzIM4",
        releaseDate: "2019-04-06",
      },
      {
        id: "1-2",
        number: 2,
        title: "Trainer Sakonji Urokodaki",
        thumbnail: "https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=1854&auto=format&fit=crop",
        duration: 24,
        videoUrl: "https://www.youtube.com/embed/VQGCKyvzIM4",
        releaseDate: "2019-04-13",
      },
      {
        id: "1-3",
        number: 3,
        title: "Sabito and Makomo",
        thumbnail: "https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=1854&auto=format&fit=crop",
        duration: 24,
        videoUrl: "https://www.youtube.com/embed/VQGCKyvzIM4",
        releaseDate: "2019-04-20",
      },
    ],
  },
  {
    id: "2",
    title: "Attack on Titan",
    description: "Humanity fights against giant humanoids called Titans.",
    thumbnail: "https://images.unsplash.com/photo-1541562232579-512a21360020?q=80&w=1974&auto=format&fit=crop",
    genres: ["Action", "Dark Fantasy", "Post-Apocalyptic"],
    releaseYear: 2013,
    status: "completed",
    studio: "MAPPA",
    rating: 4.9,
    views: 20000000,
    episodes: [
      {
        id: "2-1",
        number: 1,
        title: "To You, 2,000 Years From Now",
        thumbnail: "https://images.unsplash.com/photo-1541562232579-512a21360020?q=80&w=1974&auto=format&fit=crop",
        duration: 24,
        videoUrl: "https://www.youtube.com/embed/VQGCKyvzIM4",
        releaseDate: "2013-04-07",
      },
      {
        id: "2-2",
        number: 2,
        title: "That Day",
        thumbnail: "https://images.unsplash.com/photo-1541562232579-512a21360020?q=80&w=1974&auto=format&fit=crop",
        duration: 24,
        videoUrl: "https://www.youtube.com/embed/VQGCKyvzIM4",
        releaseDate: "2013-04-14",
      },
    ],
  },
  {
    id: "3",
    title: "My Hero Academia",
    description: "A boy without superpowers in a world where they are common.",
    thumbnail: "https://images.unsplash.com/photo-1613376023733-0a73315d9b06?q=80&w=2070&auto=format&fit=crop",
    genres: ["Action", "Superhero", "School", "Adventure"],
    releaseYear: 2016,
    status: "ongoing",
    studio: "Bones",
    rating: 4.7,
    views: 18000000,
    episodes: [
      {
        id: "3-1",
        number: 1,
        title: "Izuku Midoriya: Origin",
        thumbnail: "https://images.unsplash.com/photo-1613376023733-0a73315d9b06?q=80&w=2070&auto=format&fit=crop",
        duration: 24,
        videoUrl: "https://www.youtube.com/embed/VQGCKyvzIM4",
        releaseDate: "2016-04-03",
      },
      {
        id: "3-2",
        number: 2,
        title: "What It Takes to Be a Hero",
        thumbnail: "https://images.unsplash.com/photo-1613376023733-0a73315d9b06?q=80&w=2070&auto=format&fit=crop",
        duration: 24,
        videoUrl: "https://www.youtube.com/embed/VQGCKyvzIM4",
        releaseDate: "2016-04-10",
      },
    ],
  },
  {
    id: "4",
    title: "One Piece",
    description: "Monkey D. Luffy and his crew search for the greatest treasure, One Piece.",
    thumbnail: "https://images.unsplash.com/photo-1559981421-3e0c0d156e5c?q=80&w=1974&auto=format&fit=crop",
    genres: ["Adventure", "Fantasy", "Comedy", "Drama"],
    releaseYear: 1999,
    status: "ongoing",
    studio: "Toei Animation",
    rating: 4.8,
    views: 25000000,
    episodes: [
      {
        id: "4-1",
        number: 1,
        title: "I'm Luffy! The Man Who's Gonna Be King of the Pirates!",
        thumbnail: "https://images.unsplash.com/photo-1559981421-3e0c0d156e5c?q=80&w=1974&auto=format&fit=crop",
        duration: 24,
        videoUrl: "https://www.youtube.com/embed/VQGCKyvzIM4",
        releaseDate: "1999-10-20",
      },
      {
        id: "4-2",
        number: 2,
        title: "Enter the Great Swordsman! Pirate Hunter Roronoa Zoro!",
        thumbnail: "https://images.unsplash.com/photo-1559981421-3e0c0d156e5c?q=80&w=1974&auto=format&fit=crop",
        duration: 24,
        videoUrl: "https://www.youtube.com/embed/VQGCKyvzIM4",
        releaseDate: "1999-10-27",
      },
    ],
  },
  {
    id: "5",
    title: "Jujutsu Kaisen",
    description: "A boy joins a secret organization to fight cursed spirits.",
    thumbnail: "https://images.unsplash.com/photo-1530319067432-f2a729c03db5?q=80&w=1989&auto=format&fit=crop",
    genres: ["Adventure", "Dark Fantasy", "Supernatural"],
    releaseYear: 2020,
    status: "ongoing",
    studio: "MAPPA",
    rating: 4.8,
    views: 14000000,
    episodes: [
      {
        id: "5-1",
        number: 1,
        title: "Ryomen Sukuna",
        thumbnail: "https://images.unsplash.com/photo-1530319067432-f2a729c03db5?q=80&w=1989&auto=format&fit=crop",
        duration: 24,
        videoUrl: "https://www.youtube.com/embed/VQGCKyvzIM4",
        releaseDate: "2020-10-03",
      },
      {
        id: "5-2",
        number: 2,
        title: "For Myself",
        thumbnail: "https://images.unsplash.com/photo-1530319067432-f2a729c03db5?q=80&w=1989&auto=format&fit=crop",
        duration: 24,
        videoUrl: "https://www.youtube.com/embed/VQGCKyvzIM4",
        releaseDate: "2020-10-10",
      },
    ],
  },
  {
    id: "6",
    title: "Fullmetal Alchemist: Brotherhood",
    description: "Two brothers search for the Philosopher's Stone to restore their bodies.",
    thumbnail: "https://images.unsplash.com/photo-1612036782180-6f0822045d55?q=80&w=2070&auto=format&fit=crop",
    genres: ["Adventure", "Dark Fantasy", "Steampunk"],
    releaseYear: 2009,
    status: "completed",
    studio: "Bones",
    rating: 4.9,
    views: 17000000,
    episodes: [
      {
        id: "6-1",
        number: 1,
        title: "Fullmetal Alchemist",
        thumbnail: "https://images.unsplash.com/photo-1612036782180-6f0822045d55?q=80&w=2070&auto=format&fit=crop",
        duration: 24,
        videoUrl: "https://www.youtube.com/embed/VQGCKyvzIM4",
        releaseDate: "2009-04-05",
      },
      {
        id: "6-2",
        number: 2,
        title: "The First Day",
        thumbnail: "https://images.unsplash.com/photo-1612036782180-6f0822045d55?q=80&w=2070&auto=format&fit=crop",
        duration: 24,
        videoUrl: "https://www.youtube.com/embed/VQGCKyvzIM4",
        releaseDate: "2009-04-12",
      },
    ],
  },
];

export const trending = [
  mockAnimes[0],
  mockAnimes[4],
  mockAnimes[2],
  mockAnimes[5],
];

export const recommended = [
  mockAnimes[1],
  mockAnimes[3],
  mockAnimes[5],
  mockAnimes[2],
];

export const recentlyAdded = [
  mockAnimes[4],
  mockAnimes[0],
  mockAnimes[3],
  mockAnimes[1],
];

export const mostViewed = [
  mockAnimes[3],
  mockAnimes[1],
  mockAnimes[0],
  mockAnimes[5],
];

export function getAnimeById(id: string): Anime | undefined {
  return mockAnimes.find(anime => anime.id === id);
}

export function getEpisodeById(animeId: string, episodeId: string) {
  const anime = getAnimeById(animeId);
  return anime?.episodes.find(episode => episode.id === episodeId);
}
