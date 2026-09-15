import { createContext, useCallback, useContext, useMemo, type ReactNode } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import type { Product } from "@/types";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextValue {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  decreaseItem: (productId: string) => void;
  clearCart: () => void;
  isInCart: (productId: string) => boolean;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useLocalStorage<CartItem[]>("kairo.cart", []);

  const addItem = useCallback(
    (product: Product) => {
      setItems((current) => {
        const existing = current.find((item) => item.product.id === product.id);
        if (existing) {
          return current.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          );
        }
        return [...current, { product, quantity: 1 }];
      });
    },
    [setItems],
  );

  const removeItem = useCallback(
    (productId: string) => {
      setItems((current) => current.filter((item) => item.product.id !== productId));
    },
    [setItems],
  );

  const updateQuantity = useCallback(
    (productId: string, quantity: number) => {
      setItems((current) =>
        quantity <= 0
          ? current.filter((item) => item.product.id !== productId)
          : current.map((item) =>
              item.product.id === productId ? { ...item, quantity } : item,
            ),
      );
    },
    [setItems],
  );

  const decreaseItem = useCallback(
    (productId: string) => {
      setItems((current) =>
        current
          .map((item) =>
            item.product.id === productId
              ? { ...item, quantity: item.quantity - 1 }
              : item,
          )
          .filter((item) => item.quantity > 0),
      );
    },
    [setItems],
  );

  const clearCart = useCallback(() => setItems([]), [setItems]);

  const isInCart = useCallback(
    (productId: string) => items.some((item) => item.product.id === productId),
    [items],
  );

  const itemCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items],
  );

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    [items],
  );

  // Stable object identity prevents unnecessary re-renders of consumers.
  const value = useMemo<CartContextValue>(
    () => ({
      items,
      itemCount,
      subtotal,
      addItem,
      removeItem,
      updateQuantity,
      decreaseItem,
      clearCart,
      isInCart,
    }),
    [items, itemCount, subtotal, addItem, removeItem, updateQuantity, decreaseItem, clearCart, isInCart],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
}
