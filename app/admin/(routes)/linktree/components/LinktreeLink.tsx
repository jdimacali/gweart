import { LucideIcon } from "lucide-react";
import Link from "next/link";

interface LinktreeLinkProps {
  label: string;
  link: string;
  icon: LucideIcon;
}

const LinktreeLink = ({ icon: Icon, label, link }: LinktreeLinkProps) => {
  return (
    <div>
      <Link key={label} href={link} target="blank">
        <div
          className="rounded-full text-white flex items-center justify-center bg-gray-600 border-gray-700 w-[30rem] 
        font-semibold border-b-[5px] border-r-[5px] p-4 gap-x-4 hover:animate-bounce hover:opacity-90 transition shadow-lg shadow-gray-900/50 hover:delay-150 "
        >
          <h1 className="text-md">{label}</h1>
          <Icon size={22} color="#ffffff" opacity={100} />
        </div>
      </Link>
    </div>
  );
};
export default LinktreeLink;
