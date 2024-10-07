import { shallowMount } from "@vue/test-utils";
import Cart from "../../src/views/Cart.vue";
import { setActivePinia, createPinia } from "pinia";
import { createTestingPinia } from "@pinia/testing";
import { useCartStore } from "@/stores/cart";
import CartItem from "@/components/cart/CartItem.vue";

beforeEach(() => {
  setActivePinia(createPinia());
});
describe("Cart.vue", () => {
  it("renders the component", () => {
    const wrapper = shallowMount(Cart, {
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              cart: {
                cart: {
                  id: "1",
                  items: [
                    {
                      product: {
                        id: "1",
                        name: "Product 1",
                        price: 1,
                        description: "A product",
                        image: "some image",
                      },
                      quantity: 2,
                    },
                    {
                      product: {
                        id: "2",
                        name: "Product 2",
                        price: 4,
                        description: "A product",
                        image: "some image",
                      },
                      quantity: 5,
                    },
                  ],
                  totalPrice: 22,
                  totalQty: 7,
                },
              },
            },
            stubActions: false,
          }),
        ],
      },
    });
    useCartStore();
    expect(wrapper.element).toMatchSnapshot();
    const cartItems = wrapper.findAllComponents(CartItem);
    expect(cartItems).toHaveLength(2);
  });
});
