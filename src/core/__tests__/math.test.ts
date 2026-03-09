import { describe, expect, it } from "vitest";
import { formatarNumero, formatarVetor } from "../format";
import { calcularItemC, MATRIZES, multiplicarMatrizVetor, validarEntradaVetor } from "../math";
import { construirPassosResolucao } from "../steps";

describe("multiplicarMatrizVetor", () => {
  it("multiplica uma matriz 3x3 por vetor 3x1", () => {
    const resultado = multiplicarMatrizVetor(MATRIZES.A, [1, 2, 3]);
    expect(resultado).toEqual([-2, -1, 2]);
  });
});

describe("validarEntradaVetor", () => {
  it("aceita três números válidos", () => {
    const validacao = validarEntradaVetor("1", "2", "3");
    expect(validacao).toEqual({ ok: true, valor: [1, 2, 3] });
  });

  it("rejeita campo vazio", () => {
    const validacao = validarEntradaVetor("", "2", "3");
    expect(validacao.ok).toBe(false);
  });

  it("rejeita texto inválido", () => {
    const validacao = validarEntradaVetor("abc", "2", "3");
    expect(validacao.ok).toBe(false);
  });

  it("aceita decimais, negativos e vírgula", () => {
    const validacao = validarEntradaVetor("-1.5", "0", "2,25");
    expect(validacao).toEqual({ ok: true, valor: [-1.5, 0, 2.25] });
  });
});

describe("calcularItemC", () => {
  it("calcula todas as transformações e consistência", () => {
    const resultado = calcularItemC([1, 2, 3]);

    expect(resultado.entrada).toEqual([1, 2, 3]);
    expect(resultado.vetores.t1).toEqual([-2, -1, 2]);
    expect(resultado.vetores.t2).toEqual([3, 12, 27]);
    expect(resultado.vetores.t1MaisT2).toEqual([1, 11, 29]);
    expect(resultado.vetores.t2CompostaT1).toEqual([-6, -9, 13]);
    expect(resultado.vetores.bDeAv).toEqual([-6, -9, 13]);
    expect(resultado.consistencia).toBe(true);
  });

  it("retorna cópias de matrizes para evitar mutação externa", () => {
    const resultado = calcularItemC([0, 0, 0]);

    expect(resultado.matrizes.A).toEqual(MATRIZES.A);
    expect(resultado.matrizes.A).not.toBe(MATRIZES.A);
  });
});

describe("formatadores", () => {
  it("formata inteiros sem casa decimal", () => {
    expect(formatarNumero(5)).toBe("5");
  });

  it("formata reais com precisão curta", () => {
    expect(formatarNumero(1 / 3)).toBe("0.333333");
  });

  it("formata vetor no padrão (a, b, c)", () => {
    expect(formatarVetor([1, 2.5, -3])).toBe("(1, 2.5, -3)");
  });
});

describe("construirPassosResolucao", () => {
  it("gera passos suficientes para animar a resolução", () => {
    const resultado = calcularItemC([1, 2, 3]);
    const passos = construirPassosResolucao(resultado);

    expect(passos.length).toBe(8);
    expect(passos[0].titulo).toContain("item C");
    expect(passos[3].resultado).toContain("T₁(v)");
    expect(passos[7].equacao).toContain("B(T₁(v))");
  });

  it("reflete inconsistência quando necessário", () => {
    const resultado = calcularItemC([1, 2, 3]);
    const resultadoAlterado = {
      ...resultado,
      consistencia: false
    };

    const passos = construirPassosResolucao(resultadoAlterado);
    expect(passos[7].equacao).toContain("≠");
    expect(passos[7].resultado).toContain("Divergente");
  });
});
