import {LoanCalculatorResponse} from '../types/api';
import {LoanCalculatorFromInputs} from '../components/forms/LoanCalculatorForm/LoanCalculatorForm';

export interface LoanCalculatorResponseRaw {
  'Payment Every Month': number;
  'Total Payments': number;
  'Total Interest': number;
  'Principal Percentage': number;
  'Interest Percentage': number;
  'Amortization Schedule': {
    Period: number;
    'Beginning Balance': number;
    Interest: number;
    Principal: number;
    'Ending Balance': number;
  }[];
}

export const transformLoanCalculatorResponse = (
  apiResponse: LoanCalculatorResponseRaw,
): LoanCalculatorResponse => {
  return {
    paymentEveryMonth: apiResponse['Payment Every Month'],
    totalPayments: apiResponse['Total Payments'],
    totalInterest: apiResponse['Total Interest'],
    principalPercentage: apiResponse['Principal Percentage'],
    interestPercentage: apiResponse['Interest Percentage'],
    amortizationSchedule: apiResponse['Amortization Schedule'].map(entry => ({
      period: entry.Period,
      beginningBalance: entry['Beginning Balance'],
      interest: entry.Interest,
      principal: entry.Principal,
      endingBalance: entry['Ending Balance'],
    })),
  };
};

export const transformLoanCalculatorRequest = ({
  apiRequest,
}: {
  apiRequest: LoanCalculatorFromInputs;
}) => {
  return {
    loan_amount: apiRequest.loanAmount,
    interest_rate: apiRequest.interestRate,
    loan_term: {
      years: apiRequest.loanTerm.years ?? 0,
      months: apiRequest.loanTerm.months ?? 0,
    },
    compound: apiRequest.compound,
    pay_back: apiRequest.payBack,
  };
};

export const getYearForPeriod = (period: number) => {
  return Math.ceil(period / 12);
};
