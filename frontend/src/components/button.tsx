import { SelectHTMLAttributes } from 'react';

export function Button(props: SelectHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className="w-full px-1 text-sm border rounded-lg appearance-none cursor-pointer focus:outline-offset-2 focus-visible:outline focus:outline-1 focus:outline-primary hover:text-white bg-background text-primary border-primary hover:bg-primary-dark hover:border-primary-dark"
      {...props}
    />
  );
}
