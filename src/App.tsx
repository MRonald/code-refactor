import ResultView from "./ResultView";
import { data, fixtures } from "./mockData";

const scenarioPayloads: unknown[] = [data, ...Object.values(fixtures)];

export default function App() {
  return (
    <main style={{ display: "grid", gap: "1rem", padding: "1rem" }}>
      {scenarioPayloads.map((payload, index) => (
        <section
          key={`scenario-${index}`}
          style={{
            border: "1px solid #d0d7de",
            borderRadius: "0.5rem",
            padding: "1rem",
          }}
        >
          <ResultView data={payload} />
        </section>
      ))}
    </main>
  );
}
