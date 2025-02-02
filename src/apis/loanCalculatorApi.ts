// src/apis/loanCalculatorApis.ts
import axios from 'axios';
import {API_URL} from '@env';
import {
  transformLoanCalculatorResponse,
  LoanCalculatorResponseRaw,
  transformLoanCalculatorRequest,
} from '../utils/transformers';
import {LoanCalculatorResponse} from '../types/api';
import {LoanCalculatorFromInputs} from '../components/forms/LoanCalculatorForm/LoanCalculatorForm';

export const calculateLoan = async (
  data: LoanCalculatorFromInputs,
): Promise<LoanCalculatorResponse> => {
  // Transform the form inputs into the API request shape.
  const payload = transformLoanCalculatorRequest({apiRequest: data});

  const response = await axios.post<LoanCalculatorResponseRaw>(
    `${API_URL}/api/calculate-loan/`,
    payload,
  );
  return transformLoanCalculatorResponse(response.data);
};
