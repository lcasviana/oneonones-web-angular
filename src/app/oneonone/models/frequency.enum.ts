export enum Frequency {
  Weekly = 7,
  Semimonthly = 15,
  Monthly = 30,
  Bimonthly = 60,
  Trimonthly = 90,
  Semiyearly = 180,
  Yearly = 365,
  Occasionally = 999,
}

export namespace Frequency {
  export const values: number[] = Object.entries(Frequency)
    .filter(([_, value]) => !isNaN(Number(value)))
    .map(([key, _]) => Number(Frequency[key as keyof typeof Frequency]));
}