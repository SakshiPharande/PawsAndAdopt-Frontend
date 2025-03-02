import { signInApi } from '@/auth/api/signInApi';
import { signUpApi } from '@/auth/api/signUpApi';
import { adoptionApi } from '@/feature/AdoptPet/api/adoptPetApi';
import { showAllPetsApi } from '@/feature/Pets/api/showAllPetsApi';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    [signUpApi.reducerPath]: signUpApi.reducer,
    [signInApi.reducerPath]: signInApi.reducer,
    [showAllPetsApi.reducerPath]: showAllPetsApi.reducer,
    [adoptionApi.reducerPath]: adoptionApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(signUpApi.middleware, signInApi.middleware, showAllPetsApi.middleware, adoptionApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
