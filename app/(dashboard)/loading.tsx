import Spin from "@/components/Spin";

const loading = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <Spin />
    </div>
  );
};
export default loading;
