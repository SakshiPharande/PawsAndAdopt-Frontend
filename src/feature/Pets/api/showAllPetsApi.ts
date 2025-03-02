import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { PetsResponse } from '../types/petType';

export const showAllPetsApi = createApi({
  reducerPath: 'showAllPetsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api/v1' }),
  endpoints: (builder) => ({
    getAllPets: builder.query<PetsResponse, void>({
      query: () => '/pets',
      transformResponse: (response: PetsResponse) => {
        if (response.success) {
          return response;
        } else {
          throw new Error(response.message || 'Failed to fetch pets');
        }
      },
    }),
  }),
});

export const { useGetAllPetsQuery } = showAllPetsApi;
