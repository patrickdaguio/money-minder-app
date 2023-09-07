import { ValidationConfig } from "@js/hooks/useForm";

const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const emailValidation: ValidationConfig = {
  validateFn: (value) => emailRegex.test(value),
  errorMessage: "Please enter a valid email address",
};

export const passwordValidation: ValidationConfig = {
  validateFn: (value) => value.trim().length >= 6,
  errorMessage: "Password must be at least 6 characters",
};

export const requiredValidation: ValidationConfig = {
  validateFn: (value) => value.trim() !== "",
  errorMessage: "This field is required",
};
