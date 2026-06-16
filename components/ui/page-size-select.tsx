type PageSizeSelectProps = {
  label: string;
  value: number;
  options: readonly number[];
  onChange: (value: number) => void;
};

export function PageSizeSelect({
  label,
  value,
  options,
  onChange,
}: PageSizeSelectProps) {
  return (
    <label className="flex items-center gap-2 text-sm text-relatoo-gray">
      <span>{label}:</span>
      <select
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="rounded-[5px] border border-relatoo-gray-light bg-white px-2 py-1 text-relatoo-dark"
      >
        {options.map((size) => (
          <option key={size} value={size}>
            {size}
          </option>
        ))}
      </select>
    </label>
  );
}
