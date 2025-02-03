import React, {createContext, useContext, useState, useMemo} from 'react';
import {LoanCalculatorResponse} from '../types/api';

// Define the LoanContext interface
interface LoanContextProps {
  loanData: LoanCalculatorResponse; // Store the loan calculation results
  setLoanData: (data: LoanCalculatorResponse) => void; // Function to update the loan data
}

// Create a default LoanCalculatorResponse object
const defaultLoanData: LoanCalculatorResponse = {
  paymentEveryMonth: 0,
  totalPayments: 0,
  totalInterest: 0,
  principalPercentage: 0,
  interestPercentage: 0,
  amortizationSchedule: [],
};

// Create the LoanContext
const LoanContext = createContext<LoanContextProps>({
  loanData: defaultLoanData,
  setLoanData: () => {},
});

// Provider component to wrap components that need access to loan data
interface LoanProviderProps {
  children: React.ReactNode;
}

export const LoanProvider: React.FC<LoanProviderProps> = ({children}) => {
  const [loanData, setLoanData] = useState<any>(null);

  // Memoize the context value to prevent unnecessary re-renders
  const value = useMemo(() => ({loanData, setLoanData}), [loanData]);

  return <LoanContext.Provider value={value}>{children}</LoanContext.Provider>;
};

// Custom hook to use the LoanContext
export const useLoan = () => {
  const context = useContext(LoanContext);
  if (!context) {
    throw new Error('useLoan must be used within a LoanProvider');
  }
  return context;
};
