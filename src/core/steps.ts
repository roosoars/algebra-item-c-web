import { formatarNumero, formatarVetor } from "./format";
import type { Matriz3, ResultadoCalculo } from "./types";

export type PassoSolucao = {
  titulo: string;
  descricao: string;
  equacao: string;
  resultado?: string;
};

/**
 * Converte a matriz para um bloco multilinha legível na resolução passo a passo.
 */
function formatarMatriz(matriz: Matriz3): string {
  return [
    "[",
    ...matriz.map((linha) => `  [${linha.map((valor) => formatarNumero(valor)).join(", ")}]`),
    "]"
  ].join("\n");
}

/**
 * Monta cada etapa textual da solução com base no resultado já calculado.
 */
export function construirPassosResolucao(resultado: ResultadoCalculo): PassoSolucao[] {
  // As componentes são separadas para deixar as fórmulas finais mais legíveis.
  const [x, y, z] = resultado.entrada;

  const t1x = resultado.vetores.t1[0];
  const t1y = resultado.vetores.t1[1];
  const t1z = resultado.vetores.t1[2];

  const t2x = resultado.vetores.t2[0];
  const t2y = resultado.vetores.t2[1];
  const t2z = resultado.vetores.t2[2];

  const sumx = resultado.vetores.t1MaisT2[0];
  const sumy = resultado.vetores.t1MaisT2[1];
  const sumz = resultado.vetores.t1MaisT2[2];

  const compx = resultado.vetores.t2CompostaT1[0];
  const compy = resultado.vetores.t2CompostaT1[1];
  const compz = resultado.vetores.t2CompostaT1[2];

  const simboloVerificacao = resultado.consistencia ? "=" : "≠";
  const rotuloVerificacao = resultado.consistencia ? "Consistente" : "Divergente";

  return [
    {
      titulo: "Definir o item C",
      descricao: "Usamos as transformações lineares do enunciado.",
      equacao: [
        "T₁(x, y, z) = (x − z, y − z, z − x)",
        "T₂(x, y, z) = (3x, 2x + 5y, x + y + 8z)"
      ].join("\n"),
      resultado: "Objetivo: calcular T₁(v), T₂(v), (T₁ + T₂)(v) e (T₂ ∘ T₁)(v)."
    },
    {
      titulo: "Usar as matrizes A e B",
      descricao: "Aplicamos a dica do enunciado: usar as matrizes das transformações.",
      equacao: [
        `A =\n${formatarMatriz(resultado.matrizes.A)}`,
        `B =\n${formatarMatriz(resultado.matrizes.B)}`
      ].join("\n\n"),
      resultado: "Também serão usadas A + B e BA."
    },
    {
      titulo: "Ler o vetor de entrada",
      descricao: "Interpretamos v = (a, b, c) como (x, y, z).",
      equacao: `v = (${formatarNumero(x)}, ${formatarNumero(y)}, ${formatarNumero(z)})`,
      resultado: `v = ${formatarVetor(resultado.entrada)}`
    },
    {
      titulo: "Calcular T₁(v)",
      descricao: "Aplicamos T₁(x, y, z) = (x − z, y − z, z − x).",
      equacao: [
        `x − z = ${formatarNumero(x)} − ${formatarNumero(z)} = ${formatarNumero(t1x)}`,
        `y − z = ${formatarNumero(y)} − ${formatarNumero(z)} = ${formatarNumero(t1y)}`,
        `z − x = ${formatarNumero(z)} − ${formatarNumero(x)} = ${formatarNumero(t1z)}`
      ].join("\n"),
      resultado: `T₁(v) = ${formatarVetor(resultado.vetores.t1)}`
    },
    {
      titulo: "Calcular T₂(v)",
      descricao: "Aplicamos T₂(x, y, z) = (3x, 2x + 5y, x + y + 8z).",
      equacao: [
        `3x = 3·${formatarNumero(x)} = ${formatarNumero(t2x)}`,
        `2x + 5y = 2·${formatarNumero(x)} + 5·${formatarNumero(y)} = ${formatarNumero(t2y)}`,
        `x + y + 8z = ${formatarNumero(x)} + ${formatarNumero(y)} + 8·${formatarNumero(z)} = ${formatarNumero(t2z)}`
      ].join("\n"),
      resultado: `T₂(v) = ${formatarVetor(resultado.vetores.t2)}`
    },
    {
      titulo: "Calcular (T₁ + T₂)(v)",
      descricao: "Somamos componente a componente.",
      equacao: [
        `${formatarNumero(t1x)} + ${formatarNumero(t2x)} = ${formatarNumero(sumx)}`,
        `${formatarNumero(t1y)} + ${formatarNumero(t2y)} = ${formatarNumero(sumy)}`,
        `${formatarNumero(t1z)} + ${formatarNumero(t2z)} = ${formatarNumero(sumz)}`
      ].join("\n"),
      resultado: `(T₁ + T₂)(v) = ${formatarVetor(resultado.vetores.t1MaisT2)}`
    },
    {
      titulo: "Calcular (T₂ ∘ T₁)(v)",
      descricao: "Usamos a matriz de composição BA.",
      equacao: [
        `BA =\n${formatarMatriz(resultado.matrizes.BvezesA)}`,
        "",
        `3x − 3z = 3·${formatarNumero(x)} − 3·${formatarNumero(z)} = ${formatarNumero(compx)}`,
        `2x + 5y − 7z = 2·${formatarNumero(x)} + 5·${formatarNumero(y)} − 7·${formatarNumero(z)} = ${formatarNumero(compy)}`,
        `−7x + y + 6z = −7·${formatarNumero(x)} + ${formatarNumero(y)} + 6·${formatarNumero(z)} = ${formatarNumero(compz)}`
      ].join("\n"),
      resultado: `(T₂ ∘ T₁)(v) = ${formatarVetor(resultado.vetores.t2CompostaT1)}`
    },
    {
      titulo: "Verificação final",
      descricao: "Conferimos se B(T₁(v)) coincide com (BA)v.",
      equacao: [
        `B(T₁(v)) = ${formatarVetor(resultado.vetores.bDeAv)}`,
        `(BA)v = ${formatarVetor(resultado.vetores.t2CompostaT1)}`,
        `B(T₁(v)) ${simboloVerificacao} (BA)v`
      ].join("\n"),
      resultado: `Status da verificação: ${rotuloVerificacao}`
    }
  ];
}
