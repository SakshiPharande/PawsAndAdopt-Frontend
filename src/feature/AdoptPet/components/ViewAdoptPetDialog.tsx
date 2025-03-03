import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AdoptionRequest } from "../types/showAdoptRequestType";

interface AdoptionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  request: AdoptionRequest | null;
}

const BASE_URL = "http://localhost:3000";

const ViewAdoptPetDialog = ({ isOpen, onClose, request }: AdoptionDialogProps) => {
  if (!request) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adoption Request Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-2">
          {/* User Details */}
          <p><strong>Email:</strong> {request.email}</p>
          <p><strong>Phone No:</strong> {request.phone_no}</p>
          <p><strong>Address:</strong> {request.address}</p>

          {/* Adoption Status and Dates */}
          <p><strong>Status:</strong> {request.status}</p>
          <p><strong>Expected Date:</strong> {new Date(request.expected_adoption_date).toLocaleDateString()}</p>
          <p><strong>Actual Date:</strong> {request.actual_adoption_date ? new Date(request.actual_adoption_date).toLocaleDateString() : "N/A"}</p>

          {/* Pet Details */}
          <p><strong>Pet Breed:</strong> {request.pet.breed_name}</p>
          <p><strong>Pet Category:</strong> {request.pet.category_name}</p>
          <p><strong>Pet Age:</strong> {request.pet.age} years</p>
          <p><strong>Gender:</strong> {request.pet.gender}</p>
          <p><strong>Temperament:</strong> {request.pet.temperament}</p>
          <p><strong>Vaccination Status:</strong> {request.pet.vaccination_status ? "Vaccinated" : "Not Vaccinated"}</p>

          {/* Pet Images */}
          <div className="flex gap-2 mt-2">
            {request.pet.pet_images.length > 0 ? (
              request.pet.pet_images.map((img, index) => (
                <img key={index} src={`${BASE_URL}${img}`} alt="Pet" className="w-24 h-24 rounded-lg border shadow-sm" />
              ))
            ) : (
              <p className="text-gray-500">No images available</p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewAdoptPetDialog;
