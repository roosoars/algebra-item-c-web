// Vetor coluna de três componentes usado em todas as transformações do exercício.
export type Vetor3 = [number, number, number];

// Matriz 3x3 associada às transformações lineares informadas no enunciado.
export type Matriz3 = [
  [number, number, number],
  [number, number, number],
  [number, number, number]
];

// Estrutura agregada com todos os dados calculados e prontos para exibição.
export type ResultadoCalculo = {
  entrada: Vetor3;
  matrizes: {
    A: Matriz3;
    B: Matriz3;
    AmaisB: Matriz3;
    BvezesA: Matriz3;
  };
  vetores: {
    t1: Vetor3;
    t2: Vetor3;
    t1MaisT2: Vetor3;
    t2CompostaT1: Vetor3;
    bDeAv: Vetor3;
  };
  consistencia: boolean;
};
