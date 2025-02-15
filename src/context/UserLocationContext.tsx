// import React, { createContext, useContext } from 'react';

// interface UserLocationContextType {
//   userLocation: { lat: number; lan: number } | undefined;
//   setUserLocation: React.Dispatch<React.SetStateAction<any>>;
// }

// export const UserLocationContext = createContext<UserLocationContextType | undefined>(undefined);

// export const useUserLocation = () => {
//   const context = useContext(UserLocationContext);
//   if (!context) {
//     throw new Error("useUserLocation must be used within a UserLocationProvider");
//   }
//   return context;
// };


import React, { createContext, useContext, useState } from 'react';

interface UserLocationContextType {
  userLocation: {lat: number; lan: number} | undefined;
  setUserLocation: React.Dispatch<React.SetStateAction<any>>;
  sourceCoordinates: any;
  setSourceCoordinates: React.Dispatch<React.SetStateAction<any>>;
  destinationCoordinates: any; 
  setDestinationCoordinates: React.Dispatch<React.SetStateAction<any>>;
  directationData: any; 
  setdirectationData: React.Dispatch<React.SetStateAction<any>>;
}

export const UserLocationContext = createContext<UserLocationContextType | undefined>(undefined);

export const useUserLocation = () => {
  const context = useContext(UserLocationContext);
  if (!context) {
    throw new Error("useUserLocation must be used within a UserLocationProvider");
  }
  return context;
};