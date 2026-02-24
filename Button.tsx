import { ButtonHTMLAttributes } from 'react';
import { clsx } from 'clsx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  fullWidth?: boolean;
}

export default function Button({
  variant = 'primary',
  fullWidth = false,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        'flex items-center justify-center h-10 px-4 rounded text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7F94FF]',
        {
          'bg-[#444444] text-white hover:bg-[#505050] disabled:opacity-50': variant === 'primary',
          'bg-[#333333] text-[#F0F0F0] hover:bg-[#3D3D3D] disabled:opacity-50': variant === 'secondary',
          'bg-transparent text-[#AAAAAA] hover:text-[#F0F0F0] disabled:opacity-50': variant === 'ghost',
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
