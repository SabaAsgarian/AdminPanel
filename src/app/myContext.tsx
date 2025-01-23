'use client';

import React, { createContext, useContext, useState } from 'react';

interface DashboardData {
  id: string;
  img: string;
  fname: string;
  lname: string;
  street: string;
  status: string;
  user: string;
  age: string;
  pass: string;
  city: string;
  email: string;
  mobile: string;
}

interface MyContextType {
  dashboardData: DashboardData[];
  setDashboardData: (data: DashboardData[]) => void;
  updateDashboardData: (updatedData: DashboardData) => void;
  deleteDashboardData: (id: string) => void;
  addDashboardData: (newData: DashboardData) => void;
  clearDashboardData: () => void;
}

const MyContext = createContext<MyContextType | undefined>(undefined);

export function MyContextProvider({ children }: { children: React.ReactNode }) {
  const [dashboardData, setDashboardData] = useState<DashboardData[]>([]);

  const updateDashboardData = (updatedData: DashboardData) => {
    setDashboardData(prevData => 
      prevData.map(item => 
        item.id === updatedData.id ? updatedData : item
      )
    );
  };

  const deleteDashboardData = (id: string) => {
    setDashboardData(prevData => 
      prevData.filter(item => item.id !== id)
    );
  };

  const clearDashboardData = () => {
    setDashboardData([]);
  };

  const addDashboardData = (newData: DashboardData) => {
    setDashboardData(prevData => [...prevData, newData]);
  };

  return (
    <MyContext.Provider value={{ 
      dashboardData, 
      setDashboardData,
      updateDashboardData, 
      deleteDashboardData, 
      addDashboardData,
      clearDashboardData
    }}>
      {children}
    </MyContext.Provider>
  );
}

export function useMyContext() {
  const context = useContext(MyContext);
  if (context === undefined) {
    throw new Error('useMyContext must be used within a MyContextProvider');
  }
  return context;
}

export default MyContext;
