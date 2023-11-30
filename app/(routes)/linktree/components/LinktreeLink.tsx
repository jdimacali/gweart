import Link from "next/link";

interface LinktreeLinkProps {
  social: {
    id: number;
    attributes: {
      name: string;
      url: string;
      icon?: string;
      // Add other attributes as needed
    };
  };
}
const LinktreeLink = ({ social }: LinktreeLinkProps) => {
  return (
    <Link href={social.attributes.url} target="blank">
      <div
        className="rounded-full text-white flex items-center justify-center bg-gray-600 border-gray-700 w-[30rem] 
        font-semibold border-b-[5px] border-r-[5px] p-4 gap-x-4 hover:animate-bounce hover:opacity-90 transition shadow-lg shadow-gray-900/50 hover:delay-150 "
      >
        <h1 className="text-md">{social.attributes.name}</h1>
      </div>
    </Link>
  );
};
export default LinktreeLink;
