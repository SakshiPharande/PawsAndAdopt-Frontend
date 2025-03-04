export interface Category {
    id: number;
    category_name: string;
  }
  
  export interface Breed {
    id: number;
    breed_name: string;
    category_id: number;
  }
  
  export interface Pet {
    id?: number;
    age: number;
    age_unit: string;
    gender: "1" | "2"; // 1 - Male, 2 - Female
    temperament: string;
    vaccination_status: boolean;
    medical_history: string;
    recommended_food: string;
    common_health_issues: string;
    status: "1" | "2"; // 1 - Available, 2 - Not Available
    pet_image_url: string;
    category_id: number;
    breed_id: number;
  }
  
  export interface Donation {
    id?: number;
    pet_id: number;
    email: string;
    address: string;
    phone_no: string;
    expected_donate_date: string;
  }
  
  // API Responses
  export interface ApiResponse<T> {
    success: boolean;
    data: T;
  }
  
  // Redux API Types
  export interface GetCategoriesResponse {
    categories: Category[];
  }
  
  export interface GetBreedsResponse {
    breeds: Breed[];
  }
  
  export interface CreatePetResponse {
    pet_id: number;
  }
  
  export interface CreateDonationResponse {
    success: boolean;
    message: string;
  }
  