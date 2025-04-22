
import React from "react";
import { Link } from "react-router-dom";
import { 
  LayoutDashboard, 
  FilmIcon, 
  Users, 
  Settings, 
  PlusCircle 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { mockAnimes } from "@/data/mock-data";

const AdminDashboard = () => {
  const totalAnimes = mockAnimes.length;
  const totalEpisodes = mockAnimes.reduce((acc, anime) => acc + anime.episodes.length, 0);
  const totalViews = mockAnimes.reduce((acc, anime) => acc + anime.views, 0);
  
  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Link to="/admin/anime/add">
          <Button className="gap-2">
            <PlusCircle className="h-4 w-4" />
            Add New Anime
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Anime</CardTitle>
            <FilmIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalAnimes}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Episodes</CardTitle>
            <FilmIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalEpisodes}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalViews.toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link to="/admin/anime/manage" className="w-full">
            <Button variant="outline" className="w-full h-24 flex flex-col gap-2">
              <FilmIcon className="h-6 w-6" />
              <span>Manage Anime</span>
            </Button>
          </Link>
          <Link to="/admin/users" className="w-full">
            <Button variant="outline" className="w-full h-24 flex flex-col gap-2">
              <Users className="h-6 w-6" />
              <span>Manage Users</span>
            </Button>
          </Link>
          <Link to="/admin/settings" className="w-full">
            <Button variant="outline" className="w-full h-24 flex flex-col gap-2">
              <Settings className="h-6 w-6" />
              <span>Site Settings</span>
            </Button>
          </Link>
          <Link to="/admin/analytics" className="w-full">
            <Button variant="outline" className="w-full h-24 flex flex-col gap-2">
              <LayoutDashboard className="h-6 w-6" />
              <span>Analytics</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
