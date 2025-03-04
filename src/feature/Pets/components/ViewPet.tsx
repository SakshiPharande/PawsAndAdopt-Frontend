import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Pet } from "../types/petType";

interface PetModalProps {
  petId: number;
  onClose: () => void;
}

const ViewPet = ({ petId, onClose }: PetModalProps) => {
  const [pet, setPet] = useState<Pet | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    setPet(null);
    setLoading(true);
    setError("");
    setCurrentImageIndex(0);

    fetch(`http://localhost:3000/api/v1/pets/${petId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setPet(data.pet);
          console.log(data.pet)
        } else {
          setError("Failed to load pet details.");
        }
      })
      .catch(() => setError("Error fetching pet details."))
      .finally(() => setLoading(false));
  }, [petId]);


  const handleNextImage = () => {
    if (pet?.pet_images && pet.pet_images.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % pet.pet_images.length);
    }
  };

  const handlePrevImage = () => {
    if (pet?.pet_images && pet.pet_images.length > 0) {
      setCurrentImageIndex((prev) => (prev - 1 + pet.pet_images.length) % pet.pet_images.length);
    }
  };

   // Helper function to format vaccination status
   const formatVaccinationStatus = (status: boolean | string) => {
    if (typeof status === 'boolean') {
      return status ? 'Vaccinated' : 'Not Vaccinated';
    }
    return status || 'Unknown';
  };

  return (
    <Dialog open={!!petId} onOpenChange={onClose}>
      <DialogContent 
        className="p-6 bg-[#E4D3E7] max-w-md mx-auto rounded-xl shadow-lg"
        style={{ borderColor: '#A864AF' }}
      >
        <DialogHeader className="relative">
          <DialogTitle className="text-[#8A5691] text-2xl font-bold">Pet Details</DialogTitle>
          <button 
            onClick={onClose} 
            className="absolute top-0 right-0 text-[#8A5691] hover:text-red-500"
          >
          </button>
        </DialogHeader>

        {loading ? (
          <p className="text-center text-[#8A5691]">Loading...</p>
        ) : error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : pet ? (
          <div className="space-y-4">
            {/* Image Gallery */}
            {pet.pet_images && pet.pet_images.length > 0 && (
              <div className="relative">
                <div className="w-full h-56 rounded-lg overflow-hidden relative">
                  <img
                    src={`http://localhost:3000${pet.pet_images[currentImageIndex]}`}
                    alt={`${pet.breed_name} - Image ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover"
                  />
                  {pet.pet_images.length > 1 && (
                    <>
                      <button 
                        onClick={handlePrevImage}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/50 rounded-full p-2"
                      >
                        &#10094;
                      </button>
                      <button 
                        onClick={handleNextImage}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/50 rounded-full p-2"
                      >
                        &#10095;
                      </button>
                    </>
                  )}
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1">
                    {pet.pet_images.map((_, index) => (
                      <span 
                        key={index} 
                        className={`h-2 w-2 rounded-full ${
                          index === currentImageIndex ? 'bg-[#8A5691]' : 'bg-[#D1B0D2]'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Pet Details in Two-Column Layout */}
            <div className="grid grid-cols-2 gap-4 text-[#8A5691]">
              <div>
                <p className="font-semibold">Breed</p>
                <p>{pet.breed_name}</p>
              </div>
              <div>
                <p className="font-semibold">Category</p>
                <p>{pet.category_name}</p>
              </div>
              <div>
                <p className="font-semibold">Age</p>
                <p>{pet.age}</p>
              </div>
              <div>
                <p className="font-semibold">Gender</p>
                <p>{pet.gender}</p>
              </div>
              <div>
                <p className="font-semibold">Temperament</p>
                <p>{pet.temperament}</p>
              </div>
              <div>
                <p className="font-semibold">Vaccination Status</p>
                <p className={pet.vaccination_status ? "text-green-600": "text-red-600"}/>
                  {formatVaccinationStatus(pet.vaccination_status)}
                </div>
            </div>

            {/* Full Width Details */}
            <div className="space-y-2 text-[#8A5691]">
              <div>
                <p className="font-semibold">Medical History</p>
                <p>{pet.medical_history}</p>
              </div>
              <div>
                <p className="font-semibold">Medical History</p>
                <p>{pet.recommended_food}</p>
              </div>
              <div>
                <p className="font-semibold">Medical History</p>
                <p>{pet.common_health_issues}</p>
              </div>
              <div>
                <p className="font-semibold">Status</p>
                <p className={pet.status === "Available" ? "text-green-600" : "text-red-600"}>
                  {pet.status}
                </p>
              </div>
            </div>
          </div>
        ) : null}

        <DialogClose asChild>
          <button 
            className="w-full bg-[#A864AF] text-white p-2 rounded-md hover:bg-[#8A5691] transition-colors"
            onClick={onClose}
          >
            Close
          </button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default ViewPet;