import { DetailedHTMLProps, InputHTMLAttributes } from 'react';

export function Input(props: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) {
  return (
    <input
      className="w-full px-3 py-2 border rounded-lg appearance-none cursor-pointer focus:outline-offset-2 focus-visible:outline focus:outline-1 focus:outline-primary hover:text-white bg-background text-primary border-primary hover:bg-primary-dark hover:border-primary-dark"
      {...props}
    />
  );
}
