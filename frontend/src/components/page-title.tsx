import { HTMLAttributes } from 'react';

export function PageTitle({ children }: HTMLAttributes<HTMLHeadingElement>) {
  return <h2 className="pb-4 text-2xl font-bold text-primary">{children}</h2>;
}
