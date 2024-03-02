import { Toast } from "@radix-ui/react-toast";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// Define the type for product
interface Product {
  id: string;
  name: string;
  price: number;
  image: any;
  categories: any;
}

// Define the type for the item in the cart
interface CartItem {
  product: Product;
  quantity: number;
}

// Define the type for the cart store
interface CartStore {
  items: CartItem[];
  addItem: (data: CartItem) => void;
  removeItem: (id: string) => void;
  removeAll: () => void;
  addItemQuantity: (data: CartItem) => void;
  removeItemQuantity: (data: CartItem) => void;
}

const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],
      addItem: (data: CartItem) => {
        const currentItems = get().items;
        const existingItemIndex = currentItems.findIndex(
          (item) => item.product.id === data.product.id
        );

        if (existingItemIndex !== -1) {
          const updatedItems = [...currentItems];
          updatedItems[existingItemIndex].quantity += data.quantity;
          set({ items: updatedItems });
        } else {
          set({ items: [...currentItems, data] });
        }
        // toast({ title: "Item added to cart." });
      },
      addItemQuantity: (data: CartItem) => {
        const currentItems = get().items;
        const existingItemIndex = currentItems.findIndex(
          (item) => item.product.id === data.product.id
        );

        if (existingItemIndex !== -1) {
          const updatedItems = [...currentItems];
          updatedItems[existingItemIndex].quantity += 1;
          set({ items: updatedItems });
        } else {
          set({ items: [...currentItems, data] });
        }
        // toast({ title: "Item added to cart." });
      },
      removeItemQuantity: (data: CartItem) => {
        const currentItems = get().items;
        const existingItemIndex = currentItems.findIndex(
          (item) => item.product.id === data.product.id
        );

        if (existingItemIndex !== -1) {
          const updatedItems = [...currentItems];
          updatedItems[existingItemIndex].quantity -= 1;
          set({ items: updatedItems });
        } else {
          set({ items: [...currentItems, data] });
        }
        // toast({ title: "Item added to cart." });
      },
      removeItem: (id: string) => {
        set({
          items: get().items.filter((item) => item.product.id !== id),
        });
        // toast({ title: "Item removed from cart." });
      },
      removeAll: () => set({ items: [] }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCart;
