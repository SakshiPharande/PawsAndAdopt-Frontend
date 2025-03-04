import { useState } from "react";
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { Pet } from "../types/petType";
import ViewPet from "./ViewPet";
import AdoptPetContainer from "@/feature/AdoptPet/container/AdoptPetConatiner";

const PetCard = ({ pet }: { pet: Pet }) => {
  const [selectedPetId, setSelectedPetId] = useState<number | null>(null);
  const [isAdoptModalOpen, setIsAdoptModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleAdoptClick = () => {
    if (pet.status === "Unavailable") {
      toast.error('Pet Adoption Unavailable', {
        description: `Sorry, ${pet.breed_name} is currently not available for adoption.`,
      });
    } else {
      setIsAdoptModalOpen(true);
    }
  };

  return (
    <>
      <Card 
        className={`
          shadow-lg transition-all duration-300 
          border-2 border-[#D1B0D2] rounded-xl overflow-hidden
          hover:shadow-2xl hover:scale-105 hover:border-[#8A5691]
          transform hover:-translate-y-2
        `}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CardHeader className="bg-[#E4D3E7] p-4 rounded-t-xl">
          <CardTitle className="text-[#8A5691] text-xl font-bold">{pet.breed_name}</CardTitle>
        </CardHeader>
        <CardContent className="p-4 relative">
          <div className="relative overflow-hidden rounded-lg mb-4">
            <img
              src={pet.pet_images.length > 0 ? `http://localhost:3000${pet.pet_images[0]}` : "/placeholder-image.jpg"}
              alt={pet.breed_name}
              className={`
                w-full h-48 object-cover transition-transform duration-300
                ${isHovered ? 'scale-110' : 'scale-100'}
                ${pet.status === "Unavailable" ? 'opacity-50' : ''}
              `}
            />
            {isHovered && (
              <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center transition-opacity">
                <Eye
                  className="w-10 h-10 text-white cursor-pointer hover:scale-110 transition-transform"
                  onClick={() => setSelectedPetId(pet.id)}
                />
              </div>
            )}
          </div>

          <p className={`
            mt-2 font-semibold text-center
            ${pet.status === "Available" ? "text-green-600" : "text-red-600"}
          `}>
            Status: {pet.status}
          </p>

          <div className="flex items-center justify-between mt-4">
            <Button 
              className={`
                w-full 
                ${pet.status === "Available" 
                  ? "bg-[#A864AF] hover:bg-[#8A5691]" 
                  : "bg-[#A864AF] hover:bg-[#8A5691]"}
                text-white transition-colors
              `}
              onClick={handleAdoptClick}
            >
              Adopt Pet
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* ViewPet Modal */}
      {selectedPetId && <ViewPet petId={selectedPetId} onClose={() => setSelectedPetId(null)} />}
      {isAdoptModalOpen && <AdoptPetContainer petId={pet.id} onClose={() => setIsAdoptModalOpen(false)} />}
    </>
  );
};

export default PetCard;