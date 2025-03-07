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
import { GetBreedsResponse, GetCategoriesResponse, Pet } from "../types/donate-pet-type";
import { useCreatePetMutation } from "../api/donateApi";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { petFormSchema, validatePetImages } from "../validations/petform-validations";


interface PetFormProps {
  onNext?: (petId: number) => void;
}

const PetForm: React.FC<PetFormProps> = ({ onNext }) => {
  const { 
    register, 
    handleSubmit, 
    setValue, 
    formState: { errors } 
  } = useForm<Pet>({
    resolver: yupResolver(petFormSchema),
    mode: "onBlur" // Validate on blur for better UX
  });

  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [ageUnit, setAgeUnit] = useState<string>("months");
  const [createPet] = useCreatePetMutation();
  const [images, setImages] = useState<File[]>([]);
  const [imageError, setImageError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Fetch categories when the form loads
  const { data: categoryResponse, isLoading: isCategoryLoading, error: categoryError } = 
    useGetCategoriesQuery<GetCategoriesResponse>();

  const { data: breedResponse, isLoading: isBreedLoading, error: breedError } =
    useGetBreedsByCategoryQuery<GetBreedsResponse>(
      selectedCategory ?? 0,
      { skip: !selectedCategory }
    );

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files);
      const updatedImages = [...images, ...newFiles];
      
      // Validate images
      const validationError = validatePetImages(updatedImages);
      setImageError(validationError);
      
      if (!validationError) {
        setImages(updatedImages);
      }
    }
  };

  // Handle form submission
  const onSubmit = async (data: Pet) => {
    // Validate images before submission
    const imageValidationError = validatePetImages(images);
    if (imageValidationError) {
      setImageError(imageValidationError);
      return;
    }

    try {
      const formData = new FormData();
      
      // Add images to FormData
      images.forEach((image) => {
        formData.append("pet[pet_images][]", image);
      });

      // Add pet data to FormData
      formData.append("pet[age]", data.age.toString());
      formData.append("pet[age_unit]", ageUnit);
      formData.append("pet[gender]", data.gender.toString());
      formData.append("pet[temperament]", data.temperament);
      formData.append("pet[vaccination_status]", data.vaccination_status ? 'true' : 'false');
      formData.append("pet[medical_history]", data.medical_history);
      formData.append("pet[recommended_food]", data.recommended_food);
      formData.append("pet[common_health_issues]", data.common_health_issues);
      formData.append("pet[status]", data.status.toString());
      formData.append("pet[category_id]", data.category_id.toString());
      formData.append("pet[breed_id]", data.breed_id.toString());

      // Send the FormData with the createPet mutation
      const response = await createPet(formData).unwrap();
      
      if (response?.success) {
        if (onNext) {
          onNext(response.pet_id);
        } else {
          navigate(`/donation_form/${response.pet_id}`);
        }
      }
    } catch (error) {
      console.error("Failed to create pet", error);
    }
  };

  return (
    <div className="p-6 bg-[#FFFEFE] rounded-lg shadow-md max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-[#8A5691]">Donate Your Pet</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* First row - Category and Breed */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Category Selection */}
          <div>
            <label className="block text-[#8A5691] mb-2 font-medium">Pet Category</label>
            <Select 
              onValueChange={(val) => { 
                const categoryId = Number(val);
                setValue("category_id", categoryId, { shouldValidate: true });
                setSelectedCategory(categoryId);
              }}
            >
              <SelectTrigger className={`border-[#D1B0D2] focus:ring-[#A864AF] ${errors.category_id ? 'border-red-500' : ''}`}>
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent className="bg-[#FFFEFE]">
                {isCategoryLoading ? (
                  <SelectItem disabled value="loading">Loading Categories...</SelectItem>
                ) : categoryError ? (
                  <SelectItem disabled value="error">Failed to Load Categories</SelectItem>
                ) : (
                  categoryResponse?.categories?.map((cat) => (
                    <SelectItem key={Number(cat.id)} value={String(cat.id)}>{cat.category_name}</SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
            {errors.category_id && (
              <p className="text-red-500 text-sm mt-1">{errors.category_id.message}</p>
            )}
          </div>

          {/* Breed Selection */}
          <div>
            <label className="block text-[#8A5691] mb-2 font-medium">Pet Breed</label>
            <Select
              onValueChange={(val) => setValue("breed_id", Number(val), { shouldValidate: true })}
              disabled={!selectedCategory}
            >
              <SelectTrigger className={`border-[#D1B0D2] focus:ring-[#A864AF] ${errors.breed_id ? 'border-red-500' : ''}`}>
                <SelectValue placeholder={selectedCategory ? "Select Breed" : "Select Category First"} />
              </SelectTrigger>
              <SelectContent className="bg-[#FFFEFE]">
                {isBreedLoading ? (
                  <SelectItem disabled value="loading">Loading Breeds...</SelectItem>
                ) : breedError ? (
                  <SelectItem disabled value="error">Failed to Load Breeds</SelectItem>
                ) : (
                  breedResponse?.breeds?.map((breed) => (
                    <SelectItem key={Number(breed.id)} value={String(breed.id)}>{breed.breed_name}</SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
            {errors.breed_id && (
              <p className="text-red-500 text-sm mt-1">{errors.breed_id.message}</p>
            )}
          </div>
        </div>

        {/* Second row - Age and Gender */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Age Input + Age Unit Selection */}
          <div>
            <label className="block text-[#8A5691] mb-2 font-medium">Pet Age</label>
            <div className="flex gap-2">
              <Input 
                type="number" 
                placeholder="Age" 
                {...register("age")} 
                className={`border-[#D1B0D2] focus:ring-[#A864AF] ${errors.age ? 'border-red-500' : ''}`}
              />
              <Select onValueChange={(val) => setAgeUnit(val)} defaultValue="months">
                <SelectTrigger className="border-[#D1B0D2] focus:ring-[#A864AF]">
                  <SelectValue placeholder="Unit" />
                </SelectTrigger>
                <SelectContent className="bg-[#FFFEFE]">
                  <SelectItem value="days">Days</SelectItem>
                  <SelectItem value="months">Months</SelectItem>
                  <SelectItem value="years">Years</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {errors.age && (
              <p className="text-red-500 text-sm mt-1">{errors.age.message}</p>
            )}
          </div>

          {/* Gender Selection */}
          <div>
            <label className="block text-[#8A5691] mb-2 font-medium">Pet Gender</label>
            <Select onValueChange={(val) => setValue("gender", Number(val), { shouldValidate: true })}>
              <SelectTrigger className={`border-[#D1B0D2] focus:ring-[#A864AF] ${errors.gender ? 'border-red-500' : ''}`}>
                <SelectValue placeholder="Select Gender" />
              </SelectTrigger>
              <SelectContent className="bg-[#FFFEFE]">
                <SelectItem value="1">Male</SelectItem>
                <SelectItem value="2">Female</SelectItem>
              </SelectContent>
            </Select>
            {errors.gender && (
              <p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>
            )}
          </div>
        </div>

        {/* Third row - Temperament and Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Temperament */}
          <div>
            <label className="block text-[#8A5691] mb-2 font-medium">Temperament</label>
            <Input 
              type="text" 
              placeholder="Temperament" 
              {...register("temperament")} 
              className={`border-[#D1B0D2] focus:ring-[#A864AF] ${errors.temperament ? 'border-red-500' : ''}`}
            />
            {errors.temperament && (
              <p className="text-red-500 text-sm mt-1">{errors.temperament.message}</p>
            )}
          </div>

          {/* Status Selection */}
          <div>
            <label className="block text-[#8A5691] mb-2 font-medium">Availability Status</label>
            <Select onValueChange={(val) => setValue("status", Number(val), { shouldValidate: true })}>
              <SelectTrigger className={`border-[#D1B0D2] focus:ring-[#A864AF] ${errors.status ? 'border-red-500' : ''}`}>
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent className="bg-[#FFFEFE]">
                <SelectItem value="0">Available</SelectItem>
                <SelectItem value="1">Not Available</SelectItem>
              </SelectContent>
            </Select>
            {errors.status && (
              <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>
            )}
          </div>
        </div>

        {/* Vaccination Status */}
        <div>
          <div className="bg-[#E4D3E7] p-4 rounded-md inline-block">
            <label className="flex items-center space-x-3 text-[#8A5691]">
              <input 
                type="checkbox" 
                {...register("vaccination_status")} 
                className="rounded text-[#A864AF] focus:ring-[#A864AF] w-4 h-4"
              />
              <span className="font-medium">Pet is Vaccinated</span>
            </label>
          </div>
        </div>

        {/* Medical History (Textarea) */}
        <div>
          <label className="block text-[#8A5691] mb-2 font-medium">Medical History</label>
          <Textarea 
            placeholder="Enter pet's medical history" 
            {...register("medical_history")} 
            className={`border-[#D1B0D2] focus:ring-[#A864AF] w-full ${errors.medical_history ? 'border-red-500' : ''}`}
            rows={3}
          />
          {errors.medical_history && (
            <p className="text-red-500 text-sm mt-1">{errors.medical_history.message}</p>
          )}
        </div>

        {/* Recommended Food (Textarea) */}
        <div>
          <label className="block text-[#8A5691] mb-2 font-medium">Recommended Food</label>
          <Textarea 
            placeholder="Enter recommended food for the pet" 
            {...register("recommended_food")} 
            className={`border-[#D1B0D2] focus:ring-[#A864AF] w-full ${errors.recommended_food ? 'border-red-500' : ''}`}
            rows={3}
          />
          {errors.recommended_food && (
            <p className="text-red-500 text-sm mt-1">{errors.recommended_food.message}</p>
          )}
        </div>

        {/* Common Health Issues (Textarea) */}
        <div>
          <label className="block text-[#8A5691] mb-2 font-medium">Common Health Issues</label>
          <Textarea 
            placeholder="Enter any common health issues" 
            {...register("common_health_issues")} 
            className={`border-[#D1B0D2] focus:ring-[#A864AF] w-full ${errors.common_health_issues ? 'border-red-500' : ''}`}
            rows={3}
          />
          {errors.common_health_issues && (
            <p className="text-red-500 text-sm mt-1">{errors.common_health_issues.message}</p>
          )}
        </div>

        {/* Image upload */}
        <div>
          <label className="block text-[#8A5691] mb-2 font-medium">Upload Pet Images</label>
          <div className={`border-2 border-dashed ${imageError ? 'border-red-500' : 'border-[#D1B0D2]'} p-4 rounded-md`}>
            <Input 
              type="file" 
              accept="image/png, image/jpg, image/jpeg" 
              multiple 
              onChange={handleFileChange}
              className="border-none p-2" 
            />
            <p className="text-xs text-gray-500 mt-1">
              Maximum 5 images allowed (.jpg, .jpeg, .png), 5MB max size each
            </p>
          </div>
          {imageError && (
            <p className="text-red-500 text-sm mt-1">{imageError}</p>
          )}
        </div>

        {/* Image preview */}
        {images.length > 0 && (
          <div>
            <label className="block text-[#8A5691] mb-2 font-medium">Image Preview ({images.length} images)</label>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 bg-[#E4D3E7]/10 p-4 rounded-md border border-[#D1B0D2]">
              {images.map((image, index) => (
                <div key={index} className="relative">
                  <img 
                    src={URL.createObjectURL(image)} 
                    alt="Pet Preview" 
                    className="h-15 w-80 object-cover rounded-md border border-[#D1B0D2]" 
                  />
                  <button
                    type="button"
                    onClick={() => setImages(images.filter((_, i) => i !== index))}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="pt-3">
          <Button 
            type="submit"
            className="px-8 py-2 bg-[#A864AF] hover:bg-[#8A5691] text-white font-medium rounded-md transition-colors"
          >
            Continue to Next Step
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PetForm;