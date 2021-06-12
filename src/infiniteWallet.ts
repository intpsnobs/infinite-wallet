interface IWallet {
  money: number[];
}

export class Wallet implements IWallet {
  money: number[];
  suffixes: string;
  flow: number;

  constructor(money?: string | number[]) {
    this.suffixes = " KMBTqQsSOND";
    this.flow = 1000;
    this.money = this.formatNumber(money) || [];
    this.clearMoney();
  }

  public formatNumber(money: string | number[]): number[] {
    if (Array.isArray(money)) {
      return money;
    } else {
      const clearMoney = money.replace(".", " ");
      const reverseMoney = clearMoney.split("").reverse();
      const array = [];
      for (let i = 0; i < reverseMoney.length; i+=3) {
        const joinArr = reverseMoney.slice(i, i + 3).reverse().join("");
        array.push(Number(joinArr));
      }
      return array;
    }
  }

  /**
   * Removes trailing zeros in the array
   * eg. [100,0,0] --> [100]
   */
  private clearMoney() {
    for (let i = this.money.length - 1; i > 0; i--) {
      if (this.money[i] === 0) {
        this.money.splice(i,1)
      } else {
        // if the money is greater than zero, exit the loop
        return;
      }
    }
  }

  public add(other: IWallet) {
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
    this.clearMoney();
  }

  public isBigger(w: number[], o: number[]) {
    let isBigger = w.length > o.length;
    if (w.length === o.length) {
      for (let i = w.length - 1; i >= 0; i--) {
        if (w[i] !== o[i]) {
          return w[i] > o[i];
        }
      }
    }

    return isBigger;
  }

  public sub(other: IWallet) {
    let wallen = this.money.length;
    let othlen = other.money.length;
    // const isBigger = this.isBigger(this.money, other.money)

    for (let i = 0; i < othlen - wallen; i++) {
      this.money.push(0);
    }

    for (let i=0; i < this.money.length; i++) {
      if (other.money[i] !== undefined) {
        this.money[i] -= other.money[i];//100 - 0
      }

      let underflow = this.money[i] < 0;
      if (underflow) {
        this.money[i] += this.flow;
        if (this.money[i+1] !== undefined)
          this.money[i+1] -= 1;
        else
          this.money[i] = - this.money[i];
      } else {
        if (other.money[i] === undefined) {
          return;
        }
      }
    }
    this.clearMoney();
  }

  public get() {
    return this.money;
  }

  private getSuffixFor(suffix: number) {
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

  public toString() {
    let suffix = this.money.length-1;
    if (suffix == 0) {
      return `${this.money[0]}`;
    }

    return `${this.money[suffix]}.${this.money[suffix-1]} ${this.getSuffixFor(suffix)}`

  }

}
