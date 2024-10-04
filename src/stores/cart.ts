import { defineStore } from "pinia";
import { ref } from "vue";
import type { Cart, CartItem } from "@/types/stores/cart/cart";
import Service from "@/services/Service";

export const useCartStore = defineStore("cart", () => {
  const cart = ref<Cart>({
    id: "",
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
    if (cart.value.id) {
      Service.cart().update(cart.value.id, cart.value).execute();
    } else {
      cart.value.id = Date.now().toString();
      Service.cart().create(cart.value).execute();
    }
  };

  const updateItemQuantity = (itemId: string, mode: "remove" | "add") => {
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
    Service.cart().update(cart.value.id, cart.value).execute();
  };

  const removeItemFromCart = (item: CartItem) => {
    cart.value.items = cart.value.items.filter(
      ({ product: { id } }) => id !== item.product.id
    );

    cart.value.totalQty -= item.quantity;
    cart.value.totalPrice -= item.product.price * item.quantity;
    Service.cart().update(cart.value.id, cart.value).execute();
  };
  return {
    cart,
    removeItemFromCart,
    addToCart,
    updateItemQuantity,
  };
});
