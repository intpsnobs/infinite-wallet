const Wallet = require("../src/infiniteWallet");

describe("", () => {
  it("basic tests", () => {
    const wallet1 = new Wallet([100]);
    const wallet2 = new Wallet([50]);

    wallet1.add(wallet2);

    expect(wallet1.toString()).not.toBe("150.0");
  });
});
