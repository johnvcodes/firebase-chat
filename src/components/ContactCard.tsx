import React from "react";

type Props = {
  id: string;
  name: string;
  online: boolean;
};

export default function ContactCard({ id, name, online }: Props) {
  return (
    <div className="flex w-40 items-center gap-2 rounded border border-neutral-300 bg-neutral-800 p-2 dark:border-neutral-700">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-rose-500">
        {name.slice(0, 1)}
      </div>
      <div className="flex gap-2">
        <h2 className="self-center">{name}</h2>
        <span
          className={`flex h-2 w-2 items-center justify-center rounded-full ${
            online ? "bg-emerald-500" : "bg-rose-500"
          }`}
        ></span>
      </div>
    </div>
  );
}
