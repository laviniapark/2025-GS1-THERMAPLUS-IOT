import React, { createContext, useContext, useState } from 'react';

interface IotData {
  temperature: number;
  humidity: number;
  gasLevel: number;
  timestamp: string;
}

interface IotDataContextType {
  iotData: IotData;
  fetchIotData: () => Promise<void>;
}

const defaultIotData: IotData = {
  temperature: 36.5,
  humidity: 65,
  gasLevel: 1800,
  timestamp: new Date().toISOString()
};

const IotDataContext = createContext<IotDataContextType>({
  iotData: defaultIotData,
  fetchIotData: async () => {}
});

export const IotDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [iotData, setIotData] = useState<IotData>(defaultIotData);

  const fetchIotData = async () => {
    // Simula uma chamada à API
    setIotData(defaultIotData);
  };

  return (
    <IotDataContext.Provider value={{ iotData, fetchIotData }}>
      {children}
    </IotDataContext.Provider>
  );
};

export const useIotData = () => {
  const context = useContext(IotDataContext);
  if (!context) {
    throw new Error('useIotData must be used within an IotDataProvider');
  }
  return context;
}; 