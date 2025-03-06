import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom"; // Import useParams
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCreateDonationMutation } from "../api/donateApi";
import { Donation } from "../types/donatePetType";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Calendar } from "lucide-react";

const DonationForm: React.FC = () => {
  const { petId } = useParams<{ petId: string }>(); // Extract petId from URL
  const { register, handleSubmit } = useForm<Donation>();
  const [createDonation] = useCreateDonationMutation();

  // Fetch user ID from localStorage
  const userId = localStorage.getItem("user_id");

  const onSubmit = async (data: Donation) => {
    try {
      const donationData = {
        pet_id: Number(petId), // Convert petId to number
        donate_pet: {
          ...data,
          user_id: userId ? parseInt(userId) :  null,
          actual_donate_date: data.expected_donate_date,
        },
      };

      await createDonation(donationData).unwrap();
      alert("Donation submitted successfully!");
    } catch (error) {
      console.error("Failed to submit donation", error);
    }
  };


  return (
    <Card className="w-full max-w-md mx-auto shadow-lg">
      <CardHeader className="text-[#8A5691] border-b">
        <CardTitle className="text-xl text-[#8A5691]">Make a Donation</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <form id="donation-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="font-medium">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              className="w-full focus:ring-2 focus:ring-blue-500"
              {...register("email", { required: true })}
            />
          </div>
         
          <div className="space-y-2">
            <Label htmlFor="phone" className="font-medium">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="(123) 456-7890"
              className="w-full focus:ring-2 focus:ring-blue-500"
              {...register("phone_no", { required: true })}
            />
          </div>
         
          <div className="space-y-2">
            <Label htmlFor="address" className="font-medium">Address</Label>
            <Input
              id="address"
              type="text"
              placeholder="Your full address"
              className="w-full focus:ring-2 focus:ring-blue-500"
              {...register("address", { required: true })}
            />
          </div>
         
          <div className="space-y-2">
            <Label htmlFor="date" className="font-medium flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Expected Donation Date
            </Label>
            <Input
              id="date"
              type="date"
              className="w-full focus:ring-2 focus:ring-blue-500"
              {...register("expected_donate_date", { required: true })}
            />
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-end bg-gray-50 border-t">
        <Button
          type="submit"
          form="donation-form"
          className=" bg-[#A864AF] hover:bg-[#8A5691] text-white font-medium rounded-md transition-colors px-8 py-2"
        >
          {"Submit Donation"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DonationForm;