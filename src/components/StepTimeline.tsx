import type { FC } from "react";
import type { SolutionStep } from "../core/steps";

type StepTimelineProps = {
  title: string;
  description: string;
  steps: SolutionStep[];
  animateSeed: number;
  emptyMessage?: string;
};

const StepTimeline: FC<StepTimelineProps> = ({
  title,
  description,
  steps,
  animateSeed,
  emptyMessage
}) => {
  return (
    <section className="panel">
      <h2>{title}</h2>
      <p className="panel-description">{description}</p>

      {steps.length > 0 ? (
        <ol className="steps-list">
          {steps.map((step, index) => (
            <li
              key={`${animateSeed}-${step.title}-${index}`}
              className="step-card"
              style={{ animationDelay: `${index * 120}ms` }}
            >
              <span className="step-index">{String(index + 1).padStart(2, "0")}</span>
              <div className="step-content">
                <h3>{step.title}</h3>
                <p>{step.description}</p>
                <pre className="step-equation">{step.equation}</pre>
                {step.result ? <pre className="step-result">{step.result}</pre> : null}
              </div>
            </li>
          ))}
        </ol>
      ) : (
        <p className="empty-state">
          {emptyMessage ?? "Sem passos para exibir nesta etapa."}
        </p>
      )}
    </section>
  );
};

export default StepTimeline;
