interface IWallet {
    money: number[];
}
export declare class Wallet implements IWallet {
    money: number[];
    suffixes: string;
    flow: number;
    constructor(money?: number[]);
    add(other: IWallet): void;
    sub(other: IWallet): void;
    get(): number[];
    getSuffixFor(suffix: number): string;
    toString(): string;
}
export {};
//# sourceMappingURL=infiniteWallet.d.ts.map