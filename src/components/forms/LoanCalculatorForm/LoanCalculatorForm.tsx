import React from 'react';
import {View} from 'react-native';
import {useForm, UseFormSetError} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {FormControl} from '../../FormControl';
import {loanCalculatorSchema} from '../../../utils/validations';
import {styles} from './styles';
import {Button} from '../../Button';
import {CompoundOption, PaybackOption} from '../../../types/api';

const compoundOptions = [
  {label: 'Annually (APY)', value: 'Annually (APY)'},
  {label: 'Semi-annually', value: 'Semi-annually'},
  {label: 'Quarterly', value: 'Quarterly'},
  {label: 'Monthly (APR)', value: 'Monthly (APR)'},
  {label: 'Semi-monthly', value: 'Semi-monthly'},
  {label: 'Biweekly', value: 'Biweekly'},
  {label: 'Weekly', value: 'Weekly'},
  {label: 'Daily', value: 'Daily'},
  {label: 'Continuously', value: 'Continuously'},
];

const payBackOptions = [
  {label: 'Every Day', value: 'Every Day'},
  {label: 'Every Week', value: 'Every Week'},
  {label: 'Every 2 Weeks', value: 'Every 2 Weeks'},
  {label: 'Every Half Month', value: 'Every Half Month'},
  {label: 'Every Month', value: 'Every Month'},
  {label: 'Every Quarter', value: 'Every Quarter'},
  {label: 'Every 6 Months', value: 'Every 6 Months'},
  {label: 'Every Year', value: 'Every Year'},
];

export interface LoanCalculatorFromInputs {
  loanAmount: number;
  loanTerm: {
    years?: number | null;
    months?: number | null;
  };
  interestRate: number;
  compound: CompoundOption;
  payBack: PaybackOption;
}

interface LoanCalculatorFormProps {
  onSubmit: (data: any, setError: UseFormSetError<any>) => void;
  isLoading: boolean;
}

const LoanCalculatorForm: React.FC<LoanCalculatorFormProps> = ({
  onSubmit,
  isLoading,
}) => {
  const {
    control,
    handleSubmit,
    setError,
    formState: {errors},
  } = useForm<LoanCalculatorFromInputs>({
    resolver: yupResolver(loanCalculatorSchema),
  });

  const onLocalSubmit = (data: LoanCalculatorFromInputs) => {
    onSubmit(data, setError);
  };

  return (
    <View style={styles.form}>
      <FormControl
        type="textInput"
        control={control}
        name="loanAmount"
        label="Loan Amount"
        placeholder="Enter your loan amount"
        error={errors.loanAmount}
        icon="dollar-sign"
      />
      {/* Loan Term split into two inputs */}
      <View style={styles.loanTermsContainer}>
        <View style={styles.loanTermItem}>
          <FormControl
            type="textInput"
            control={control}
            name="loanTerm.years"
            label="Loan Term (Years)"
            placeholder="Years"
            error={errors?.loanTerm?.years as any}
            icon="clock"
          />
        </View>
        <View style={styles.loanTermItem}>
          <FormControl
            type="textInput"
            control={control}
            name="loanTerm.months"
            label="Loan Term (Months)"
            placeholder="Months"
            error={errors?.loanTerm?.months as any}
            icon="clock"
          />
        </View>
      </View>
      <FormControl
        type="textInput"
        control={control}
        name="interestRate"
        label="Interest Rate"
        placeholder="Enter your interest rate"
        error={errors.interestRate}
        icon="percent"
      />
      <FormControl
        type="select"
        control={control}
        name="compound"
        label="Compound Frequency"
        error={errors.compound}
        options={compoundOptions}
      />

      <FormControl
        type="select"
        control={control}
        name="payBack"
        label="Pay Back Option"
        error={errors.payBack}
        options={payBackOptions}
      />

      <Button
        title="Calculate"
        onPress={handleSubmit(onLocalSubmit)}
        isLoading={isLoading}
      />
    </View>
  );
};

export {LoanCalculatorForm};
