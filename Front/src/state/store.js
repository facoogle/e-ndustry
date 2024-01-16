import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';



 import usersCompany from '../state/slices/userCompanySlice';
import companySlice from "../state/slices/CompanySlice"
import allUsers from './slices/allUsers';
import companySliceID from './slices/CompanySliceID';
 //import mode from '../state/slices/modeSlice';
 




// Todos los  (Slices)

const rootReducer = combineReducers({
 // mode: mode,
  usersCompany: usersCompany,
  companySlice:companySlice,
  allUsers:allUsers,
  companySliceID:companySliceID

  
});

const localStorageConfig = {
  key: 'root',
  storage: storage,
  whitelist: ["language"] // especifica aquí los reductores que quieres persistir en Local Storage
};

const sessionConfig = {
  key: 'session',
  storage: sessionStorage,
  whitelist: ['user'] // especifica aquí los reductores que quieres persistir en Session Storage
};


 const localStorageReducer = persistReducer(localStorageConfig, combineReducers({
  //mode: mode,
  
  
}));


const sessionReducer = persistReducer(sessionConfig, combineReducers({
  //user: user,
}));



export const store = configureStore({
  reducer: persistReducer(localStorageConfig, rootReducer),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const sessionStore = configureStore({
  reducer: sessionReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
