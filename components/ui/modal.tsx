import type { ReactNode } from "react";

type ModalProps = {
  open: boolean;
  title: string;
  titleId: string;
  closeLabel: string;
  onClose: () => void;
  children: ReactNode;
};

export function Modal({
  open,
  title,
  titleId,
  closeLabel,
  onClose,
  children,
}: ModalProps) {
  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-relatoo-dark/60 p-4"
      onClick={onClose}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="w-full max-w-lg rounded-xl bg-white p-6 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <h2 id={titleId} className="text-xl font-semibold text-relatoo-dark">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-relatoo-gray transition hover:text-relatoo-dark"
            aria-label={closeLabel}
          >
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
