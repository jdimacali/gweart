import { formatPrice } from "@/lib/utils";

const ShippingElement = () => {
  return (
    <fieldset className="flex flex-col my-4 ">
      <h2 className="mb-2 text-sm text-neutral-700">Shipping Method</h2>
      <div className="border border-neutral-200 p-2 flex flex-col rounded bg-yellow-100/10">
        <div className="flex justify-between border-b border-neutral-200 pb-2 pt-1">
          <div className="flex gap-x-2">
            <input type="radio" name="shipping" value="standard" />

            <div>
              <label className="flex gap-x-2 justify-items text-sm ">
                Standard Shipping
              </label>
              <div className="text-xs text-neutral-500">
                {" "}
                3 - 5 business days{" "}
              </div>
            </div>
          </div>
          {/* calculate with easypost api using address and total weight and box type */}
          <div className="text-sm"> {formatPrice(10)} </div>
        </div>
        <div className="flex justify-between pb-1 pt-2">
          <div className="flex gap-x-2">
            <input type="radio" name="shipping" value="express" />

            <div>
              <label className="flex gap-x-2 justify-items text-sm">
                Express Shipping
              </label>
              <div className="text-xs text-neutral-500">
                {" "}
                1 - 3 business days{" "}
              </div>
            </div>
          </div>
          <div className="text-sm"> {formatPrice(20)} </div>
        </div>
      </div>
    </fieldset>
  );
};
export default ShippingElement;
