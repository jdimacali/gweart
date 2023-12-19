import Link from "next/link";

interface LinktreeLinkProps {
  name: string;
  url: string;
  icon?: string;
}

const LinktreeLink = ({ name, url, icon }: LinktreeLinkProps) => {
  return (
    <Link href={url} target="blank">
      <div
        className="rounded-full text-white flex items-center justify-center bg-gray-600 border-gray-700 w-[22rem]
        font-semibold border-b-[5px] border-r-[5px] p-4 gap-x-4 hover:animate-bounce hover:opacity-90 transition shadow-lg shadow-gray-900/50 hover:delay-150 "
      >
        <h1 className="text-sm">{name}</h1>
        {icon && <div> {icon} </div>}
      </div>
    </Link>
  );
};
export default LinktreeLink;
