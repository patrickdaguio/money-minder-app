import { useState } from "react";

export interface ValidationConfig {
  validateFn: (value: string) => boolean;
  errorMessage: string;
}

const useForm = (validationConfig: ValidationConfig[]) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);
  const [activeErrorIndex, setActiveErrorIndex] = useState<number | null>(null);

  const validationResults = validationConfig.map((validation) =>
    validation.validateFn(enteredValue)
  );
  const hasError = isTouched && validationResults.some((isValid) => !isValid);

  const errorMessages = validationConfig.map((validation, index) =>
    validationResults[index] ? "" : validation.errorMessage
  );

  const formInputChangeHandler = (value: string) => {
    setEnteredValue(value);
  };

  const formInputBlurHandler = () => {
    setIsTouched(true);
    setActiveErrorIndex(null);
    for (let i = 0; i < validationResults.length; i++) {
      if (!validationResults[i]) {
        setActiveErrorIndex(i);
        break;
      }
    }
  };

  const resetInput = () => {
    setEnteredValue("");
    setIsTouched(false);
    setActiveErrorIndex(null);
  };

  return {
    value: enteredValue,
    isValid: validationResults.every((isValid) => isValid),
    hasError,
    activeErrorIndex,
    errorMessages,
    formInputChangeHandler,
    formInputBlurHandler,
    resetInput,
  };
};

// The rest of the component code remains the same
// ...

export default useForm;
