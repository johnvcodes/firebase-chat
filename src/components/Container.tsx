import { ComponentPropsWithoutRef } from "react";

type Props = ComponentPropsWithoutRef<"div">;

export default function Container({ children }: Props) {
  return (
    <div className="m-auto flex h-4/5 w-4/5 flex-col overflow-hidden rounded border border-neutral-300 bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-900 ">
      {children}
    </div>
  );
}
