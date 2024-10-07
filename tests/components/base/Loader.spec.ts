import { shallowMount } from "@vue/test-utils";
import Loader from "../../../src/components/base/Loader.vue";

describe("Loader.vue", () => {
  it("renders the component", () => {
    const wrapper = shallowMount(Loader);
    expect(wrapper.element).toMatchSnapshot();
  });
});
