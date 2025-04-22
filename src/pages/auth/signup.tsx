
import { Link } from "react-router-dom";
import { AuthForm } from "@/components/auth/auth-form";

export default function SignUpPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 px-4">
        <div className="text-center">
          <Link to="/" className="inline-block">
            <h1 className="text-4xl font-bold anime-gradient-text">AnimeFlow</h1>
          </Link>
          <h2 className="mt-6 text-2xl font-bold tracking-tight">
            Create an account
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Sign up to start streaming and tracking your favorite anime
          </p>
        </div>
        <div className="mt-8">
          <div className="bg-card p-6 rounded-xl shadow-sm dark:glass-card">
            <AuthForm type="signup" />
          </div>
        </div>
      </div>
    </div>
  );
}
