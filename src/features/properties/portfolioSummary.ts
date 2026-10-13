import type { Property } from '../../types';

export function summarizeProperties(properties: readonly Property[]) {
  const valueByCurrency: Record<string, number> = {};
  let totalCapRate = 0;

  for (const property of properties) {
    valueByCurrency[property.currency] = (valueByCurrency[property.currency] ?? 0) + property.price;
    totalCapRate += property.metrics.capRate;
  }

  return {
    valueByCurrency,
    // Unweighted arithmetic mean across all listed properties, independent of tier selection.
    meanCapRate: properties.length ? totalCapRate / properties.length : null,
    count: properties.length,
  };
}
