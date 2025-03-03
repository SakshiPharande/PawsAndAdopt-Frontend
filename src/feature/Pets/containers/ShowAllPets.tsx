import { useState } from "react";
import { useGetAllPetsQuery } from "../api/showAllPetsApi";
import PetCard from "../components/PetCard";
import PetsFilters from "./PetsFilters";
import { Pet } from "../types/petType";


const ShowAllPets = () => {
  const { data: pets, error, isLoading } = useGetAllPetsQuery();
  // console.log("Fetched Pets Data:", pets);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedGender, setSelectedGender] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [selectedBreed, setSelectedBreed] = useState<string | null>(null);

  if (isLoading) return <p className="text-center text-lg font-semibold">Loading pets...</p>;
  if (error) return <p className="text-center text-red-500 font-semibold">Error fetching pets! Please try again.</p>;

 // Get unique categories
 const uniqueCategories = [...new Set(pets?.pets?.map((pet: Pet) => pet.category_name))] as string[];

 // Get unique breeds based on selected category
 const uniqueBreeds = selectedCategory
   ? [...new Set(pets?.pets?.filter((pet: Pet) => pet.category_name === selectedCategory).map((pet: Pet) => pet.breed_name))]
   : [...new Set(pets?.pets?.map((pet: Pet) => pet.breed_name))];

  const filteredPets = (pets?.pets || []).filter((pet: Pet) => (
    (!selectedCategory || pet.category_name === selectedCategory) &&
    pet.breed_name.toLowerCase().includes(search.toLowerCase()) &&
    (selectedGender ? pet.gender === selectedGender : true) &&
    (selectedStatus ? pet.status === selectedStatus : true) &&
    (selectedBreed ? pet.breed_name === selectedBreed : true)
  ));
  
  const resetFilters = () => {
    setSearch("");
    setSelectedCategory(null);
    setSelectedGender(null);
    setSelectedStatus(null);
    setSelectedBreed(null);
  };

  return (
    <div className="flex">
      <PetsFilters{...{ search, setSearch, selectedCategory, setSelectedCategory, selectedGender, setSelectedGender, selectedStatus, setSelectedStatus, selectedBreed, setSelectedBreed, resetFilters, uniqueCategories, uniqueBreeds }} />
      <div className="flex-1 p-6">
        <h2 className="text-3xl font-bold text-amber-800 text-center mb-6">Available Pets for Adoption</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredPets.length > 0 ? filteredPets.map((pet :Pet) => <PetCard key={pet.id} pet={pet} />) : <p className="text-center col-span-full text-gray-600">No pets found.</p>}
        </div>
      </div>
    </div>
  );
};
export default ShowAllPets;
