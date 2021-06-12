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
    // it("sub test1", () => {
    //   const wallet1 = new Wallet("10");
    //   const wallet2 = new Wallet("5");

    //   wallet1.sub(wallet2);

    //   expect(wallet1.toString()).toBe("5");

    //   wallet1.sub(wallet2);

    //   expect(wallet1.toString()).toBe("0");

    //   wallet1.sub(wallet2);

    //   expect(wallet1.toString()).toBe("-5");
    // });

    // it("sub test2", () => {
    //   const wallet1 = new Wallet("10000000000");
    //   const wallet2 = new Wallet("5000000000");

    //   wallet1.sub(wallet2);

    //   expect(wallet1.get()).toStrictEqual([0,0,0,5]);
    // });

    // it("sub test1", () => {
    //   const wallet1 = new Wallet("100");
    //   const wallet2 = new Wallet("100000");
    //   // [100]
    //   // [0,100]
    //   wallet1.sub(wallet2);

    //   expect(wallet1.get()).toStrictEqual([900,-99]);
    // });
  });

  it("clearMoney", () => {
    const wallet1 = new Wallet([100,100,0,0,0]);
    const wallet2 = new Wallet([0]);
    const wallet3 = new Wallet([0,25,25,0,0,0,0,0,0]);
    const wallet4 = new Wallet([0,0,0,0,0,0,0]);

    expect(wallet1.get()).toStrictEqual([100,100]);
    expect(wallet2.get()).toStrictEqual([0]);
    expect(wallet3.get()).toStrictEqual([0,25,25]);
    expect(wallet4.get()).toStrictEqual([0]);
  });

  it("isBigger", () => {
    const wallet1 = new Wallet([100]);
    const wallet2 = new Wallet([101]);
    const wallet3 = new Wallet([99]);
    const wallet4 = new Wallet([0,0,0,52]);
    const wallet5 = new Wallet([0,52]);
    const wallet6 = new Wallet([0,0,0,0,123,10]);

    expect(wallet1.isBigger(wallet1.money, wallet2.money)).toBe(false);
    expect(wallet1.isBigger(wallet1.money, wallet3.money)).toBe(true);
    expect(wallet4.isBigger(wallet4.money, wallet5.money)).toBe(true);
    expect(wallet4.isBigger(wallet4.money, wallet6.money)).toBe(false);
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
