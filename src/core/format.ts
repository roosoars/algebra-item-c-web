import type { Vetor3 } from "./types";

/**
 * Formata números para exibição, removendo ruídos pequenos de ponto flutuante
 * e evitando casas decimais desnecessárias.
 */
export function formatarNumero(valor: number): string {
  const valorAjustado = Math.abs(valor) < 1e-12 ? 0 : valor;
  if (Math.abs(valorAjustado - Math.round(valorAjustado)) < 1e-9) {
    return String(Math.round(valorAjustado));
  }

  return Number.parseFloat(valorAjustado.toPrecision(6)).toString();
}

/**
 * Monta a representação textual do vetor no formato usado pela interface.
 */
export function formatarVetor(vector: Vetor3): string {
  return `(${vector.map((componente) => formatarNumero(componente)).join(", ")})`;
}
