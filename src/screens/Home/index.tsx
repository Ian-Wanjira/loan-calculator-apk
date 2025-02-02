import React, {useState} from 'react';
import {Text, ScrollView} from 'react-native';

import {styles} from './styles';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {
  LoanCalculatorForm,
  LoanCalculatorFromInputs,
} from '../../components/forms/LoanCalculatorForm/LoanCalculatorForm';
import {getApiError} from '../../utils/errorController';
import {calculateLoan} from '../../apis/loanCalculatorApi';
import {useLoan} from '../../context/LoanContext';
import {Header} from '../../components/Header';
import {useAuth} from '../../context';

const Home: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {setLoanData} = useLoan();
  // Global error state for calculation failures
  const [globalError, setGlobalError] = useState<string | null>(null);
  const {logout} = useAuth();

  // Access navigation object from React Navigation
  const navigation = useNavigation();

  const onSubmit = async (data: LoanCalculatorFromInputs) => {
    setIsLoading(true);
    setGlobalError(null); // Reset any previous error
    try {
      if (!data.loanTerm.years && !data.loanTerm.months) {
        setGlobalError(
          'Please provide at least one loan term: years or months',
        );
        return;
      }
      const response = await calculateLoan(data);
      console.log('Response:', response);

      // Validate the response
      if (
        !response ||
        typeof response.paymentEveryMonth !== 'number' ||
        typeof response.totalPayments !== 'number' ||
        typeof response.totalInterest !== 'number' ||
        !Array.isArray(response.amortizationSchedule)
      ) {
        throw new Error('Invalid loan calculation response');
      }
      setLoanData(response); // Store the loan data in context
      navigation.navigate('Results'); // Navigate to Results screen
    } catch (error) {
      // If the error has a global "detail" message, use that.
      console.log('Error:', error);
      if (
        axios.isAxiosError(error) &&
        error.response &&
        error.response.data &&
        typeof error.response.data === 'object' &&
        error.response.data.detail
      ) {
        const message = getApiError(error.response.data.detail);
        setGlobalError(message);
      } else {
        const message = getApiError((error as any)?.message);
        setGlobalError(message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <Header title="Home" onLogoutPress={handleLogout} />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>Loan Calculator</Text>
        {/* Display global error message if one exists */}
        {globalError && (
          <Text style={styles.globalErrorText}>{globalError}</Text>
        )}
        <LoanCalculatorForm onSubmit={onSubmit} isLoading={isLoading} />
      </ScrollView>
    </>
  );
};

export {Home};
