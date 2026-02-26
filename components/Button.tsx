import { ButtonHTMLAttributes } from 'react';
import { clsx } from 'clsx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'accent';
  size?: 'default' | 'sm';
  fullWidth?: boolean;
}

export default function Button({
  variant = 'primary',
  size = 'default',
  fullWidth = false,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        'flex items-center justify-center rounded text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-strong-bg)]',
        {
          'h-10 px-4': size === 'default',
          'h-8 px-3': size === 'sm',
          'bg-[var(--primary-bg)] text-[var(--primary-fg)] border border-[var(--primary-border)] hover:opacity-90 shadow-sm disabled:opacity-50': variant === 'primary',
          'bg-[var(--secondary-bg)] text-[var(--secondary-fg)] border border-[var(--border-default)] hover:bg-[var(--bg-canvas)] shadow-sm disabled:opacity-50': variant === 'secondary',
          'bg-transparent text-[var(--fg-default)] hover:text-[var(--fg-strong)] disabled:opacity-50': variant === 'ghost',
          'bg-[var(--accent-strong-bg)] text-[var(--accent-strong-fg)] border border-[var(--accent-strong-border)] hover:opacity-90 shadow-sm disabled:opacity-50': variant === 'accent',
          'w-full': fullWidth,
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
