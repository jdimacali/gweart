const Header = () => {
  return (
    <div className="flex flex-col text-center items-center justify-center relative space-y-8 max-sm:top-10">
      <h3 className="flex gap-x-6 md:text-[5rem] sm:text-[4rem] max-sm:text-[3rem] font-dokdo">
        <div>
          <span className="inline-block -rotate-[12deg]  -translate-y-1">
            F
          </span>
          <span className="inline-block -rotate-[10deg] -translate-y-1">I</span>
          <span className="inline-block -rotate-[8deg] -translate-y-2">N</span>
          <span className="inline-block -rotate-[5deg] -translate-y-3">D</span>
        </div>
        <div>
          <span className="inline-block -rotate-[3deg] -translate-y-4">M</span>
          <span className="inline-block -rotate-[1deg] -translate-y-6">E</span>
        </div>
        <div>
          <span className="inline-block -rotate-[10deg] -translate-y-6">A</span>
          <span className="inline-block -rotate-[10deg] -translate-y-6">T</span>
        </div>
        <div>
          <span className="inline-block rotate-[9deg] -translate-y-4">T</span>
          <span className="inline-block rotate-[11deg] -translate-y-3">H</span>
          <span className="inline-block rotate-[14deg] -translate-y-2">E</span>
          <span className="inline-block rotate-[17deg] -translate-y-1">S</span>
          <span className="inline-block rotate-[20deg]">E</span>
        </div>
      </h3>
      <h1
        className={`flex xl:md:text-[8rem] md:text-[5rem] sm:text-[4rem] max-sm:text-[4rem] font-creep text-amber-100`}
      >
        <div className="flex gap-x-2">
          <span className="inline-block -rotate-[23deg] -translate-y-2">U</span>
          <span className="inline-block -rotate-[20deg] -translate-y-8">P</span>
          <span className="inline-block -rotate-[16deg] -translate-y-12">
            C
          </span>
          <span className="inline-block -rotate-[12deg] -translate-y-14">
            O
          </span>
          <span className="inline-block -rotate-[10deg] -translate-y-14">
            M
          </span>
          <span className="inline-block -rotate-[7deg] -translate-y-14">I</span>
          <span className="inline-block -rotate-[3deg] -translate-y-14">N</span>
          <span className="inline-block -rotate-[3deg] mr-8 -translate-y-14">
            G
          </span>
        </div>
        <div className="flex gap-x-2">
          <span className="inline-block rotate-[1deg] -translate-y-14">E</span>
          <span className="inline-block rotate-[4deg] -translate-y-14">V</span>
          <span className="inline-block rotate-[8deg] -translate-y-12">E</span>
          <span className="inline-block rotate-[19deg] -translate-y-10">N</span>
          <span className="inline-block rotate-[20deg] -translate-y-6">T</span>
          <span className="inline-block rotate-[23deg] -translate-y-2">S</span>
        </div>
      </h1>
    </div>
  );
};
export default Header;
