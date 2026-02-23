import type { FC } from "react";
import { formatVector } from "../core/format";
import type { CalculationResult } from "../core/types";

type ResultCardsProps = {
  result: CalculationResult | null;
};

const ResultCards: FC<ResultCardsProps> = ({ result }) => {
  const rows = result
    ? [
        { label: "v", value: formatVector(result.input) },
        { label: "T₁(v)", value: formatVector(result.vectors.t1) },
        { label: "T₂(v)", value: formatVector(result.vectors.t2) },
        { label: "(T₁ + T₂)(v)", value: formatVector(result.vectors.t1PlusT2) },
        { label: "(T₂ ∘ T₁)(v)", value: formatVector(result.vectors.t2ComposeT1) }
      ]
    : [];

  return (
    <section className="panel">
      <h2>Resultados principais</h2>

      {rows.length > 0 ? (
        <div className="cards-grid">
          {rows.map((row) => (
            <article className="result-card" key={row.label}>
              <p className="result-inline">
                <span className="result-inline-label">{row.label}</span>
                <span className="result-inline-equals">=</span>
                <span className="result-inline-value">{row.value}</span>
              </p>
            </article>
          ))}
        </div>
      ) : null}
    </section>
  );
};

export default ResultCards;
