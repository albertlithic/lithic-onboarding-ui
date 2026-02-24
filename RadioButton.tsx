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
        className="shrink-0 w-4 h-4 rounded-full border flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7F94FF]"
        style={{
          backgroundColor: '#222222',
          borderColor: checked ? '#7F94FF' : '#444444',
        }}
      >
        {checked && (
          <span className="w-2 h-2 rounded-full bg-[#7F94FF]" />
        )}
      </button>
      <span className="text-[#F0F0F0] text-sm font-semibold">{label}</span>
    </label>
  );
}
