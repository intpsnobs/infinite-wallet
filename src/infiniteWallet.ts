interface IWallet {
  money: number[];
}

export class Wallet implements IWallet {
  money: number[];
  suffixes: string;
  flow: number;

  constructor(money?: number[]) {
    this.suffixes = " KMBTqQsSOND";
    this.money = money || [];
    this.flow = 1000;
  }

  add(other: IWallet) {
    let wallen = this.money.length;
    let othlen = other.money.length;

    for (let i = 0; i < othlen - wallen; i++) {
      this.money.push(0);
    }

    for (let i=0; i < this.money.length; i++) {
      if (other.money[i] !== undefined) {
        this.money[i] += other.money[i];
      }

      let overflow = Math.floor(this.money[i] / this.flow);
      if (overflow) {
        this.money[i] %= this.flow;
        if (this.money[i+1])
          this.money[i+1] += overflow;
        else
          this.money.push(overflow);
      } else {
        if (other.money[i] === undefined) {
          return;
        }
      }
    }
  }

  sub(other: IWallet) {
    let wallen = this.money.length;
    let othlen = other.money.length;

    for (let i = 0; i < othlen - wallen; i++) {
      this.money.push(0);
    }

    for (let i=0; i < this.money.length; i++) {
      if (other.money[i] !== undefined) {
        this.money[i] -= other.money[i];
      }

      let underflow = this.money[i] < 0;
      if (underflow) {
        this.money[i] += this.flow;
        if (this.money[i+1] !== undefined)
          this.money[i+1] -= 1;
        else
          this.money[i] = -this.money[i];
      } else {
        if (other.money[i] === undefined) {
          return;
        }
      }
    }
  }

  get() {
    return this.money;
  }

  getSuffixFor(suffix: number) {
    let deesCount = Math.floor(suffix / (this.suffixes.length - 1));
    let dees = "";
    for(let i=0; i < deesCount; i++) {
      dees += String(this.suffixes[this.suffixes.length-1]);
    }

    let suffixPreffix = suffix % (this.suffixes.length-1);
    if (suffixPreffix == 0) {
      return `${dees}`;
    }

    return `${this.suffixes[suffixPreffix]}${dees}`;
  }

  toString() {
    let suffix = this.money.length-1;
    if (suffix == 0) {
      return `${this.money[0]}`;
    }

    return `${this.money[suffix]}.${this.money[suffix-1]} ${this.getSuffixFor(suffix)}`

  }

}
