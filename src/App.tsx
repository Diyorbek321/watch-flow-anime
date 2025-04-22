
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/layout/layout";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/auth/login";
import SignUpPage from "./pages/auth/signup";
import AnimeDetail from "./pages/anime/anime-detail";
import WatchEpisode from "./pages/anime/watch-episode";
import Browse from "./pages/browse/browse";
import AdminDashboard from "./pages/admin/dashboard"; 
import ManageAnime from "./pages/admin/anime/manage";
import AddAnime from "./pages/admin/anime/add";
import EditAnime from "./pages/admin/anime/edit";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Index />} />
            <Route path="/browse" element={<Browse />} />
            <Route path="/anime/:id" element={<AnimeDetail />} />
            <Route path="/anime/:animeId/watch/:episodeId" element={<WatchEpisode />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/anime/manage" element={<ManageAnime />} />
            <Route path="/admin/anime/add" element={<AddAnime />} />
            <Route path="/admin/anime/edit/:id" element={<EditAnime />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
