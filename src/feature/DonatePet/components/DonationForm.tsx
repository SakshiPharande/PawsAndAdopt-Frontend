import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCreateDonationMutation } from "../api/donateApi";
import { Donation } from "../types/donatePetType";

interface DonationFormProps {
  petId: number;
}

const DonationForm: React.FC<DonationFormProps> = ({ petId }) => {
  const { register, handleSubmit } = useForm<Donation>();
  const [createDonation] = useCreateDonationMutation();

  // Fetch user ID from localStorage
  const userId = localStorage.getItem("user_id");

  const onSubmit = async (data: Donation) => {
    try {
      const donationData = {
        pet_id: petId,
        donate_pet: {
          ...data,
          user_id: userId ? parseInt(userId) : null, // Convert to number if exists
          actual_donate_date: data.expected_donate_date, // Auto-set
        },
      };

      await createDonation(donationData).unwrap();
      alert("Donation submitted successfully!");
    } catch (error) {
      console.error("Failed to submit donation", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input type="email" placeholder="Email" {...register("email", { required: true })} />
      <Input type="tel" placeholder="Phone No" {...register("phone_no", { required: true })} />
      <Input type="text" placeholder="Address" {...register("address", { required: true })} />
      <Input type="date" placeholder="Expected Donation Date" {...register("expected_donate_date", { required: true })} />
      <Button type="submit">Submit Donation</Button>
    </form>
  );
};

export default DonationForm;
