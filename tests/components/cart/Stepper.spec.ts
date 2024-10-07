import { shallowMount } from "@vue/test-utils";
import Stepper from "../../../src/components/cart/Stepper.vue";
import Button from "@/components/base/Button.vue";

describe("Stepper.vue", () => {
  it("renders the component with required props", () => {
    const wrapper = shallowMount(Stepper, {
      props: {
        step: 1,
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });
  it("successfully increments/decrements stepper", async () => {
    const wrapper = shallowMount(Stepper, {
      props: {
        step: 1,
        "onUpdate:step": (newStep: number, _action: "remove" | "add") =>
          wrapper.setProps({ step: newStep }),
      },
    });
    expect(wrapper.element).toMatchSnapshot();
    const [decrementBtn, incrementBtn] = wrapper.findAllComponents(Button);
    incrementBtn.vm.$emit("click");
    await wrapper.vm.$nextTick();
    expect((wrapper.props() as { step: number }).step).toBe(2);
    decrementBtn.vm.$emit("click");
    await wrapper.vm.$nextTick();
    expect((wrapper.props() as { step: number }).step).toBe(1);
  });
});
