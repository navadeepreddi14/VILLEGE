
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Upload as UploadIcon, Camera, Check } from "lucide-react";
import { toast } from "sonner";

const Upload = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    image: null as File | null
  });
  const [preview, setPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, image: file });
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    document.getElementById('image-upload')?.click();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.image) {
      toast.error("Please fill in your name and select an image");
      return;
    }

    setIsUploading(true);

    try {
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Save to localStorage
      const existingPhotos = JSON.parse(localStorage.getItem('villagePhotos') || '[]');
      const newPhoto = {
        id: Date.now(),
        name: formData.name,
        image: preview,
        uploadDate: new Date().toISOString()
      };
      
      existingPhotos.unshift(newPhoto);
      localStorage.setItem('villagePhotos', JSON.stringify(existingPhotos));

      toast.success("Photo uploaded successfully!");
      
      // Reset form
      setFormData({ name: "", image: null });
      setPreview(null);
      
      // Navigate to gallery after short delay
      setTimeout(() => {
        navigate('/gallery');
      }, 1000);
      
    } catch (error) {
      toast.error("Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="flex items-center gap-4 mb-8 animate-fade-in">
          <Button
            onClick={() => navigate('/')}
            variant="ghost"
            size="sm"
            className="text-indigo-600 hover:text-indigo-800 hover:bg-indigo-100"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back Home
          </Button>
          <div className="flex-1 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-indigo-900">
              Share Your Photo
            </h1>
            <p className="text-indigo-600 mt-2">
              Upload a photo from our village
            </p>
          </div>
        </header>

        {/* Upload Form */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-indigo-200 animate-fade-in">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Image Upload */}
              <div className="space-y-4">
                <label className="block text-lg font-semibold text-indigo-900">
                  Choose Your Photo
                </label>
                <div className="border-2 border-dashed border-indigo-300 rounded-2xl p-8 text-center hover:border-indigo-400 transition-colors">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    id="image-upload"
                  />
                  {preview ? (
                    <div className="space-y-4">
                      <img
                        src={preview}
                        alt="Preview"
                        className="max-w-full max-h-64 mx-auto rounded-xl shadow-lg"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setPreview(null);
                          setFormData({ ...formData, image: null });
                        }}
                        className="border-indigo-300 text-indigo-600 hover:bg-indigo-50"
                      >
                        Choose Different Photo
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <Camera className="w-16 h-16 text-indigo-400 mx-auto" />
                      <div>
                        <p className="text-indigo-600 font-medium mb-2">
                          Click to upload or drag and drop
                        </p>
                        <p className="text-sm text-indigo-500">
                          PNG, JPG or GIF up to 10MB
                        </p>
                      </div>
                      <Button
                        type="button"
                        onClick={triggerFileInput}
                        className="bg-indigo-500 hover:bg-indigo-600 text-white"
                      >
                        <UploadIcon className="w-4 h-4 mr-2" />
                        Select Photo
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              {/* Name Input */}
              <div className="space-y-2">
                <label className="block text-lg font-semibold text-indigo-900">
                  Your Name
                </label>
                <Input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter your name"
                  className="text-lg p-4 border-indigo-200 focus:border-indigo-400 rounded-xl"
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isUploading || !formData.name || !formData.image}
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white text-lg p-4 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100"
              >
                {isUploading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Uploading...
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <Check className="w-5 h-5" />
                    Share This Photo
                  </div>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
