import React, { createContext, useContext } from 'react';

interface UserLocationContextType {
  userLocation: {lat: number; lan: number} | undefined;
  setUserLocation: React.Dispatch<React.SetStateAction<any>>;
  sourceCoordinates: any;
  setSourceCoordinates: React.Dispatch<React.SetStateAction<any>>;
  destinationCoordinates: any; 
  setDestinationCoordinates: React.Dispatch<React.SetStateAction<any>>;
  directationData: any; 
  setdirectationData: React.Dispatch<React.SetStateAction<any>>;
  afterBookingDirectationData: any; 
  setAfterBookingDdirectationData: React.Dispatch<React.SetStateAction<any>>;
  paymentAmount: any; 
  setPaymentAmount: React.Dispatch<React.SetStateAction<any>>;
  sourceAddress: any; 
  setSourceAddress: React.Dispatch<React.SetStateAction<any>>;
  destinationAddress: any; 
  setDestinationAddress: React.Dispatch<React.SetStateAction<any>>;
  carDetails: any; 
  setCarDetails: React.Dispatch<React.SetStateAction<any>>;
  timeDuratation: any; 
  setTimeDuratation: React.Dispatch<React.SetStateAction<any>>;
}

export const UserLocationContext = createContext<UserLocationContextType | undefined>(undefined);

export const useUserLocation = () => {
  const context = useContext(UserLocationContext);
  if (!context) {
    throw new Error("useUserLocation must be used within a UserLocationProvider");
  }
  return context;
};

// import React, { createContext, useState, ReactNode, useContext } from 'react';

// // Define the context type
// interface UserLocationContextType {
//   userLocation: { lat: number; lan: number } | undefined;
//   setUserLocation: React.Dispatch<React.SetStateAction<any>>;
//   sourceCoordinates: any;
//   setSourceCoordinates: React.Dispatch<React.SetStateAction<any>>;
//   destinationCoordinates: any;
//   setDestinationCoordinates: React.Dispatch<React.SetStateAction<any>>;
//   directationData: any;
//   setdirectationData: React.Dispatch<React.SetStateAction<any>>;
//   paymentAmount: any;
//   setPaymentAmount: React.Dispatch<React.SetStateAction<any>>;
// }

// // Create the context with a default value
// const UserLocationContext = createContext<UserLocationContextType | undefined>(undefined);

// // Create a provider component
// export const UserLocationProvider = ({ children }: { children: ReactNode }) => {
//   const [userLocation, setUserLocation] = useState<{ lat: number; lan: number } | undefined>(undefined);
//   const [sourceCoordinates, setSourceCoordinates] = useState<any>(null);
//   const [destinationCoordinates, setDestinationCoordinates] = useState<any>(null);
//   const [directationData, setdirectationData] = useState<any>(null);
//   const [paymentAmount, setPaymentAmount] = useState<any>(null);

//   return (
//     <UserLocationContext.Provider
//       value={{
//         userLocation,
//         setUserLocation,
//         sourceCoordinates,
//         setSourceCoordinates,
//         destinationCoordinates,
//         setDestinationCoordinates,
//         directationData,
//         setdirectationData,
//         paymentAmount,
//         setPaymentAmount,
//       }}
//     >
//       {children}
//     </UserLocationContext.Provider>
//   );
// };

// // Custom hook to use the context
// export const useUserLocation = (): UserLocationContextType => {
//   const context = useContext(UserLocationContext);
//   if (!context) {
//     throw new Error('useUserLocation must be used within a UserLocationProvider');
//   }
//   return context;
// };
