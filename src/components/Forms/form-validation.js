export const setValidationRules = (fieldName) => ({
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
