import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pet } from "../types/petType";
import { Button } from "@/components/ui/button";

const PetCard = ({ pet }: { pet: Pet }) => (
  <Card key={pet.id} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
    <CardHeader className="bg-amber-100 p-4 rounded-t-lg">
      <CardTitle className="text-amber-800 text-xl">{pet.breed_name}</CardTitle>
    </CardHeader>
    <CardContent className="p-4">
    <img
    src={pet.pet_images.length > 0 
      ? `http://localhost:3000${pet.pet_images[0]}`  // Replace with your actual backend URL
      : "/placeholder-image.jpg"}
    alt={pet.breed_name}
  className="w-full h-40 object-cover rounded-lg mb-4"
/>

      <p className={`mt-2 font-semibold ${pet.status === "Available" ? "text-green-600" : "text-red-600"}`}>
        Status: {pet.status}
      </p>
      <Button  className="w-full bg-amber-600 hover:bg-amber-700 text-white">Adopt Pet</Button>
    </CardContent>
  </Card>
);
export default PetCard;
