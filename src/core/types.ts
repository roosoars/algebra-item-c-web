export type Vector3 = [number, number, number];

export type Matrix3 = [
  [number, number, number],
  [number, number, number],
  [number, number, number]
];

export type CalculationResult = {
  input: Vector3;
  matrices: {
    A: Matrix3;
    B: Matrix3;
    AplusB: Matrix3;
    BtimesA: Matrix3;
  };
  vectors: {
    t1: Vector3;
    t2: Vector3;
    t1PlusT2: Vector3;
    t2ComposeT1: Vector3;
    bOfAv: Vector3;
  };
  consistency: boolean;
};
