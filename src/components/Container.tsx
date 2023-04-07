import { ComponentPropsWithoutRef } from "react";

type Props = ComponentPropsWithoutRef<"div">;

export default function Container({ children }: Props) {
  return (
    <div className="container flex h-full flex-col overflow-hidden border-x border-neutral-300 bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-900 ">
      {children}
    </div>
  );
}
