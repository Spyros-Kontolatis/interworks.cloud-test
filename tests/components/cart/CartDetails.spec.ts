import { shallowMount } from "@vue/test-utils";
import CartDetails from "../../../src/components/cart/CartDetails.vue";

import { setActivePinia, createPinia } from "pinia";
import { createTestingPinia } from "@pinia/testing";

jest.mock("@/services/Service");
jest.mock("@/services/HTTP");
beforeEach(() => {
  setActivePinia(createPinia());
});
describe("CartDetails.vue", () => {
  it("renders the component with required props", () => {
    const wrapper = shallowMount(CartDetails);
    expect(wrapper.element).toMatchSnapshot();
  });
  it("correctly renders the details from the store", () => {
    const wrapper = shallowMount(CartDetails, {
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
                      },
                      quantity: 1,
                    },
                    {
                      product: {
                        id: "2",
                        name: "Product 2",
                        price: 2,
                      },
                      quantity: 2,
                    },
                  ],
                  totalPrice: 5,
                  totalQty: 3,
                },
              },
            },
          }),
        ],
      },
    });

    expect(wrapper.element).toMatchSnapshot();
    expect(wrapper.findAll(".cart-items")).toHaveLength(2);
  });
});
