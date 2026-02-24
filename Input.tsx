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
            'w-full h-10 bg-[#222222] text-[#F0F0F0] text-sm font-medium rounded px-3 outline-none',
            'placeholder:text-[#707070]',
            'focus:ring-1 focus:ring-[#7F94FF] transition-shadow',
            hasDropdown ? 'pr-8' : 'pr-3',
            className
          )}
          {...props}
        />
        {hasDropdown && (
          <svg
            className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
            width="9"
            height="14"
            viewBox="0 0 9 14"
            fill="none"
          >
            <path d="M1 5L4.5 2L8 5" stroke="#AAAAAA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M1 9L4.5 12L8 9" stroke="#AAAAAA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
export default Input;
