import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DonationRequest } from "../types/showDonationRequestType";

interface DonationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  request: DonationRequest | null;
}

const BASE_URL = "http://localhost:3000";

const ViewAdoptPetDialog = ({ isOpen, onClose, request }: DonationDialogProps) => {
const user = JSON.parse(localStorage.getItem("user") || "{}");

  if (!request) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adoption Request Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-2">
          {/* User Details */}
          <p><strong>Email:</strong> {user.email || "No Email Found"}</p>
          <p><strong>Phone No:</strong> {request.phone_no}</p>
          <p><strong>Address:</strong> {request.address}</p>

          {/* Adoption Status and Dates */}
          <p><strong>Status:</strong> {request.status}</p>
          <p><strong>Expected Date:</strong> {new Date(request.expected_donate_date).toLocaleDateString()}</p>
          <p><strong>Actual Date:</strong> {request.actual_donate_date ? new Date(request.actual_donate_date).toLocaleDateString() : "N/A"}</p>

          {/* Pet Details */}
          <p><strong>Pet Breed:</strong> {request.pet.breed_name}</p>
          <p><strong>Pet Category:</strong> {request.pet.category_name}</p>
          <p><strong>Pet Age:</strong> {request.pet.age} years</p>
          <p><strong>Gender:</strong> {request.pet.gender}</p>
          <p><strong>Temperament:</strong> {request.pet.temperament}</p>
          <p><strong>Recommanded Food:</strong> {request.pet.recommended_food}</p>
          <p><strong>Medical History:</strong> {request.pet.medical_history}</p>
          <p><strong>Common Health issues:</strong> {request.pet.common_health_issues}</p>
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
