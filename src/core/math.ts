import type { CalculationResult, Matrix3, Vector3 } from "./types";

const EPSILON = 1e-9;

export const MATRICES: {
  A: Matrix3;
  B: Matrix3;
  AplusB: Matrix3;
  BtimesA: Matrix3;
} = {
  A: [
    [1, 0, -1],
    [0, 1, -1],
    [-1, 0, 1]
  ],
  B: [
    [3, 0, 0],
    [2, 5, 0],
    [1, 1, 8]
  ],
  AplusB: [
    [4, 0, -1],
    [2, 6, -1],
    [0, 1, 9]
  ],
  BtimesA: [
    [3, 0, -3],
    [2, 5, -7],
    [-7, 1, 6]
  ]
};

function cloneMatrix(matrix: Matrix3): Matrix3 {
  return matrix.map((row) => [...row]) as Matrix3;
}

function cloneVector(vector: Vector3): Vector3 {
  return [...vector] as Vector3;
}

export function multiplyMatrixVector(matrix: Matrix3, vector: Vector3): Vector3 {
  const result: number[] = [];

  for (let i = 0; i < 3; i += 1) {
    let value = 0;
    for (let j = 0; j < 3; j += 1) {
      value += matrix[i][j] * vector[j];
    }
    result.push(value);
  }

  return result as Vector3;
}

function parseComponent(rawValue: string): number | null {
  const normalized = rawValue.trim().replace(",", ".");
  if (normalized.length === 0) {
    return null;
  }

  const parsed = Number(normalized);
  if (!Number.isFinite(parsed)) {
    return null;
  }

  return parsed;
}

export function validateVectorInput(
  a: string,
  b: string,
  c: string
): { ok: true; value: Vector3 } | { ok: false; message: string } {
  const parsedA = parseComponent(a);
  if (parsedA === null) {
    return { ok: false, message: "Valor inválido para a. Informe um número real." };
  }

  const parsedB = parseComponent(b);
  if (parsedB === null) {
    return { ok: false, message: "Valor inválido para b. Informe um número real." };
  }

  const parsedC = parseComponent(c);
  if (parsedC === null) {
    return { ok: false, message: "Valor inválido para c. Informe um número real." };
  }

  return { ok: true, value: [parsedA, parsedB, parsedC] };
}

export function calculateItemC(vector: Vector3): CalculationResult {
  const t1 = multiplyMatrixVector(MATRICES.A, vector);
  const t2 = multiplyMatrixVector(MATRICES.B, vector);
  const t1PlusT2 = multiplyMatrixVector(MATRICES.AplusB, vector);
  const t2ComposeT1 = multiplyMatrixVector(MATRICES.BtimesA, vector);
  const bOfAv = multiplyMatrixVector(MATRICES.B, t1);

  const consistency = t2ComposeT1.every(
    (value, index) => Math.abs(value - bOfAv[index]) <= EPSILON
  );

  return {
    input: cloneVector(vector),
    matrices: {
      A: cloneMatrix(MATRICES.A),
      B: cloneMatrix(MATRICES.B),
      AplusB: cloneMatrix(MATRICES.AplusB),
      BtimesA: cloneMatrix(MATRICES.BtimesA)
    },
    vectors: {
      t1,
      t2,
      t1PlusT2,
      t2ComposeT1,
      bOfAv
    },
    consistency
  };
}
