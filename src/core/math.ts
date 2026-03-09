import type { Matriz3, ResultadoCalculo, Vetor3 } from "./types";

// Tolerância usada na comparação de resultados numéricos.
const TOLERANCIA_NUMERICA = 1e-9;

// Matrizes base do enunciado e combinações já preparadas para os cálculos do item C.
export const MATRIZES: {
  A: Matriz3;
  B: Matriz3;
  AmaisB: Matriz3;
  BvezesA: Matriz3;
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
  AmaisB: [
    [4, 0, -1],
    [2, 6, -1],
    [0, 1, 9]
  ],
  BvezesA: [
    [3, 0, -3],
    [2, 5, -7],
    [-7, 1, 6]
  ]
};

// Clona a matriz antes de devolvê-la para evitar mutações fora deste módulo.
function clonarMatriz(matriz: Matriz3): Matriz3 {
  return matriz.map((row) => [...row]) as Matriz3;
}

// Clona o vetor de entrada pelo mesmo motivo das matrizes.
function clonarVetor(vetor: Vetor3): Vetor3 {
  return [...vetor] as Vetor3;
}

/**
 * Aplica a transformação linear associada à matriz informada.
 */
export function multiplicarMatrizVetor(matriz: Matriz3, vetor: Vetor3): Vetor3 {
  const resultado: number[] = [];

  for (let i = 0; i < 3; i += 1) {
    let value = 0;
    for (let j = 0; j < 3; j += 1) {
      value += matriz[i][j] * vetor[j];
    }
    resultado.push(value);
  }

  return resultado as Vetor3;
}

// Converte o texto digitado no formulário para número real, aceitando vírgula ou ponto.
function converterComponente(valorBruto: string): number | null {
  const valorNormalizado = valorBruto.trim().replace(",", ".");
  if (valorNormalizado.length === 0) {
    return null;
  }

  const valorConvertido = Number(valorNormalizado);
  if (!Number.isFinite(valorConvertido)) {
    return null;
  }

  return valorConvertido;
}

/**
 * Valida os campos do formulário e devolve o vetor já pronto para cálculo.
 */
export function validarEntradaVetor(
  a: string,
  b: string,
  c: string
): { ok: true; valor: Vetor3 } | { ok: false; mensagem: string } {
  const componenteA = converterComponente(a);
  if (componenteA === null) {
    return { ok: false, mensagem: "Valor inválido para a. Informe um número real." };
  }

  const componenteB = converterComponente(b);
  if (componenteB === null) {
    return { ok: false, mensagem: "Valor inválido para b. Informe um número real." };
  }

  const componenteC = converterComponente(c);
  if (componenteC === null) {
    return { ok: false, mensagem: "Valor inválido para c. Informe um número real." };
  }

  return { ok: true, valor: [componenteA, componenteB, componenteC] };
}

/**
 * Executa todas as transformações do item C e organiza os resultados para a UI.
 */
export function calcularItemC(vetor: Vetor3): ResultadoCalculo {
  const t1 = multiplicarMatrizVetor(MATRIZES.A, vetor);
  const t2 = multiplicarMatrizVetor(MATRIZES.B, vetor);
  const t1MaisT2 = multiplicarMatrizVetor(MATRIZES.AmaisB, vetor);
  const t2CompostaT1 = multiplicarMatrizVetor(MATRIZES.BvezesA, vetor);
  const bDeAv = multiplicarMatrizVetor(MATRIZES.B, t1);

  // Confere se a composição pela matriz BA coincide com a aplicação direta de B em T1(v).
  const consistencia = t2CompostaT1.every(
    (value, index) => Math.abs(value - bDeAv[index]) <= TOLERANCIA_NUMERICA
  );

  return {
    // O retorno usa cópias para proteger o resultado contra mutações externas.
    entrada: clonarVetor(vetor),
    matrizes: {
      A: clonarMatriz(MATRIZES.A),
      B: clonarMatriz(MATRIZES.B),
      AmaisB: clonarMatriz(MATRIZES.AmaisB),
      BvezesA: clonarMatriz(MATRIZES.BvezesA)
    },
    vetores: {
      t1,
      t2,
      t1MaisT2,
      t2CompostaT1,
      bDeAv
    },
    consistencia
  };
}
