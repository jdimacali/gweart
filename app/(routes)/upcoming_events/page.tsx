import Image from "next/image";
import Link from "next/link";
interface SocialLink {
  id: number;
  attributes: {
    name: string;
    url: string;
    // Add other attributes as needed
  };
}
const events = [
  { link: "Upcoming Events", image: "/events/event1.png" },
  { link: "G.W.E New Item Shop Drop", image: "/events/event2.png" },
  { link: "G.W.E New Item Shop Drop", image: "/events/event3.png" },
  { link: "G.W.E New Item Shop Drop", image: "/events/event4.png" },
  { link: "Upcoming Events", image: "/events/event1.png" },
];

const page = () => {
  return (
    <section className="h-full w-full bg-gray-800 flex flex-col items-center">
      <div className="bg-[url('../public/background/bg4.png')] w-full h-full bg-cover pb-40">
        <div className="flex flex-col items-center justify-center w-full my-10 gap-y-4 pb-4">
          <h1
            className="text-7xl font-bold text-white text-center"
            style={{ textShadow: "3px 3px  #a5a4a4" }}
          >
            Upcoming Events
          </h1>
          <h1 className="text-3xl font-bold opacity-80 text-white text-center">
            You can find me at these events!
          </h1>
        </div>
        <div className="flex flex-wrap mt-10 items-center justify-center gap-10 mx-16">
          {events.map((event) => (
            <Link
              key={event.link}
              href={event.link}
              className="relative max-sm:h-[30rem] h-[40rem] max-sm:w-[30rem] w-[40rem] "
            >
              <Image
                src={event.image}
                alt={event.image}
                fill
                className="object-contain hover:scale-110 transition-transform animate-in"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
export default page;
