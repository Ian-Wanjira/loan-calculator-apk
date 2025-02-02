import * as yup from 'yup';

const loginSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const registerSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .required('Please confirm your password')
    .oneOf([yup.ref('password')], 'Passwords must match'),
});

const loanCalculatorSchema = yup.object().shape({
  loanAmount: yup
    .number()
    .typeError('Loan amount must be a number')
    .required('Loan amount is required'),
  interestRate: yup
    .number()
    .typeError('Interest rate must be a number')
    .required('Interest rate is required'),
  loanTerm: yup
    .object({
      years: yup.number().typeError('Years must be a number').nullable(),
      months: yup.number().typeError('Months must be a number').nullable(),
    })
    .test(
      'required-one',
      'Please provide at least one loan term: years or months',
      value => {
        if (!value) {
          return false;
        }
        const {years, months} = value;
        return (
          (typeof years === 'number' && years > 0) ||
          (typeof months === 'number' && months > 0)
        );
      },
    ),
  compound: yup
    .string()
    .oneOf(
      [
        'Annually (APY)',
        'Monthly (APR)',
        'Semi-annually',
        'Quarterly',
        'Semi-monthly',
        'Biweekly',
        'Weekly',
        'Daily',
        'Continuously',
      ],
      'Select a valid compound option',
    )
    .required('Compound option is required'),
  payBack: yup
    .string()
    .oneOf(
      [
        'Every Day',
        'Every Week',
        'Every 2 Weeks',
        'Every Half Month',
        'Every Month',
        'Every Quarter',
        'Every 6 Months',
        'Every Year',
      ],
      'Select a valid pay back option',
    )
    .required('Pay back option is required'),
});

export {loginSchema, registerSchema, loanCalculatorSchema};
