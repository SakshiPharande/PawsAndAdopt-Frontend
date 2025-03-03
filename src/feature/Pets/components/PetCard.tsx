import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { Pet } from "../types/petType";
import ViewPet from "./ViewPet";
import AdoptPetContainer from "@/feature/AdoptPet/container/AdoptPetConatiner";

const PetCard = ({ pet }: { pet: Pet }) => {
  const [selectedPetId, setSelectedPetId] = useState<number | null>(null);
  const [isAdoptModalOpen, setIsAdoptModalOpen] = useState(false);

  return (
    <>
      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader className="bg-amber-100 p-4 rounded-t-lg">
          <CardTitle className="text-amber-800 text-xl">{pet.breed_name}</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <img
            src={pet.pet_images.length > 0 ? `http://localhost:3000${pet.pet_images[0]}` : "/placeholder-image.jpg"}
            alt={pet.breed_name}
            className="w-full h-40 object-cover rounded-lg mb-4"
          />

          <p className={`mt-2 font-semibold ${pet.status === "Available" ? "text-green-600" : "text-red-600"}`}>
            Status: {pet.status}
          </p>

          <div className="flex items-center justify-between mt-4">
            <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white" onClick={() => setIsAdoptModalOpen(true)}>Adopt Pet</Button>
            <Eye
              className="w-6 h-6 text-amber-800 ml-4 cursor-pointer"
              onClick={() => setSelectedPetId(pet.id)}
            />
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
