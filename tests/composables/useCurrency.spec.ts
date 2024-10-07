import { useCurrency } from "@/composables/useCurrency";
import { currency } from "@/config/environment";

describe("useCurrency", () => {
  it("returns correct string based on config", () => {
    const price = 2;

    const formattedPrice = useCurrency(price);
    var num = formattedPrice.match(/[\d.-]+/g);

    var letr = formattedPrice.match(/[^\d.]+/g);
    expect(num?.[0]).toBe("2.00");
    expect(letr?.[0]).toBe(currency);
  });
});
