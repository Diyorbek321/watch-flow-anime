
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="anime-container">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-4">
          <div className="space-y-3">
            <h3 className="text-xl font-bold anime-gradient-text">AnimeFlow</h3>
            <p className="text-sm text-muted-foreground">
              Your ultimate destination for anime streaming. Watch your favorite anime series
              and movies anytime, anywhere.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium">Navigation</h4>
            <nav className="flex flex-col space-y-2">
              <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">Home</Link>
              <Link to="/browse" className="text-sm text-muted-foreground hover:text-foreground">Browse</Link>
              <Link to="/trending" className="text-sm text-muted-foreground hover:text-foreground">Trending</Link>
              <Link to="/random" className="text-sm text-muted-foreground hover:text-foreground">Random</Link>
            </nav>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium">Legal</h4>
            <nav className="flex flex-col space-y-2">
              <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground">Terms of Service</Link>
              <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground">Privacy Policy</Link>
              <Link to="/cookies" className="text-sm text-muted-foreground hover:text-foreground">Cookie Policy</Link>
              <Link to="/dmca" className="text-sm text-muted-foreground hover:text-foreground">DMCA</Link>
            </nav>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium">Account</h4>
            <nav className="flex flex-col space-y-2">
              <Link to="/login" className="text-sm text-muted-foreground hover:text-foreground">Login</Link>
              <Link to="/signup" className="text-sm text-muted-foreground hover:text-foreground">Sign Up</Link>
              <Link to="/profile" className="text-sm text-muted-foreground hover:text-foreground">Profile</Link>
              <Link to="/settings" className="text-sm text-muted-foreground hover:text-foreground">Settings</Link>
            </nav>
          </div>
        </div>
        
        <div className="mt-8 border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © 2025 AnimeFlow. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link to="#" className="text-xs text-muted-foreground hover:text-foreground">
              English
            </Link>
            <Link to="#" className="text-xs text-muted-foreground hover:text-foreground">
              日本語
            </Link>
            <Link to="#" className="text-xs text-muted-foreground hover:text-foreground">
              O'zbek
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
