import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { SignInRequest, SignInResponse } from '../types/signin-type';


export const signInApi = createApi({
  reducerPath: 'signInApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/api/v1',
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    signInUser: builder.mutation<SignInResponse, SignInRequest>({
      query: (credentials) => ({
        url: '/login',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

export const { useSignInUserMutation } = signInApi;

