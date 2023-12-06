const Web = () => {
  return (
    <div className="vector w-[800px] h-full max-sm:w-full overflow-hidden absolute left-[0px] top-[-10px]">
      <svg viewBox="0 0 550 250" preserveAspectRatio="true">
        <line x1="1" y1="1" x2="300" y2="1" id="top" />
        <line x1="1" y1="1" x2="1" y2="250" />
        <line x1="1" y1="1" x2="200" y2="112" />
        <line x1="1" y1="1" x2="140" y2="200" />
        <path d="M 1,80 a 12,15 45 1,1 37,-26 a 10,12 0 1,1 14,-24 a 25,20 -45 1,1 40,-30" />
        <path d="M 1,160 a 17,20 45 1,1 75,-52 a 17,20 0 1,1 30,-48 a 30,25 -45 1,1 60,-70" />
        <path d="M 1,240 a 22,25 45 1,1 113,-78 a 23,26 0 1,1 46,-72 a 35,30 -45 1,1 90,-110" />
        <path d="M 1,320 a 27,30 45 1,1 151,-104 a 23,32 0 1,1 40,-109 a 60,35 -45 1,1 130,-110" />
      </svg>
    </div>
  );
};
export default Web;
