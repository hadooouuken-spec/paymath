type NumberFieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  prefix?: string;
  suffix?: string;
  hint?: string;
  inputMode?: "decimal" | "numeric";
};

export function NumberField({
  id,
  label,
  value,
  onChange,
  prefix,
  suffix,
  hint,
  inputMode = "decimal",
}: NumberFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-ink">
        {label}
      </label>
      <div className="mt-1.5 flex items-stretch rounded-lg border border-line bg-white focus-within:border-pine focus-within:ring-2 focus-within:ring-pine/20">
        {prefix ? (
          <span className="grid place-items-center pl-3 text-sm font-medium text-ink-muted">
            {prefix}
          </span>
        ) : null}
        <input
          id={id}
          type="text"
          inputMode={inputMode}
          autoComplete="off"
          spellCheck={false}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="min-w-0 flex-1 bg-transparent px-3 py-2.5 text-base text-ink outline-none"
        />
        {suffix ? (
          <span className="grid place-items-center pr-3 text-sm text-ink-muted">
            {suffix}
          </span>
        ) : null}
      </div>
      {hint ? <p className="mt-1 text-xs text-ink-muted">{hint}</p> : null}
    </div>
  );
}
