import { formatNumber, formatVector } from "./format";
import type { CalculationResult, Matrix3 } from "./types";

export type SolutionStep = {
  title: string;
  description: string;
  equation: string;
  result?: string;
};

function formatMatrix(matrix: Matrix3): string {
  return [
    "[",
    ...matrix.map((row) => `  [${row.map((value) => formatNumber(value)).join(", ")}]`),
    "]"
  ].join("\n");
}

export function buildSolutionSteps(result: CalculationResult): SolutionStep[] {
  const [x, y, z] = result.input;

  const t1x = result.vectors.t1[0];
  const t1y = result.vectors.t1[1];
  const t1z = result.vectors.t1[2];

  const t2x = result.vectors.t2[0];
  const t2y = result.vectors.t2[1];
  const t2z = result.vectors.t2[2];

  const sumx = result.vectors.t1PlusT2[0];
  const sumy = result.vectors.t1PlusT2[1];
  const sumz = result.vectors.t1PlusT2[2];

  const compx = result.vectors.t2ComposeT1[0];
  const compy = result.vectors.t2ComposeT1[1];
  const compz = result.vectors.t2ComposeT1[2];

  const checkSymbol = result.consistency ? "=" : "≠";
  const checkLabel = result.consistency ? "Consistente" : "Divergente";

  return [
    {
      title: "Definir o item C",
      description: "Usamos as transformações lineares do enunciado.",
      equation: [
        "T₁(x, y, z) = (x − z, y − z, z − x)",
        "T₂(x, y, z) = (3x, 2x + 5y, x + y + 8z)"
      ].join("\n"),
      result: "Objetivo: calcular T₁(v), T₂(v), (T₁ + T₂)(v) e (T₂ ∘ T₁)(v)."
    },
    {
      title: "Usar as matrizes A e B",
      description: "Aplicamos a dica do enunciado: usar as matrizes das transformações.",
      equation: [
        `A =\n${formatMatrix(result.matrices.A)}`,
        `B =\n${formatMatrix(result.matrices.B)}`
      ].join("\n\n"),
      result: "Também serão usadas A + B e BA."
    },
    {
      title: "Ler o vetor de entrada",
      description: "Interpretamos v = (a, b, c) como (x, y, z).",
      equation: `v = (${formatNumber(x)}, ${formatNumber(y)}, ${formatNumber(z)})`,
      result: `v = ${formatVector(result.input)}`
    },
    {
      title: "Calcular T₁(v)",
      description: "Aplicamos T₁(x, y, z) = (x − z, y − z, z − x).",
      equation: [
        `x − z = ${formatNumber(x)} − ${formatNumber(z)} = ${formatNumber(t1x)}`,
        `y − z = ${formatNumber(y)} − ${formatNumber(z)} = ${formatNumber(t1y)}`,
        `z − x = ${formatNumber(z)} − ${formatNumber(x)} = ${formatNumber(t1z)}`
      ].join("\n"),
      result: `T₁(v) = ${formatVector(result.vectors.t1)}`
    },
    {
      title: "Calcular T₂(v)",
      description: "Aplicamos T₂(x, y, z) = (3x, 2x + 5y, x + y + 8z).",
      equation: [
        `3x = 3·${formatNumber(x)} = ${formatNumber(t2x)}`,
        `2x + 5y = 2·${formatNumber(x)} + 5·${formatNumber(y)} = ${formatNumber(t2y)}`,
        `x + y + 8z = ${formatNumber(x)} + ${formatNumber(y)} + 8·${formatNumber(z)} = ${formatNumber(t2z)}`
      ].join("\n"),
      result: `T₂(v) = ${formatVector(result.vectors.t2)}`
    },
    {
      title: "Calcular (T₁ + T₂)(v)",
      description: "Somamos componente a componente.",
      equation: [
        `${formatNumber(t1x)} + ${formatNumber(t2x)} = ${formatNumber(sumx)}`,
        `${formatNumber(t1y)} + ${formatNumber(t2y)} = ${formatNumber(sumy)}`,
        `${formatNumber(t1z)} + ${formatNumber(t2z)} = ${formatNumber(sumz)}`
      ].join("\n"),
      result: `(T₁ + T₂)(v) = ${formatVector(result.vectors.t1PlusT2)}`
    },
    {
      title: "Calcular (T₂ ∘ T₁)(v)",
      description: "Usamos a matriz de composição BA.",
      equation: [
        `BA =\n${formatMatrix(result.matrices.BtimesA)}`,
        "",
        `3x − 3z = 3·${formatNumber(x)} − 3·${formatNumber(z)} = ${formatNumber(compx)}`,
        `2x + 5y − 7z = 2·${formatNumber(x)} + 5·${formatNumber(y)} − 7·${formatNumber(z)} = ${formatNumber(compy)}`,
        `−7x + y + 6z = −7·${formatNumber(x)} + ${formatNumber(y)} + 6·${formatNumber(z)} = ${formatNumber(compz)}`
      ].join("\n"),
      result: `(T₂ ∘ T₁)(v) = ${formatVector(result.vectors.t2ComposeT1)}`
    },
    {
      title: "Verificação final",
      description: "Conferimos se B(T₁(v)) coincide com (BA)v.",
      equation: [
        `B(T₁(v)) = ${formatVector(result.vectors.bOfAv)}`,
        `(BA)v = ${formatVector(result.vectors.t2ComposeT1)}`,
        `B(T₁(v)) ${checkSymbol} (BA)v`
      ].join("\n"),
      result: `Status da verificação: ${checkLabel}`
    }
  ];
}
