import type { ReactNode } from "react";

type AdminPageHeaderProps = {
  sectionLabel: string;
  title: string;
  actions?: ReactNode;
};

export function AdminPageHeader({
  sectionLabel,
  title,
  actions,
}: AdminPageHeaderProps) {
  return (
    <header className="border-b border-relatoo-gray-light bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-relatoo-green-dark">
            {sectionLabel}
          </p>
          <h1 className="text-lg font-semibold text-relatoo-dark">{title}</h1>
        </div>
        {actions ? <div className="flex items-center gap-2">{actions}</div> : null}
      </div>
    </header>
  );
}
