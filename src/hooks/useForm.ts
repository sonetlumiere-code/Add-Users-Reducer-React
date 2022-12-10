import { ChangeEvent, useState } from 'react';

export const useForm = (formState: any, fn: any = null) => {

  const [values, setValues] = useState(formState)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (fn) {
      fn();   // dispatch
    }
  }

  return [values, handleChange, handleSubmit];
}
