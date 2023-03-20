import { ComponentPropsWithoutRef } from "react";

type Props = ComponentPropsWithoutRef<"div">;

export default function Container({ children }: Props) {
  return (
    <div className="m-auto w-4/5 rounded-sm border border-slate-50 dark:border-slate-800">
      {children}
    </div>
  );
}
