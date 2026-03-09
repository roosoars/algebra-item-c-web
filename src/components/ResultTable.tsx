import type { FC } from "react";
import { formatarNumero, formatarVetor } from "../core/format";
import type { ResultadoCalculo, Vetor3 } from "../core/types";

type PropriedadesTabelaResultado = {
  resultado: ResultadoCalculo | null;
};

/**
 * Separa o vetor em colunas já formatadas para alimentar a tabela.
 */
function vetorParaColunas(vetor: Vetor3): [string, string, string] {
  return [formatarNumero(vetor[0]), formatarNumero(vetor[1]), formatarNumero(vetor[2])];
}

/**
 * Exibe cada vetor calculado em formato tabular, destacando suas componentes.
 */
const TabelaResultado: FC<PropriedadesTabelaResultado> = ({ resultado }) => {
  // A tabela detalhada só aparece depois que um resultado é produzido.
  const linhas = resultado
    ? [
        { nome: "v", valor: resultado.entrada },
        { nome: "T₁(v)", valor: resultado.vetores.t1 },
        { nome: "T₂(v)", valor: resultado.vetores.t2 },
        { nome: "(T₁ + T₂)(v)", valor: resultado.vetores.t1MaisT2 },
        { nome: "(T₂ ∘ T₁)(v)", valor: resultado.vetores.t2CompostaT1 },
        { nome: "B(T₁(v))", valor: resultado.vetores.bDeAv }
      ]
    : [];

  return (
    <section className="panel">
      <h2>Tabela de componentes</h2>
      <p className="panel-description">
        Detalhamento numérico de cada resultado em <code>x</code>, <code>y</code> e
        <code> z</code>.
      </p>

      {linhas.length > 0 ? (
        <div className="table-wrap">
          <table className="result-table">
            <thead>
              <tr>
                <th>Vetor</th>
                <th>x</th>
                <th>y</th>
                <th>z</th>
                <th>Forma</th>
              </tr>
            </thead>
            <tbody>
              {linhas.map((linha) => {
                const [x, y, z] = vetorParaColunas(linha.valor);
                return (
                  <tr key={linha.nome}>
                    <td>{linha.nome}</td>
                    <td>{x}</td>
                    <td>{y}</td>
                    <td>{z}</td>
                    <td>{formatarVetor(linha.valor)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : null}
    </section>
  );
};

export default TabelaResultado;
