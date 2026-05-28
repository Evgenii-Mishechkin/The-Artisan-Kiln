"use client";

interface CartBracketFieldProps {
  value: string;
  onChange?: (value: string) => void;
  ariaLabel: string;
  inputMode?: "numeric" | "decimal";
}

export function CartBracketField({
  value,
  onChange,
  ariaLabel,
  inputMode = "numeric",
}: CartBracketFieldProps) {
  const readOnly = onChange == null;

  return (
    <div className="inline-flex items-center justify-center font-bold text-base tabular-nums text-kiln-navy">
      <span className="select-none text-kiln-navy/55">[</span>
      {readOnly ? (
        <span className="px-1 text-center">{value}</span>
      ) : (
        <input
          type="text"
          inputMode={inputMode}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-[2.8rem] border-0 bg-transparent p-0 text-center font-bold focus:outline-none focus:ring-0"
          aria-label={ariaLabel}
        />
      )}
      <span className="select-none text-kiln-navy/55">]</span>
    </div>
  );
}
