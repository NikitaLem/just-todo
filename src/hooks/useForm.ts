import { useCallback, useState } from 'react';

export const useForm = <T extends { [key: string]: string | number }>(initialValues: T) => {
  const [values, setValues] = useState(initialValues);
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      const newValue = typeof initialValues[e.target.name] === 'string' ? e.target.value : Number(e.target.value);
      setValues({ ...values, [e.target.name]: newValue });
    },
    [initialValues, values]
  );
  const clearForm = useCallback(() => {
    setValues({ ...initialValues });
  }, [initialValues]);

  return { values, handleChange, clearForm };
};
