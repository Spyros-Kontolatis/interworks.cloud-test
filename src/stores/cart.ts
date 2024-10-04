import { defineStore } from "pinia";
import { computed, ref } from "vue";
import type { Cart, CartItem } from "@/types/stores/cart/cart";

export const useCartStore = defineStore("cart", () => {
  const cart = ref<Cart>({
    items: [],
    totalPrice: 0,
    totalQty: 0,
  });
  const addToCart = (item: CartItem) => {
    const isItemPresent = cart.value.items.find(
      ({ product: { id } }) => id === item.product.id
    );
    if (isItemPresent) {
      isItemPresent.quantity++;
    } else {
      cart.value.items.push(item);
    }
    cart.value.totalQty++;
    cart.value.totalPrice += item.product.price;
  };

  const updateItemQuantity = (itemId: number, mode: "remove" | "add") => {
    const itemInCart = cart.value.items.find(
      ({ product: { id } }) => id === itemId
    );
    if (itemInCart) {
      switch (mode) {
        case "add":
          itemInCart.quantity++;
          cart.value.totalQty++;
          cart.value.totalPrice += itemInCart.product.price;
          break;
        case "remove":
          itemInCart.quantity--;
          cart.value.totalQty--;
          cart.value.totalPrice -= itemInCart.product.price;
          break;
      }
    }
  };

  const removeItemFromCart = (item: CartItem) => {
    cart.value.items = cart.value.items.filter(
      ({ product: { id } }) => id !== item.product.id
    );

    cart.value.totalQty -= item.quantity;
    cart.value.totalPrice -= item.product.price * item.quantity;
  };
  return {
    cart,
    removeItemFromCart,
    addToCart,
    updateItemQuantity,
  };
});
