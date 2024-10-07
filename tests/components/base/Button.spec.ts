import { shallowMount } from "@vue/test-utils";
import Button from "../../../src/components/base/Button.vue";

describe("Button.vue", () => {
  it("renders the component with required props", () => {
    const wrapper = shallowMount(Button, {
      props: {
        size: "sm",
        color: "primary",
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });
  it("renders the different sizes correctly ", () => {
    const wrapper = shallowMount(Button, {
      props: {
        size: "xs",
        color: "primary",
      },
    });
    expect(wrapper.find(".p-2.text-xs.rounded-md")).toBeDefined();
    wrapper.setProps({
      color: "primary",
      size: "sm",
    });
    expect(wrapper.find(".p-2.text-sm.rounded-md")).toBeDefined();
    wrapper.setProps({
      color: "primary",
      size: "md",
    });
    expect(wrapper.find(".p-4.text-md.rounded-xl")).toBeDefined();
    wrapper.setProps({
      color: "primary",
      size: "lg",
    });
    expect(wrapper.find(".p-2.text-lg.rounded-xl")).toBeDefined();
    wrapper.setProps({
      color: "primary",
      size: "xl",
    });
    expect(wrapper.find(".p-4.text-lg.rounded-2xl")).toBeDefined();
  });
  it("renders the different color schemes correctly ", () => {
    const wrapper = shallowMount(Button, {
      props: {
        size: "xs",
        color: "primary",
      },
    });
    expect(wrapper.find(".text-white.bg-primary")).toBeDefined();
    wrapper.setProps({
      color: "secondary",
      size: "sm",
    });
    expect(wrapper.find(".text-black.bg-secondary")).toBeDefined();
  });
});
