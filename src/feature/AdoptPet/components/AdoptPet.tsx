import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAdoptPetMutation } from "../api/adoptPetApi";
// import { toast } from "react-toastify";

const AdoptPet = ({ petId, onClose }: { petId: number; onClose: () => void }) => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    console.log("User ID : ",user.id); // Access user_id
//   const userId = localStorage.getItem("user_id") || "0"; // Get user_id from localStorage
    const userId = user.id;
  const [formData, setFormData] = useState({
    email: "",
    phone_no: "",
    address: "",
    expected_adoption_date: "",
  });

  const [adoptPet, { isLoading }] = useAdoptPetMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { ...formData, u_id: Number(userId), p_id: petId };

    try {
      const response = await adoptPet(payload).unwrap();
      console.log(response);
    //   toast.success(response.message || "Adoption request submitted!");
      onClose();
    } catch (error) {
    //   toast.error(error?.data?.message || "Failed to submit adoption request.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Adopt Pet</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            Email:
          <Input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
          Phone No:
          <Input name="phone_no" type="tel" placeholder="Phone Number" value={formData.phone_no} onChange={handleChange} required />
          Address:
          <Input name="address" type="text" placeholder="Address" value={formData.address} onChange={handleChange} required />
          Expected Adoption Date:
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

export default AdoptPet;
