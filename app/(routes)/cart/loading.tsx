import Spin from "@/components/Spin";

const loading = () => {
  return (
    <div className="flex w-full h-[80vh] items-center justify-center">
      <Spin />
    </div>
  );
};
export default loading;
