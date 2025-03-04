import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiResponse, CreateDonationResponse, CreatePetResponse, Donation, Pet } from "../types/donatePetType";

export const donationApi = createApi({
  reducerPath: "donationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/v1/donate_pets",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    createPet: builder.mutation<ApiResponse<CreatePetResponse>, { pet: Pet }>({
      query: (petData) => ({
        url: "/create_pet",
        method: "POST",
        body: petData,
      }),
    }),
    createDonation: builder.mutation<ApiResponse<CreateDonationResponse>, { pet_id: number; donate_pet: Donation }>({
      query: (donationData) => ({
        url: "/create_donation",
        method: "POST",
        body: donationData,
      }),
    }),
  }),
});

export const { useCreatePetMutation, useCreateDonationMutation } = donationApi;
