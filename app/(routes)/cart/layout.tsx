export default function Layout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="h-full w-full text-black bg-white items-center justify-center pb-20 px-10 md:px-10 lg:px-20 2xl:px-80">
      {children}
    </section>
  );
}
