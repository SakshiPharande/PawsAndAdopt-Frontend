import { useForm } from "react-hook-form";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useGetBreedsByCategoryQuery, useGetCategoriesQuery } from "../api/categoryApi";
import { Pet } from "../types/donatePetType";
import { useCreatePetMutation } from "../api/donateApi";

interface PetFormProps {
  onNext: (petId: number) => void;
}

const PetForm: React.FC<PetFormProps> = ({ onNext }) => {
  const { register, handleSubmit, setValue } = useForm<Pet>();
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [ageUnit, setAgeUnit] = useState<string>("months"); // Default to months
  const [createPet] = useCreatePetMutation();
  const [images, setImages] = useState<File[]>([]);

  // Fetch categories when the form loads
  const { data: categoryResponse, isLoading: isCategoryLoading, error: categoryError } = useGetCategoriesQuery();

  // Fetch breeds only when a category is selected
  const { data: breedResponse, isLoading: isBreedLoading, error: breedError } = useGetBreedsByCategoryQuery(
    selectedCategory ?? 0,
    { skip: !selectedCategory }
  );

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setImages([...images, ...Array.from(event.target.files)]);
    }
  };

  const onSubmit = async (data: Pet) => {
    try {
      const formData = new FormData();
      images.forEach((image) => formData.append("images", image));

      // Append age unit
      const petData = {
        ...data,
        age_unit: ageUnit, // Include age unit
      };

      formData.append("pet", JSON.stringify(petData));

      const response = await createPet({ pet: petData }).unwrap();
      onNext(response.data.pet_id);
    } catch (error) {
      console.error("Failed to create pet", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Category Selection */}
      <Select onValueChange={(val) => { 
          const categoryId = Number(val);
          setValue("category_id", categoryId);
          setSelectedCategory(categoryId);
        }}>
        <SelectTrigger>
          <SelectValue placeholder="Select Category" />
        </SelectTrigger>
        <SelectContent>
          {isCategoryLoading ? (
            <SelectItem disabled value="loading">Loading Categories...</SelectItem>
          ) : categoryError ? (
            <SelectItem disabled value="error">Failed to Load Categories</SelectItem>
          ) : (
            categoryResponse?.data?.map((cat) => (
              <SelectItem key={cat.id} value={String(cat.id)}>{cat.category_name}</SelectItem>
            ))
          )}
        </SelectContent>
      </Select>

      {/* Breed Selection (Disabled until a category is selected) */}
      <Select
        onValueChange={(val) => setValue("breed_id", Number(val))}
        disabled={!selectedCategory}
      >
        <SelectTrigger>
          <SelectValue placeholder={selectedCategory ? "Select Breed" : "Select Category First"} />
        </SelectTrigger>
        <SelectContent>
          {isBreedLoading ? (
            <SelectItem disabled value="loading">Loading Breeds...</SelectItem>
          ) : breedError ? (
            <SelectItem disabled value="error">Failed to Load Breeds</SelectItem>
          ) : (
            breedResponse?.data?.map((breed) => (
              <SelectItem key={breed.id} value={String(breed.id)}>{breed.breed_name}</SelectItem>
            ))
          )}
        </SelectContent>
      </Select>

      {/* Age Input + Age Unit Selection */}
      <div className="flex gap-2">
        <Input type="number" placeholder="Age" {...register("age", { required: true })} />
        <Select onValueChange={(val) => setAgeUnit(val)}>
          <SelectTrigger><SelectValue placeholder="Unit" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="days">Days</SelectItem>
            <SelectItem value="months">Months</SelectItem>
            <SelectItem value="years">Years</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Gender Selection */}
      <Select onValueChange={(val) => setValue("gender", val as "1" | "2")}>
        <SelectTrigger><SelectValue placeholder="Select Gender" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="1">Male</SelectItem>
          <SelectItem value="2">Female</SelectItem>
        </SelectContent>
      </Select>

      {/* Temperament */}
      <Input type="text" placeholder="Temperament" {...register("temperament")} />

      {/* Status Selection */}
      <Select onValueChange={(val) => setValue("status", val as "1" | "2")}>
        <SelectTrigger><SelectValue placeholder="Select Status" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="1">Available</SelectItem>
          <SelectItem value="2">Not Available</SelectItem>
        </SelectContent>
      </Select>

      {/* Vaccination Status */}
      <label>
        <input type="checkbox" {...register("vaccination_status")} /> Vaccinated
      </label>

      {/* Medical History (Textarea) */}
      <Textarea placeholder="Medical History" {...register("medical_history")} />

      {/* Recommended Food (Textarea) */}
      <Textarea placeholder="Recommended Food" {...register("recommended_food")} />

      {/* Common Health Issues (Textarea) */}
      <Textarea placeholder="Common Health Issues" {...register("common_health_issues")} />

      {/* Multiple Image Upload */}
      <label className="block">
        Upload Images:
        <Input type="file" accept="image/*" multiple onChange={handleFileChange} />
      </label>
      <div className="grid grid-cols-3 gap-2">
        {images.map((image, index) => (
          <img key={index} src={URL.createObjectURL(image)} alt="Pet Preview" className="h-20 w-20 object-cover rounded-md" />
        ))}
      </div>

      <Button type="submit">Next</Button>
    </form>
  );
};

export default PetForm;
