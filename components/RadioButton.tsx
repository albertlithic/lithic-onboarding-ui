'use client';

interface RadioButtonProps {
  id?: string;
  checked: boolean;
  onChange: () => void;
  label: string;
}

export default function RadioButton({ id, checked, onChange, label }: RadioButtonProps) {
  return (
    <label
      htmlFor={id}
      className="flex items-center gap-2.5 cursor-pointer"
    >
      <button
        id={id}
        role="radio"
        aria-checked={checked}
        onClick={onChange}
        type="button"
        className={`shrink-0 w-4 h-4 rounded-full border flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-strong-bg)] bg-white ${
          checked
            ? 'border-[var(--accent-strong-bg)]'
            : 'border-[var(--input-border)]'
        }`}
      >
        {checked && (
          <span className="w-2 h-2 rounded-full bg-[var(--accent-strong-bg)]" />
        )}
      </button>
      <span className="text-[var(--fg-strong)] text-sm font-semibold">{label}</span>
    </label>
  );
}
