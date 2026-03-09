import type { FC } from "react";
import { formatarVetor } from "../core/format";
import type { ResultadoCalculo } from "../core/types";

type PropriedadesCartoesResultado = {
  resultado: ResultadoCalculo | null;
};

/**
 * Resume os resultados principais em cartões para leitura rápida.
 */
const CartoesResultado: FC<PropriedadesCartoesResultado> = ({ resultado }) => {
  // Os cartões só são montados quando já existe um cálculo válido.
  const linhas = resultado
    ? [
        { rotulo: "v", valor: formatarVetor(resultado.entrada) },
        { rotulo: "T₁(v)", valor: formatarVetor(resultado.vetores.t1) },
        { rotulo: "T₂(v)", valor: formatarVetor(resultado.vetores.t2) },
        { rotulo: "(T₁ + T₂)(v)", valor: formatarVetor(resultado.vetores.t1MaisT2) },
        { rotulo: "(T₂ ∘ T₁)(v)", valor: formatarVetor(resultado.vetores.t2CompostaT1) }
      ]
    : [];

  return (
    <section className="panel">
      <h2>Resultados principais</h2>

      {linhas.length > 0 ? (
        <div className="cards-grid">
          {linhas.map((linha) => (
            <article className="result-card" key={linha.rotulo}>
              <p className="result-inline">
                <span className="result-inline-label">{linha.rotulo}</span>
                <span className="result-inline-equals">=</span>
                <span className="result-inline-value">{linha.valor}</span>
              </p>
            </article>
          ))}
        </div>
      ) : null}
    </section>
  );
};

export default CartoesResultado;
