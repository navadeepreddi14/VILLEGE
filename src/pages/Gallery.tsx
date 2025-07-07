
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Heart, Calendar, User, X } from "lucide-react";

interface Photo {
  id: number;
  name: string;
  image: string;
  uploadDate: string;
}

const Gallery = () => {
  const navigate = useNavigate();
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  useEffect(() => {
    const savedPhotos = JSON.parse(localStorage.getItem('villagePhotos') || '[]');
    setPhotos(savedPhotos);
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const openModal = (photo: Photo) => {
    setSelectedPhoto(photo);
  };

  const closeModal = () => {
    setSelectedPhoto(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-teal-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="flex items-center gap-4 mb-8 animate-fade-in">
          <Button
            onClick={() => navigate('/')}
            variant="ghost"
            size="sm"
            className="text-teal-600 hover:text-teal-800 hover:bg-teal-100"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back Home
          </Button>
          <div className="flex-1 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-teal-900">
              Village Memories
            </h1>
            <p className="text-teal-600 mt-2">
              {photos.length} {photos.length === 1 ? 'photo' : 'photos'} shared by our community
            </p>
          </div>
        </header>

        {/* Gallery Grid */}
        {photos.length === 0 ? (
          <div className="text-center py-16 animate-fade-in">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 max-w-md mx-auto shadow-xl border border-teal-200">
              <Heart className="w-16 h-16 text-teal-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-teal-900 mb-4">
                No Photos Yet
              </h3>
              <p className="text-teal-600 mb-6">
                Be the first to share a memory from our village!
              </p>
              <Button
                onClick={() => navigate('/upload')}
                className="bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white"
              >
                Share First Photo
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-in">
            {photos.map((photo, index) => (
              <div
                key={photo.id}
                className="group bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-teal-200 cursor-pointer"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => openModal(photo)}
              >
                {/* Image */}
                <div className="aspect-square overflow-hidden relative">
                  <img
                    src={photo.image}
                    alt={`Photo by ${photo.name}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  {/* Name and Date */}
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-teal-600">
                      <User className="w-4 h-4" />
                      <span className="font-medium">{photo.name}</span>
                    </div>
                    <div className="flex items-center gap-2 text-teal-500">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(photo.uploadDate)}</span>
                    </div>
                  </div>

                  {/* Heart Icon */}
                  <div className="pt-2 border-t border-teal-100">
                    <Heart className="w-5 h-5 text-red-400 group-hover:text-red-500 transition-colors" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add Photo Button */}
        {photos.length > 0 && (
          <div className="text-center mt-12 animate-fade-in">
            <Button
              onClick={() => navigate('/upload')}
              className="bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white px-8 py-3 rounded-xl transition-all duration-300 transform hover:scale-105"
            >
              Add Another Photo
            </Button>
          </div>
        )}
      </div>

      {/* Photo Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full w-full">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 bg-white/20 hover:bg-white/30 text-white rounded-full p-2 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Photo */}
            <img
              src={selectedPhoto.image}
              alt={`Photo by ${selectedPhoto.name}`}
              className="w-full h-full object-contain rounded-lg"
            />

            {/* Photo Info */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent text-white p-6 rounded-b-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  <span className="font-medium text-lg">{selectedPhoto.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span>{formatDate(selectedPhoto.uploadDate)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
