import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AdoptionResponse } from "../types/showAdoptRequestType";


export const showAdoptRequestApi = createApi({
  reducerPath: "viewAdoptRequestApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/v1/adopt_pets",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token"); // Get token from localStorage
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    fetchUserAdoptions: builder.query<AdoptionResponse, void>({
      query: () => ({
        url: "/show_adoptions",
        method: "GET",
      }),
    }),
  }),
});

export const { useFetchUserAdoptionsQuery } = showAdoptRequestApi;
