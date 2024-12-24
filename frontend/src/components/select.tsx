import { SelectHTMLAttributes } from 'react';

export function Select(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return <select className="w-full appearance-none bg-background text-primary" {...props} />;
}
