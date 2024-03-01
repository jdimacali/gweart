import clsx from "clsx";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface PolicyProps {
  name: string;
  description: string;
}

const Policy = ({ name, description }: PolicyProps) => {
  const [show, setShow] = useState<boolean>(false);

  return (
    <div>
      <div key={name}>
        <div
          className="opacity-70 flex gap-x-1 hover:opacity-100 cursor-pointer"
          onClick={() => setShow((prev) => !prev)}
        >
          {name}{" "}
          <ChevronDown
            size={20}
            className={clsx("transition ease-linear", show && "rotate-180")}
          />
        </div>
        {show && (
          <div className="opacity-80 flex gap-x-1 pt-2">{description}</div>
        )}
      </div>
    </div>
  );
};
export default Policy;
