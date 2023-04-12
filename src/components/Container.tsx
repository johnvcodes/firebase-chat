import { ComponentPropsWithoutRef } from "react";

type Props = ComponentPropsWithoutRef<"div">;

export default function Container({ children }: Props) {
  return (
    <div className="container mx-auto flex h-full flex-col overflow-hidden border-x border-neutral-400 bg-neutral-50 shadow-md dark:border-neutral-700 dark:bg-neutral-900 ">
      {children}
    </div>
  );
}
