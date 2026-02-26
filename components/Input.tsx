import { InputHTMLAttributes, forwardRef } from 'react';
import { clsx } from 'clsx';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  hasDropdown?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ hasDropdown = false, className, ...props }, ref) => {
    return (
      <div className="relative">
        <input
          ref={ref}
          className={clsx(
            'w-full h-10 bg-white text-[var(--input-fg)] text-sm font-medium rounded-[var(--radius-md)] px-3 outline-none',
            'border border-[var(--input-border)]',
            'placeholder:text-[var(--input-placeholder)]',
            'focus:ring-1 focus:ring-[var(--accent-strong-bg)] transition-shadow',
            hasDropdown ? 'pr-8' : 'pr-3',
            className
          )}
          {...props}
        />
        {hasDropdown && (
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
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
export default Input;
