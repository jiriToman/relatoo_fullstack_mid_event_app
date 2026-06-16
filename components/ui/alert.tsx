type AlertProps = {
  message: string;
};

export function Alert({ message }: AlertProps) {
  return (
    <div
      role="alert"
      className="mt-6 rounded-[5px] border border-relatoo-error/30 bg-relatoo-error/10 px-4 py-3 text-sm text-relatoo-error"
    >
      {message}
    </div>
  );
}
