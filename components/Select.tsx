import { SelectHTMLAttributes, forwardRef } from 'react';
import { clsx } from 'clsx';

const Select = forwardRef<HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <div className="relative">
        <select
          ref={ref}
          className={clsx(
            'w-full h-10 bg-white text-[var(--input-fg)] text-sm font-medium rounded px-3 pr-8 outline-none appearance-none',
            'border border-[var(--input-border)]',
            'focus:ring-1 focus:ring-[var(--accent-strong-bg)] transition-shadow',
            className
          )}
          {...props}
        >
          {children}
        </select>
        <svg
          className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--fg-default)]"
          width="9"
          height="14"
          viewBox="0 0 9 14"
          fill="none"
        >
          <path d="M1 5L4.5 2L8 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M1 9L4.5 12L8 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    );
  }
);

Select.displayName = 'Select';
export default Select;
