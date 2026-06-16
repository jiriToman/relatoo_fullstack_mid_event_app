type DetailFieldProps = {
  label: string;
  value: string;
  emphasized?: boolean;
};

export function DetailField({ label, value, emphasized = false }: DetailFieldProps) {
  return (
    <div>
      <dt className="text-relatoo-gray">{label}</dt>
      <dd className={emphasized ? "font-medium text-relatoo-dark" : "text-relatoo-dark"}>
        {value}
      </dd>
    </div>
  );
}
