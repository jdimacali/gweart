import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import clsx from "clsx";
import LinktreeLink from "./components/LinktreeLink";
import getLinktree from "@/actions/getLinktree";

const Page = async () => {
  const linktree = await getLinktree();

  return (
    <section className="h-full w-full flex flex-col items-center pb-">
      <div
        className={clsx(
          "bg-[url('../public/background/bg3.png')] w-full h-full bg-cover bg-origin-content bg-clip-border max-sm:bg-contain max-sm:bg-top bg-inherit bg-fixed pb-[8rem]"
        )}
      >
        <div className="flex flex-col justify-center items-center w-full">
          <Avatar className="mt-10 h-[60px] w-[60px]">
            <AvatarImage src="./icon/gwe.png" className="pointer-events-none" />
            {linktree?.Title}
            <AvatarFallback>GweArt</AvatarFallback>
          </Avatar>
          <h1 className="text-white font-semibold text-2xl mt-4">GweArt</h1>
          <h1 className="text-white font-semibold text-md opacity-60">
            {linktree?.Subtitle}
          </h1>
        </div>
        <div className="flex flex-col items-center text-center justify-center text-black gap-y-10 mt-8">
          {!linktree && <div> There are no links currently </div>}
          {linktree.Links.map((link) => (
            <LinktreeLink
              key={link.id}
              name={link.name}
              url={link.url}
              icon={link.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
export default Page;
