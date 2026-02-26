import { ReactNode } from 'react';

interface FormFieldProps {
  label: string;
  labelNote?: string;
  helperText?: string;
  children: ReactNode;
  htmlFor?: string;
}

export default function FormField({ label, labelNote, helperText, children, htmlFor }: FormFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <label
          htmlFor={htmlFor}
          className="text-[var(--fg-strong)] text-sm font-semibold"
        >
          {label}
        </label>
        {labelNote && (
          <span className="text-[var(--fg-default)] text-sm">{labelNote}</span>
        )}
      </div>
      {helperText && (
        <p className="text-[var(--fg-default)] text-sm leading-relaxed">{helperText}</p>
      )}
      {children}
    </div>
  );
}
