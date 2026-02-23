import type { FC } from "react";
import { formatNumber, formatVector } from "../core/format";
import type { CalculationResult, Vector3 } from "../core/types";

type ResultTableProps = {
  result: CalculationResult | null;
};

function vectorToColumns(vector: Vector3): [string, string, string] {
  return [formatNumber(vector[0]), formatNumber(vector[1]), formatNumber(vector[2])];
}

const ResultTable: FC<ResultTableProps> = ({ result }) => {
  const rows = result
    ? [
        { name: "v", value: result.input },
        { name: "T₁(v)", value: result.vectors.t1 },
        { name: "T₂(v)", value: result.vectors.t2 },
        { name: "(T₁ + T₂)(v)", value: result.vectors.t1PlusT2 },
        { name: "(T₂ ∘ T₁)(v)", value: result.vectors.t2ComposeT1 },
        { name: "B(T₁(v))", value: result.vectors.bOfAv }
      ]
    : [];

  return (
    <section className="panel">
      <h2>Tabela de componentes</h2>
      <p className="panel-description">
        Detalhamento numérico de cada resultado em <code>x</code>, <code>y</code> e
        <code> z</code>.
      </p>

      {rows.length > 0 ? (
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
              {rows.map((row) => {
                const [x, y, z] = vectorToColumns(row.value);
                return (
                  <tr key={row.name}>
                    <td>{row.name}</td>
                    <td>{x}</td>
                    <td>{y}</td>
                    <td>{z}</td>
                    <td>{formatVector(row.value)}</td>
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

export default ResultTable;
