
import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Bell, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { useIsMobile } from "@/hooks/use-mobile";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="anime-container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          {isMobile && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="mr-2 md:hidden" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              <span className="sr-only">Menu</span>
            </Button>
          )}
          <Link to="/" className="flex items-center gap-2">
            <span className="text-xl font-bold anime-gradient-text">AnimeFlow</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-4 ml-6">
            <Link to="/" className="text-sm font-medium transition-colors hover:text-primary">
              Home
            </Link>
            <Link to="/browse" className="text-sm font-medium transition-colors hover:text-primary">
              Browse
            </Link>
            <Link to="/trending" className="text-sm font-medium transition-colors hover:text-primary">
              Trending
            </Link>
            <Link to="/random" className="text-sm font-medium transition-colors hover:text-primary">
              Random
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative hidden md:flex">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search anime..."
              className="anime-input w-64 pl-8 focus:w-80 transition-all"
            />
          </div>
          
          <ThemeToggle />
          
          <Button variant="ghost" size="icon" className="rounded-full">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button>
          
          <Link to="/profile">
            <Avatar>
              <AvatarImage src="" />
              <AvatarFallback className="bg-primary/10 text-primary">GU</AvatarFallback>
            </Avatar>
          </Link>
          
          <div className="md:hidden flex items-center">
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMobile && isMenuOpen && (
        <div className="fixed inset-0 top-16 z-50 bg-background p-4 animate-fade-in md:hidden">
          <nav className="flex flex-col space-y-4">
            <Link 
              to="/" 
              className="text-lg font-medium p-2 rounded-md hover:bg-accent/10"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/browse" 
              className="text-lg font-medium p-2 rounded-md hover:bg-accent/10"
              onClick={() => setIsMenuOpen(false)}
            >
              Browse
            </Link>
            <Link 
              to="/trending" 
              className="text-lg font-medium p-2 rounded-md hover:bg-accent/10"
              onClick={() => setIsMenuOpen(false)}
            >
              Trending
            </Link>
            <Link 
              to="/random" 
              className="text-lg font-medium p-2 rounded-md hover:bg-accent/10"
              onClick={() => setIsMenuOpen(false)}
            >
              Random
            </Link>
            <div className="relative my-2">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search anime..."
                className="anime-input w-full pl-9"
              />
            </div>
            <div className="border-t pt-4 mt-4">
              <Link 
                to="/login" 
                className="block text-lg font-medium p-2 rounded-md hover:bg-accent/10"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
              <Link 
                to="/signup" 
                className="block text-lg font-medium p-2 rounded-md hover:bg-accent/10"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign Up
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
