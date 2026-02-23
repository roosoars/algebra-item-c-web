import { useState } from "react";
import InputPanel from "./components/InputPanel";
import ResultCards from "./components/ResultCards";
import ResultTable from "./components/ResultTable";
import StepTimeline from "./components/StepTimeline";
import { calculateItemC, validateVectorInput } from "./core/math";
import type { CalculationResult } from "./core/types";
import { buildSolutionSteps } from "./core/steps";

function App() {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [c, setC] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [animationSeed, setAnimationSeed] = useState(0);

  const handleChange = (field: "a" | "b" | "c", value: string) => {
    if (field === "a") {
      setA(value);
    }
    if (field === "b") {
      setB(value);
    }
    if (field === "c") {
      setC(value);
    }
  };

  const handleCalculate = () => {
    const validation = validateVectorInput(a, b, c);

    if (!validation.ok) {
      setError(validation.message);
      setResult(null);
      return;
    }

    const calculated = calculateItemC(validation.value);
    setResult(calculated);
    setError(null);
    setAnimationSeed((value) => value + 1);
  };

  const handleClear = () => {
    setA("");
    setB("");
    setC("");
    setError(null);
    setResult(null);
    setAnimationSeed((value) => value + 1);
  };

  const steps = result ? buildSolutionSteps(result) : [];

  return (
    <div className="app-shell">
      <header className="hero">
        <h1>QUESTÃO 4 • ITEM C</h1>
        <p className="eyebrow">TRANSFORMAÇÕES LINEARES</p>
      </header>

      <section className="panel statement-panel">
        <h2>Enunciado</h2>
        <p className="panel-description">
          Faça um código para ler um vetor <code>v = (a, b, c)</code> e calcular
          <code> T₁(v)</code>, <code>T₂(v)</code>, <code>(T₁ + T₂)(v)</code> e
          <code> (T₂ ∘ T₁)(v)</code>.
        </p>
        <p className="panel-description">
          <strong>Dica:</strong> use as matrizes do exercício 1.
        </p>
        <pre className="statement-formula">
{`T₁(x, y, z) = (x − z, y − z, z − x)
T₂(x, y, z) = (3x, 2x + 5y, x + y + 8z)`}
        </pre>
      </section>

      <main className="main-shell">
        <section className="execution-layout" aria-live="polite">
          <div className="execution-input">
            <InputPanel
              a={a}
              b={b}
              c={c}
              error={error}
              onChange={handleChange}
              onCalculate={handleCalculate}
              onClear={handleClear}
            />
          </div>

          <div className="execution-main">
            <StepTimeline
              title="Resolução passo a passo"
              description="Cálculo completo da Questão 4 para o item C."
              steps={steps}
              animateSeed={animationSeed}
              emptyMessage="Informe o vetor v = (a, b, c) e clique em Calcular para iniciar a resolução animada."
            />
            <ResultCards result={result} />
            <ResultTable result={result} />
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
