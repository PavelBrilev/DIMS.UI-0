export const setTextValidationRules = (fieldName) => ({
  required: { value: true, errorMessage: `Please enter a ${fieldName}` },
  minLength: {
    value: 3,
    errorMessage: `Your ${fieldName} must be between 3 and 16 characters`,
  },
  maxLength: {
    value: 16,
    errorMessage: `Your ${fieldName} must be between 3 and 16 characters`,
  },
});

export const setTextAreaValidationRules = () => ({
  required: { value: true },
  pattern: { value: '^[A-Za-z0-9]+$' },
});

export const setDateValidationRules = () => ({
  required: { value: true },
  date: { format: 'MM/DD/YYYY' },
});

export const setScoreValidationRules = (fieldName) => ({
  required: {
    value: true,
    errorMessage: `Enter ${fieldName} score`,
  },
  min: { value: 1, errorMessage: 'Must be more than 1' },
  max: { value: 10, errorMessage: 'Must be less than 10' },
});
