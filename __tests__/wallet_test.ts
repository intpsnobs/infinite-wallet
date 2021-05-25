import { Wallet } from "../src/infiniteWallet";

describe("", () => {
  describe("add tests", () => {
    it("add test1", () => {
      const wallet1 = new Wallet([100]);
      const wallet2 = new Wallet([50]);

      wallet1.add(wallet2);

      expect(wallet1.toString()).toBe("150");
    });

    it("add test2", () => {
      const wallet1 = new Wallet("999");
      const wallet2 = new Wallet([50]);

      wallet1.add(wallet2);

      expect(wallet1.toString()).toBe("1.49 K");
    });

    it("add test3", () => {
      const wallet1 = new Wallet("16214621642164216421642164214261646214");
      const wallet2 = new Wallet("266262663266932923549629932413");

      wallet1.add(wallet2);

      expect(wallet1.toString()).toBe("16.214 KD");
    });
  });

  describe("sub tests", () => {
    it("sub test1", () => {
      const wallet1 = new Wallet("10000000000");
      const wallet2 = new Wallet("5000000000");

      wallet1.sub(wallet2);

      expect(wallet1.get()).toStrictEqual([0,0,0,5]);
    });

    // it("sub test1", () => {
    //   const wallet1 = new Wallet("100");
    //   const wallet2 = new Wallet("100000");

    //   wallet1.sub(wallet2);

    //   expect(wallet1.get()).toStrictEqual([900,-99]);
    // });
  });

  it("format number", () => {
    const wallet1 = new Wallet("10000000000000000000");
    const wallet2 = new Wallet("123456789");
    const wallet3 = new Wallet("129999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999");

    expect(wallet1.get()).toStrictEqual([0,0,0,0,0,0,10]);
    expect(wallet2.get()).toStrictEqual([789,456,123]);
    expect(wallet3.get()).toStrictEqual([999,999,999,999,999,999,999,999,999,999,999,999,999,999,999,999,999,999,999,999,999,999,999,999,999,999,999,999,999,999,999,999,999,999,999,999,999,999,999,999,999,999,999,999,999,999,999,999,999,999,999,999,999,129]);
  });
});
