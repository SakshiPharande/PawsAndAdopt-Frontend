import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AdoptPetFormData } from "../types/adoptPetType";


interface AdoptPetFormProps {
  formData: AdoptPetFormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  onClose: () => void;
}

const AdoptPetForm = ({ formData, handleChange, handleSubmit, isLoading, onClose }: AdoptPetFormProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Adopt Pet</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <label>Email:</label>
          <Input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} required />

          <label>Phone No:</label>
          <Input name="phone_no" type="tel" placeholder="Phone Number" value={formData.phone_no} onChange={handleChange} required />

          <label>Address:</label>
          <Input name="address" type="text" placeholder="Address" value={formData.address} onChange={handleChange} required />

          <label>Expected Adoption Date:</label>
          <Input name="expected_adoption_date" type="date" value={formData.expected_adoption_date} onChange={handleChange} required />

          <div className="flex justify-end gap-2 mt-4">
            <Button type="button" className="bg-gray-500" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-amber-600 hover:bg-amber-700" disabled={isLoading}>
              {isLoading ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdoptPetForm;
