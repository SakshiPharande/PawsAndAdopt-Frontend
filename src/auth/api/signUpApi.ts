import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { SignUpRequest, SignUpResponse } from '../types/signup-type';


export const signUpApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api/v1' }),
  endpoints: (builder) => ({
    registerUser: builder.mutation<SignUpResponse, SignUpRequest>({
      query: (user) => ({
        url: '/users',
        method: 'POST',
        body: user,
      }),
    }),
  }),
});

export const { useRegisterUserMutation } = signUpApi;
