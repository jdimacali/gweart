import Image from "next/image";

const events = [
  { label: "Upcoming Events", image: "/events/event1.png" },
  { label: "G.W.E New Item Shop Drop", image: "/events/event2.png" },
  { label: "G.W.E New Item Shop Drop", image: "/events/event3.png" },
  { label: "G.W.E New Item Shop Drop", image: "/events/event4.png" },
];

const page = () => {
  return (
    <section className="h-full w-full bg-gray-900 flex flex-col items-center">
      <div className="bg-[url('../public/background/bg1.jpg')] w-full h-full bg-cover bg-clip-padding bg-blend-overlay bg-black bg-opacity-40 pb-40 bg-fixed">
        <div className="flex flex-col items-center justify-center w-full my-10 gap-y-4 pb-4">
          <h1
            className="text-7xl font-bold text-white text-center"
            style={{ textShadow: "3px 3px  #a5a4a4" }}
          >
            Upcoming Events
          </h1>
          <h1 className="text-3xl font-bold text-white text-center">
            You can find me at these events!
          </h1>
        </div>
        <div className="flex flex-wrap mt-10 items-center justify-center gap-10">
          {events.map((event) => (
            <div
              key={event.label}
              className="relative max-sm:h-[30rem] h-[40rem] max-sm:w-[30rem] w-[40rem] "
            >
              <Image
                src={event.image}
                alt={event.label}
                fill
                className="object-contain hover:scale-110 transition-transform animate-in"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default page;
