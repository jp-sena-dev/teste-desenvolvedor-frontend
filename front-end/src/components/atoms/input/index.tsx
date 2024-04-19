import './input.scss';
import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  description: string
}

export function Input({ description, ...props }: InputProps) {

  return (
    <label id="input-container">
      {description}
      <input {...props} />
    </label>
  );
}
