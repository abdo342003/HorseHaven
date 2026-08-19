export type CartItem = {
  id: string;
  slug: string;
  name: string;
  price: number;
  image?: string;
  qty: number;
};

export const CART_KEY = "hh-cart";

export function getCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(CART_KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
}

export function saveCart(items: CartItem[]) {
  window.localStorage.setItem(CART_KEY, JSON.stringify(items));
  window.dispatchEvent(new CustomEvent("hh-cart-updated"));
}

export function addToCart(item: CartItem) {
  const items = getCart();
  const existing = items.find((i) => i.id === item.id);
  if (existing) {
    existing.qty += item.qty;
  } else {
    items.push(item);
  }
  saveCart(items);
}

export function updateQty(id: string, qty: number) {
  const items = getCart();
  const item = items.find((i) => i.id === id);
  if (item) {
    item.qty = qty;
    if (item.qty <= 0) {
      saveCart(items.filter((i) => i.id !== id));
      return;
    }
    saveCart(items);
  }
}

export function removeFromCart(id: string) {
  saveCart(getCart().filter((i) => i.id !== id));
}

export function clearCart() {
  saveCart([]);
}

export function cartTotal(items: CartItem[]) {
  return items.reduce((sum, i) => sum + i.price * i.qty, 0);
}