import Image from "next/image";

const Spin = () => {
  return (
    <div role="status" className="relative flex items-center justify-center">
      {/* Outer spinning ring */}
      <svg
        aria-hidden="true"
        className="w-16 h-16 animate-spin"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M 50 10
            A 40 40 0 1 1 49.9999 10"
          stroke="#8b46c4"
          strokeWidth="4"
          strokeLinecap="round"
          className="opacity-40"
        />
        <path
          d="M 50 10
            A 40 40 0 0 1 90 50"
          stroke="#8b46c4"
          strokeWidth="4"
          strokeLinecap="round"
          className="opacity-90"
        />
      </svg>

      {/* Spinning Logo */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-8 h-8 animate-spin-slow">
          <Image
            src="/icon/gwe.png"
            alt="gwe"
            quality="100"
            sizes="100vh"
            fill
            className="object-contain pointer-events-none brightness-0 opacity-70 drop-shadow-[0_0_2px_#8b46c4]"
          />
        </div>
      </div>

      {/* Screen reader text */}
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Spin;
