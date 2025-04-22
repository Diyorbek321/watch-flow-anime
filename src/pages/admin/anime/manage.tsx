
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Edit, Trash2, Plus, Search, Eye } from "lucide-react";
import { mockAnimes } from "@/data/mock-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { AdminDeleteDialog } from "@/components/admin/delete-dialog";
import { Anime } from "@/types/anime";

const ManageAnime = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [animes, setAnimes] = useState(mockAnimes);
  const [animeToDelete, setAnimeToDelete] = useState<Anime | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const filteredAnimes = animes.filter((anime) =>
    anime.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    anime.studio.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteAnime = (anime: Anime) => {
    setAnimeToDelete(anime);
    setDialogOpen(true);
  };

  const confirmDelete = () => {
    if (animeToDelete) {
      // In a real app, this would be an API call
      setAnimes(animes.filter((a) => a.id !== animeToDelete.id));
      setDialogOpen(false);
      setAnimeToDelete(null);
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Manage Anime</h1>
          <p className="text-muted-foreground mt-1">
            Add, edit, or remove anime from the library
          </p>
        </div>
        <Link to="/admin/anime/add">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add New Anime
          </Button>
        </Link>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search anime by title or studio..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Studio</TableHead>
              <TableHead>Year</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Episodes</TableHead>
              <TableHead>Views</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAnimes.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                  No anime found matching your search criteria.
                </TableCell>
              </TableRow>
            ) : (
              filteredAnimes.map((anime) => (
                <TableRow key={anime.id}>
                  <TableCell className="font-medium">{anime.title}</TableCell>
                  <TableCell>{anime.studio}</TableCell>
                  <TableCell>{anime.releaseYear}</TableCell>
                  <TableCell>
                    <Badge variant={anime.status === "ongoing" ? "secondary" : "outline"}>
                      {anime.status === "ongoing" ? "Ongoing" : "Completed"}
                    </Badge>
                  </TableCell>
                  <TableCell>{anime.episodes.length}</TableCell>
                  <TableCell>{anime.views.toLocaleString()}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Link to={`/anime/${anime.id}`}>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Link to={`/admin/anime/edit/${anime.id}`}>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-destructive"
                      onClick={() => handleDeleteAnime(anime)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <AdminDeleteDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onConfirm={confirmDelete}
        title={`Delete ${animeToDelete?.title || "Anime"}`}
        description="Are you sure you want to delete this anime? This action cannot be undone and all associated episodes will also be deleted."
      />
    </div>
  );
};

export default ManageAnime;
