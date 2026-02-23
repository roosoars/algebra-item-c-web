import type { Vector3 } from "./types";

export function formatNumber(value: number): string {
  const cleaned = Math.abs(value) < 1e-12 ? 0 : value;
  if (Math.abs(cleaned - Math.round(cleaned)) < 1e-9) {
    return String(Math.round(cleaned));
  }

  return Number.parseFloat(cleaned.toPrecision(6)).toString();
}

export function formatVector(vector: Vector3): string {
  return `(${vector.map((entry) => formatNumber(entry)).join(", ")})`;
}
