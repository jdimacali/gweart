export default function Layout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="h-full w-full text-black bg-white items-center justify-center pb-80 pt-10 md:pt-20 px-10 md:px-20">
      {children}
    </section>
  );
}
