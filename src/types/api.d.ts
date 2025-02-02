export type CompoundOption =
  | 'Annually (APY)'
  | 'Semi-annually'
  | 'Quarterly'
  | 'Monthly (APR)'
  | 'Semi-monthly'
  | 'Biweekly'
  | 'Weekly'
  | 'Daily'
  | 'Continuously';
export type PaybackOption =
  | 'Every Day'
  | 'Every Week'
  | 'Every 2 Weeks'
  | 'Every Half Month'
  | 'Every Month'
  | 'Every Quarter'
  | 'Every 6 Months'
  | 'Every Year';

export interface LoginResponse {
  access: string;
  refresh: string;
}

export interface RegisterResponse {
  id: string;
  email: string;
  name: string;
}

export interface LoanCalculatorResponse {
  paymentEveryMonth: number;
  totalPayments: number;
  totalInterest: number;
  principalPercentage: number;
  interestPercentage: number;
  amortizationSchedule: AmortizationScheduleEntry[];
}

export interface AmortizationScheduleEntry {
  period: number;
  beginningBalance: number;
  interest: number;
  principal: number;
  endingBalance: number;
}

export interface LoanCalculatorApiRequest {
  loan_amount: number;
  interest_rate: number;
  loan_term: {
    years: number;
    months: number;
  };
  compound: string;
  pay_back: string;
}
