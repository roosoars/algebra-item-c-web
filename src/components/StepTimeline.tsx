import type { FC } from "react";
import type { PassoSolucao } from "../core/steps";

type PropriedadesLinhaDoTempoEtapas = {
  titulo: string;
  descricao: string;
  passos: PassoSolucao[];
  sementeAnimacao: number;
  mensagemVazia?: string;
};

/**
 * Apresenta a resolução como uma sequência ordenada de etapas animadas.
 */
const LinhaDoTempoEtapas: FC<PropriedadesLinhaDoTempoEtapas> = ({
  titulo,
  descricao,
  passos,
  sementeAnimacao,
  mensagemVazia
}) => {
  return (
    <section className="panel">
      <h2>{titulo}</h2>
      <p className="panel-description">{descricao}</p>

      {passos.length > 0 ? (
        <ol className="steps-list">
          {passos.map((passo, index) => (
            // A chave mistura semente e posição para reiniciar a animação a cada cálculo.
            <li
              key={`${sementeAnimacao}-${passo.titulo}-${index}`}
              className="step-card"
              style={{ animationDelay: `${index * 120}ms` }}
            >
              <span className="step-index">{String(index + 1).padStart(2, "0")}</span>
              <div className="step-content">
                <h3>{passo.titulo}</h3>
                <p>{passo.descricao}</p>
                <pre className="step-equation">{passo.equacao}</pre>
                {passo.resultado ? <pre className="step-result">{passo.resultado}</pre> : null}
              </div>
            </li>
          ))}
        </ol>
      ) : (
        <p className="empty-state">
          {mensagemVazia ?? "Sem passos para exibir nesta etapa."}
        </p>
      )}
    </section>
  );
};

export default LinhaDoTempoEtapas;
