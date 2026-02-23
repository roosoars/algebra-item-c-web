import type { FC } from "react";

type FieldKey = "a" | "b" | "c";

type InputPanelProps = {
  a: string;
  b: string;
  c: string;
  error: string | null;
  onChange: (field: FieldKey, value: string) => void;
  onCalculate: () => void;
  onClear: () => void;
};

const InputPanel: FC<InputPanelProps> = ({
  a,
  b,
  c,
  error,
  onChange,
  onCalculate,
  onClear
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

      <div className="input-grid">
        <label>
          <span>a</span>
          <input
            type="text"
            value={a}
            onChange={(event) => onChange("a", event.target.value)}
            placeholder="Ex.: 1"
            inputMode="decimal"
          />
        </label>

        <label>
          <span>b</span>
          <input
            type="text"
            value={b}
            onChange={(event) => onChange("b", event.target.value)}
            placeholder="Ex.: 2"
            inputMode="decimal"
          />
        </label>

        <label>
          <span>c</span>
          <input
            type="text"
            value={c}
            onChange={(event) => onChange("c", event.target.value)}
            placeholder="Ex.: 3"
            inputMode="decimal"
          />
        </label>
      </div>

      <div className="actions-row">
        <button type="button" className="btn-primary" onClick={onCalculate}>
          Calcular
        </button>
        <button type="button" className="btn-secondary" onClick={onClear}>
          Limpar
        </button>
      </div>

      {error ? <p className="error-text">{error}</p> : null}
    </section>
  );
};

export default InputPanel;
