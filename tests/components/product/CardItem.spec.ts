import { shallowMount } from "@vue/test-utils";
import CardItem from "../../../src/components/product/CardItem.vue";
import { setActivePinia, createPinia } from "pinia";
import { createTestingPinia } from "@pinia/testing";
import { useCartStore } from "@/stores/cart";
import Button from "@/components/base/Button.vue";
beforeEach(() => {
  setActivePinia(createPinia());
});

describe("CardItem.vue", () => {
  it("renders the component", () => {
    const wrapper = shallowMount(CardItem, {
      props: {
        product: {
          name: "Product 1",
          price: 1,
          description: "A product",
          image: "",
          id: "1",
        },
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });
  it("adds product to cart", async () => {
    const wrapper = shallowMount(CardItem, {
      props: {
        product: {
          name: "Product 1",
          price: 1,
          description: "A product",
          image: "",
          id: "1",
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
                  totalPrice: 1,
                },
              },
            },
            stubActions: false,
          }),
        ],
      },
    });
    const cartStore = useCartStore();
    expect(wrapper.element).toMatchSnapshot();
    const addToCartButton = wrapper.findComponent(Button);
    addToCartButton.vm.$emit("click");
    await wrapper.vm.$nextTick();
    expect(cartStore.cart.items).toHaveLength(2);
  });
});
