import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import villageImage from '@/assets/villegeimg.jpg'
import { Upload, Image, Heart, MapPin, Users, Mountain } from "lucide-react";

const Homepage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-12 animate-fade-in">
          <div className="mb-6">
            <Heart className="w-16 h-16 text-red-500 mx-auto mb-4 animate-pulse" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-amber-900 mb-4 font-serif">
            Anantharuyudu Peta
          </h1>
          <p className="text-xl md:text-2xl text-amber-700 mb-2">
            Photo Memories
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-red-400 mx-auto rounded-full"></div>
        </header>

   {/* Welcome Message */}
<div
  className="max-w-4xl mx-auto text-center mb-16 animate-fade-in rounded-3xl shadow-xl border border-amber-200"
  style={{ background: `url(${villageImage})`,backgroundSize : 'cover', backgroundPosition: 'center' }}
>
  <div className="rounded-3xl bg-black/40 p-8 md:p-12">
    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
      Welcome to Our Village Story
    </h2>
    <p className="text-lg md:text-xl backdrop-blur-xs text-white leading-relaxed mb-8">
      నమస్కారం! Welcome to Anantharuyudu Peta's digital memory collection. 
      Share the moments that make our village special. Upload your favorite photos 
      and help us create a beautiful collection of memories that capture the heart 
      and soul of our community. Every picture tells a story, and together we're 
      writing the story of our beloved village.
    </p>
    <div className="flex flex-wrap justify-center gap-4 text-white">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
        <span>Share Your Memories</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 bg-red-400 rounded-full"></div>
        <span>Celebrate Together</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
        <span>Build Our Story</span>
      </div>
    </div>
  </div>
</div>


        {/* About Anantharuyudu Peta Section */}
        <div className="max-w-6xl mx-auto mb-16 animate-fade-in">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-xl border border-amber-200">
            <h2 className="text-3xl md:text-4xl font-bold text-amber-900 mb-8 text-center">
              About Anantharuyudu Peta
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Location */}
              <div className="text-center">
                <div className="bg-amber-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <MapPin className="w-8 h-8 text-amber-600" />
                </div>
                <h3 className="text-xl font-bold text-amber-900 mb-3">Our Location</h3>
                <p className="text-amber-700 leading-relaxed">
                  Nestled in the beautiful Parvathipuram Manyam district, within Seethanagaram Mandal, 
                  our village is a gem in the heart of Andhra Pradesh, India. Surrounded by lush green 
                  landscapes and rolling hills.
                </p>
              </div>

              {/* Culture */}
              <div className="text-center">
                <div className="bg-red-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Users className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-amber-900 mb-3">Our Culture</h3>
                <p className="text-amber-700 leading-relaxed">
                  Rich in Telugu traditions and customs, our village celebrates festivals with great joy. 
                  From colorful Sankranti kites to vibrant Diwali celebrations, we maintain our cultural 
                  heritage while embracing modernity.
                </p>
              </div>

              {/* Lifestyle */}
              <div className="text-center">
                <div className="bg-orange-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Mountain className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold text-amber-900 mb-3">Our Lifestyle</h3>
                <p className="text-amber-700 leading-relaxed">
                  A harmonious blend of agriculture and community living defines us. Our farmers work 
                  the fertile lands while families gather for evening conversations under the banyan tree, 
                  creating bonds that last generations.
                </p>
              </div>
            </div>

            <div className="mt-8 p-6 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl">
              <p className="text-center text-amber-800 text-lg italic">
                "అనంతరాయుడుపేట - Where tradition meets tomorrow, and every sunset brings us closer together."
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="max-w-2xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6 animate-fade-in">
            <Button
              onClick={() => navigate('/upload')}
              className="group relative overflow-hidden bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white border-0 rounded-2xl p-8 h-auto transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
              size="lg"
            >
              <div className="flex flex-col items-center gap-4">
                <div className="bg-white/20 rounded-full p-4 group-hover:bg-white/30 transition-colors">
                  <Upload className="w-8 h-8" />
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold mb-2">Share a Photo</div>
                  <div className="text-sm opacity-90">
                    Upload your favorite village moments
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </Button>

            <Button
              onClick={() => navigate('/gallery')}
              className="group relative overflow-hidden bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white border-0 rounded-2xl p-8 h-auto transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
              size="lg"
            >
              <div className="flex flex-col items-center gap-4">
                <div className="bg-white/20 rounded-full p-4 group-hover:bg-white/30 transition-colors">
                  <Image className="w-8 h-8" />
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold mb-2">View Gallery</div>
                  <div className="text-sm opacity-90">
                    Explore our shared memories
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </Button>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center mt-16 animate-fade-in">
          <p className="text-amber-600 text-sm">
            Made with ❤️ for Anantharuyudu Peta community
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Homepage;
