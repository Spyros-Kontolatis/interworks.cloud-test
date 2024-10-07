import { shallowMount } from "@vue/test-utils";
import Cart from "../../src/views/Cart.vue";
import { setActivePinia, createPinia } from "pinia";

beforeEach(() => {
  setActivePinia(createPinia());
});
describe("Cart.vue", () => {
  it("renders the component", () => {
    const wrapper = shallowMount(Cart);
    expect(wrapper.element).toMatchSnapshot();
  });
});
