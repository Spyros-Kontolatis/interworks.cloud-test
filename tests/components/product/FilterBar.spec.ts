import { shallowMount } from "@vue/test-utils";
import FilterBar from "../../../src/components/product/FilterBar.vue";

describe("FilterBar.vue", () => {
  it("renders the component", () => {
    const wrapper = shallowMount(FilterBar);
    expect(wrapper.element).toMatchSnapshot();
  });
  it("shows sort options when property is passed", () => {
    const wrapper = shallowMount(FilterBar, {
      props: {
        sortingOptions: ["name-asc", "price-desc"],
      },
    });
    expect(wrapper.element).toMatchSnapshot();
    expect(wrapper.findAll("option")).toHaveLength(2);
  });
  it("correctly emits sort option when select is changed", async () => {
    const wrapper = shallowMount(FilterBar, {
      props: {
        sortingOptions: ["name-asc", "price-desc"],
      },
    });
    const select = wrapper.find("select");
    select.trigger("change");
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted().sort).toBeTruthy();
  });
  it("correctly emits search when input is changed", async () => {
    const wrapper = shallowMount(FilterBar);
    const input = wrapper.find("input");
    input.setValue("abc");
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted().search).toBeTruthy();
  });
});
