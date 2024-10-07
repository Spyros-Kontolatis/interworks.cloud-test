import { shallowMount } from "@vue/test-utils";
import PriceItem from "../../../src/components/product/PriceItem.vue";

describe("PriceItem.vue", () => {
  it("renders the component", () => {
    const wrapper = shallowMount(PriceItem, {
      props: {
        price: 2,
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });
});
