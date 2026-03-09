import type { FC } from "react";

type CampoVetor = "a" | "b" | "c";

type PropriedadesPainelEntrada = {
  a: string;
  b: string;
  c: string;
  erro: string | null;
  aoAlterar: (campo: CampoVetor, valor: string) => void;
  aoCalcular: () => void;
  aoLimpar: () => void;
};

/**
 * Reúne a entrada do vetor e repassa as ações para o componente principal.
 */
const PainelEntrada: FC<PropriedadesPainelEntrada> = ({
  a,
  b,
  c,
  erro,
  aoAlterar,
  aoCalcular,
  aoLimpar
}) => {
  return (
    <section className="panel panel-input">
      <h2>Dados de Entrada</h2>
      <p className="panel-description">
        Informe o vetor <code>v = (a, b, c)</code> para calcular
        <code> T₁(v)</code>, <code>T₂(v)</code>, <code>(T₁ + T₂)(v)</code> e
        <code> (T₂ ∘ T₁)(v)</code>.
      </p>
      <pre className="input-formulas">
{`T₁(x, y, z) = (x − z, y − z, z − x)
T₂(x, y, z) = (3x, 2x + 5y, x + y + 8z)`}
      </pre>

      {/* Cada campo representa uma coordenada do vetor informado pelo usuário. */}
      <div className="input-grid">
        <label>
          <span>a</span>
          <input
            type="text"
            value={a}
            onChange={(event) => aoAlterar("a", event.target.value)}
            placeholder="Ex.: 1"
            inputMode="decimal"
          />
        </label>

        <label>
          <span>b</span>
          <input
            type="text"
            value={b}
            onChange={(event) => aoAlterar("b", event.target.value)}
            placeholder="Ex.: 2"
            inputMode="decimal"
          />
        </label>

        <label>
          <span>c</span>
          <input
            type="text"
            value={c}
            onChange={(event) => aoAlterar("c", event.target.value)}
            placeholder="Ex.: 3"
            inputMode="decimal"
          />
        </label>
      </div>

      <div className="actions-row">
        <button type="button" className="btn-primary" onClick={aoCalcular}>
          Calcular
        </button>
        <button type="button" className="btn-secondary" onClick={aoLimpar}>
          Limpar
        </button>
      </div>

      {erro ? <p className="error-text">{erro}</p> : null}
    </section>
  );
};

export default PainelEntrada;
