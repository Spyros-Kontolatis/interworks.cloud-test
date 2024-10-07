import { shallowMount } from "@vue/test-utils";
import CartItem from "../../../src/components/cart/CartItem.vue";
import { useCartStore } from "@/stores/cart";
import { setActivePinia, createPinia } from "pinia";
import { createTestingPinia } from "@pinia/testing";

beforeEach(() => {
  setActivePinia(createPinia());
});
describe("CartItem.vue", () => {
  it("renders the component with required props", () => {
    const wrapper = shallowMount(CartItem, {
      props: {
        item: {
          product: {
            id: "1",
            name: "Product 1",
            price: 2,
          },
          quantity: 1,
        },
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });
  it("successfully removes item from store", async () => {
    const wrapper = shallowMount(CartItem, {
      props: {
        item: {
          product: {
            id: "2",
            name: "Product 1",
            price: 2,
          },
          quantity: 1,
        },
      },
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              cart: {
                cart: {
                  items: [
                    {
                      product: {
                        name: "Product 2",
                        price: 1,
                        description: "A product",
                        image: "",
                        id: "2",
                      },
                      quantity: 1,
                    },
                  ],
                  totalQty: 1,
                  totalPrice: 2,
                },
              },
            },
            stubActions: false,
          }),
        ],
      },
    });

    expect(wrapper.element).toMatchSnapshot();
    const cartStore = useCartStore();
    const removeItem = wrapper.find(".remove-item");
    removeItem.trigger("click");
    await wrapper.vm.$nextTick();
    expect(cartStore.cart.items).toHaveLength(0);
  });
});
