import * as React from 'react';
import { cn } from '@/lib/utils';

type InputBaseProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'prefix'>;

export interface InputProps extends InputBaseProps {
  prefix?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, prefix, ...props }, ref) => {
    return (
      <div className="relative">
        {prefix && <div className="absolute left-3 top-1/2 -translate-y-1/2">{prefix}</div>}
        <input
          type={type}
          className={cn(
            'flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-orange-600 disabled:cursor-not-allowed disabled:opacity-50',
            prefix && 'pl-9',
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };
