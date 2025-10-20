import type { FC } from "react";
import Image from "next/image";

const TodoHeader: FC = () => {
  return (
    <div className="mb-8 text-center">
      <div className="flex justify-center items-center gap-4">
        <Image
          src="/accountability.png"
          alt="Todo Icon"
          width={64}
          height={64}
          className="object-contain"
          priority // makes sure this loads fast (good for LCP)
        />
        <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">
          My Todo List
        </h1>
      </div>
    </div>
  );
};

export default TodoHeader;
