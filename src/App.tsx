import { useState } from "react";
import PainelEntrada from "./components/InputPanel";
import CartoesResultado from "./components/ResultCards";
import TabelaResultado from "./components/ResultTable";
import LinhaDoTempoEtapas from "./components/StepTimeline";
import { calcularItemC, validarEntradaVetor } from "./core/math";
import type { ResultadoCalculo } from "./core/types";
import { construirPassosResolucao } from "./core/steps";

function App() {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [c, setC] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ResultadoCalculo | null>(null);
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
    const validation = validarEntradaVetor(a, b, c);

    if (!validation.ok) {
      setError(validation.mensagem);
      setResult(null);
      return;
    }

    const calculated = calcularItemC(validation.valor);
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

  const steps = result ? construirPassosResolucao(result) : [];

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
            <PainelEntrada
              a={a}
              b={b}
              c={c}
              erro={error}
              aoAlterar={handleChange}
              aoCalcular={handleCalculate}
              aoLimpar={handleClear}
            />
          </div>

          <div className="execution-main">
            <LinhaDoTempoEtapas
              titulo="Resolução passo a passo"
              descricao="Cálculo completo da Questão 4 para o item C."
              passos={steps}
              sementeAnimacao={animationSeed}
              mensagemVazia="Informe o vetor v = (a, b, c) e clique em Calcular para iniciar a resolução animada."
            />
            <CartoesResultado resultado={result} />
            <TabelaResultado resultado={result} />
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
