import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const adoptionApi = createApi({
  reducerPath: "adoptionApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/v1",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token"); // Get token from localStorage
      if (token) {
        headers.set("Authorization", `Bearer ${token}`); // Set Bearer Token
      }
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    adoptPet: builder.mutation({
      query: (adoptionData) => ({
        url: "/show_adoptions",
        method: "POST",
        body: adoptionData,
      }),
    }),
  }),
});

export const { useAdoptPetMutation } = adoptionApi;
