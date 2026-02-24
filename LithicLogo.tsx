export default function LithicLogo({ className }: { className?: string }) {
  return (
    <svg
      width="18"
      height="16"
      viewBox="0 0 18 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Lithic"
    >
      <rect x="0" y="0" width="8" height="8" rx="1" fill="#F0F0F0" />
      <rect x="10" y="0" width="8" height="8" rx="1" fill="#F0F0F0" />
      <rect x="0" y="10" width="8" height="6" rx="1" fill="#F0F0F0" />
      <rect x="10" y="10" width="8" height="6" rx="1" fill="#F0F0F0" />
    </svg>
  );
}
