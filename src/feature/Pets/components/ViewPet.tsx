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

  useEffect(() => {
    setPet(null); // Reset pet details when opening a new modal
    setLoading(true);
    setError("");

    fetch(`http://localhost:3000/api/v1/pets/${petId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setPet(data.pet);
        } else {
          setError("Failed to load pet details.");
        }
      })
      .catch(() => setError("Error fetching pet details."))
      .finally(() => setLoading(false));
  }, [petId]);

  return (
    <Dialog open={!!petId} onOpenChange={onClose}>
      <DialogContent className="p-6">
        <DialogHeader>
          <DialogTitle className="text-amber-800 text-xl">Pet Details</DialogTitle>
        </DialogHeader>

        {loading ? (
          <p className="text-center">Loading...</p>
        ) : error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : pet ? (
          <div className="space-y-4">
            <img
              src={pet?.pet_images?.length > 0 ? `http://localhost:3000${pet.pet_images[0]}` : "/placeholder-image.jpg"}
              alt={pet.breed_name}
              className="w-full h-40 object-cover rounded-lg"
            />
            <p><strong>Breed:</strong> {pet.breed_name}</p>
            <p><strong>Category:</strong> {pet.category_name}</p>
            <p><strong>Age:</strong> {pet.age}</p>
            <p><strong>Gender:</strong> {pet.gender}</p>
            <p><strong>Temperament:</strong> {pet.temperament}</p>
            <p><strong>Vaccination Status:</strong> {pet.vaccination_status}</p>
            <p><strong>Medical History:</strong> {pet.medical_history}</p>
            <p><strong>Status:</strong> <span className={pet.status === "Available" ? "text-green-600" : "text-red-600"}>{pet.status}</span></p>
          </div>
        ) : null}

        <DialogClose asChild>
          <button className="w-full bg-red-500 text-white p-2 rounded-md">Close</button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default ViewPet;
